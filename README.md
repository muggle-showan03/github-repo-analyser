# GitHub Repository Analytics Dashboard

A comprehensive Progressive Web Application that provides AI-driven insights into GitHub repositories with interactive visualizations.

## Features

- **Repository Analysis**: Complete GitHub repository data fetching and analysis
- **Interactive Visualizations**: Charts for language composition, commit activity, and statistics
- **AI Insights**: Gemini AI-powered repository summaries and analysis
- **Repository Comparison**: Side-by-side comparison of two repositories
- **Progressive Web App**: Installable, offline-capable PWA with service worker
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: System-aware theme toggle with smooth transitions

## Getting Started

### Prerequisites

- Node.js 18+ installed
- GitHub Personal Access Token (optional, for higher rate limits)
- Google Gemini API Key (optional, for AI insights)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Add your API keys to `.env`:
   ```
   VITE_GITHUB_TOKEN=your_github_token_here
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Usage

1. Enter a GitHub repository URL or use the `owner/repo` format
2. View comprehensive analytics including:
   - Repository statistics (stars, forks, issues)
   - Language composition chart
   - Commit activity over time
   - AI-generated insights about the project
3. Compare with another repository for side-by-side analysis
4. Install as PWA for offline access and quick launching

### API Keys Setup

#### GitHub Token (Optional)
- Go to GitHub Settings → Developer settings → Personal access tokens
- Generate a new token with public repository access
- Add to your `.env` file

#### Gemini AI Key (Optional)
- Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
- Create a new API key
- Add to your `.env` file

Note: Without API keys, the app will use mock data for AI insights and may hit GitHub rate limits.

### Building for Production

```bash
npm run build
```

### Deployment

The application can be deployed to any static hosting provider:
- Vercel
- Netlify  
- Firebase Hosting
- GitHub Pages

## Technologies Used

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Recharts** for data visualizations
- **Gemini AI** for intelligent insights
- **Service Worker** for offline functionality
- **Web App Manifest** for PWA features

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

lets have a look:
https://github-repository-an-vzq1.bolt.host/

## License

MIT License - feel free to use this project for your own purposes.
