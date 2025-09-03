import { GoogleGenerativeAI } from '@google/generative-ai';
import { RepositoryData, AIInsights } from '../types';

// For demo purposes - in production, this should be set via environment variables
const API_KEY = 'your-gemini-api-key-here';

export class AIService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    // Initialize with a fallback for demo purposes
    try {
      this.genAI = new GoogleGenerativeAI(API_KEY);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    } catch (error) {
      console.warn('AI service not available:', error);
    }
  }

  async generateInsights(data: RepositoryData): Promise<AIInsights> {
    // Fallback insights for demo when API key is not available
    if (!this.model || API_KEY === 'your-gemini-api-key-here') {
      return this.generateMockInsights(data);
    }

    try {
      const prompt = this.buildPrompt(data);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.parseAIResponse(text);
    } catch (error) {
      console.error('AI generation failed:', error);
      return this.generateMockInsights(data);
    }
  }

  private buildPrompt(data: RepositoryData): string {
    const { repository, languages, contributors } = data;
    const languageList = Object.keys(languages).join(', ');
    
    return `Analyze this GitHub repository and provide insights:

Repository: ${repository.full_name}
Description: ${repository.description || 'No description'}
Languages: ${languageList}
Stars: ${repository.stargazers_count}
Forks: ${repository.forks_count}
Contributors: ${contributors.length}

Please provide:
1. A 2-3 sentence summary of the repository's purpose and key features
2. Analysis of the language composition and technology stack
3. Assessment of contribution patterns and project health

Format as: SUMMARY: ... | LANGUAGES: ... | CONTRIBUTIONS: ...`;
  }

  private parseAIResponse(text: string): AIInsights {
    const parts = text.split('|');
    
    return {
      summary: parts[0]?.replace('SUMMARY:', '').trim() || 'AI analysis unavailable',
      languageAnalysis: parts[1]?.replace('LANGUAGES:', '').trim() || 'Language analysis unavailable',
      contributionPatterns: parts[2]?.replace('CONTRIBUTIONS:', '').trim() || 'Contribution analysis unavailable'
    };
  }

  private generateMockInsights(data: RepositoryData): AIInsights {
    const { repository, languages, contributors } = data;
    const primaryLanguage = Object.keys(languages)[0] || 'Unknown';
    const languageCount = Object.keys(languages).length;

    return {
      summary: `${repository.name} is a ${primaryLanguage} project${repository.description ? ` focused on ${repository.description.toLowerCase()}` : ''}. With ${repository.stargazers_count} stars and ${repository.forks_count} forks, it demonstrates ${repository.stargazers_count > 100 ? 'strong' : 'growing'} community interest.`,
      
      languageAnalysis: `This project uses ${languageCount} programming language${languageCount > 1 ? 's' : ''}, with ${primaryLanguage} as the primary language. ${languageCount > 1 ? `The diverse language mix suggests a ${primaryLanguage.toLowerCase().includes('javascript') || primaryLanguage.toLowerCase().includes('typescript') ? 'full-stack web' : 'multi-component'} application architecture.` : `The single-language approach indicates a focused ${primaryLanguage} implementation.`}`,
      
      contributionPatterns: `The project has ${contributors.length} active contributor${contributors.length > 1 ? 's' : ''}. ${contributors.length === 1 ? 'This appears to be a personal project with single maintainer ownership.' : contributors.length < 5 ? 'This suggests a small team collaboration with close coordination.' : 'This indicates a healthy open-source project with diverse community involvement.'} Recent activity shows ${repository.open_issues_count} open issues, indicating ${repository.open_issues_count < 10 ? 'well-maintained' : 'active development'} status.`
    };
  }
}