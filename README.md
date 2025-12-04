# RapidScale AI Insight

A high-performance, modern landing page with an integrated AI chatbot built with Next.js 15, Tailwind CSS, and Framer Motion.

![RapidScale AI Insight](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

## 📚 Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Get up and running in 3 steps
- **[Project Summary](PROJECT_SUMMARY.md)** - Overview of what's been built
- **[Technical Documentation](TECHNICAL.md)** - In-depth technical details
- **[Deployment Guide](DEPLOYMENT.md)** - Deploy to Vercel or Netlify
- **[Documentation Map](DOCS_MAP.md)** - Navigate all documentation files

## 🚀 Features

- **Modern UI/UX**: Sleek dark theme with glassmorphism effects and smooth animations
- **AI Chatbot**: ChatGPT-like interface with typing effect simulation
- **Backend Integration**: Configurable API URL via environment variables
- **Responsive Design**: Mobile-first approach with full desktop support
- **Performance Optimized**: Built with Next.js 15 App Router and Server Components
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **CI/CD Pipeline**: Automated deployment to Google Cloud Run via GitHub Actions
## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **State Management**: React Hooks
## 📋 Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm
- Backend API server (configured via `.env.local`)

## ⚙️ Environment Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=https://your-api-url.com/ask
```

The chatbot will use this URL to send requests. If not set, it defaults to `http://localhost:8080/ask`.
```bash
# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local with your API URL

# Run development server
npm run dev

# Open http://localhost:3000
```
- **Animation**: Framer Motion
- **State Management**: React Hooks

## 📋 Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm
## 🔌 Backend Integration

The chatbot sends POST requests to the URL specified in `NEXT_PUBLIC_API_URL` with the following payload:

```json
{
  "question": "user's message"
}
```

Expected backend response format (any of these keys will work):
```json
{
  "answer": "AI response text"
}
```
or
```json
{
  "response": "AI response text"
}
```
or
```json
{
  "message": "AI response text"
}
```

For testing purposes, you can use the included `server-example.js`. See **[Quick Start Guide](QUICKSTART.md)** for details.
4. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔌 Backend Integration

The chatbot sends POST requests to `http://localhost:8080/ask` with the following payload:

```json
{
  "question": "user's message"
}
```

Expected backend response format (any of these keys will work):
```json
{
  "answer": "AI response text"
}
```
or
```json
{
  "response": "AI response text"
}
```
or
```json
{
  "message": "AI response text"
}
```

### Typing Effect

The chatbot implements a sophisticated typing effect:
- **Streaming Support**: If your backend streams responses, the UI will handle it
- **Simulated Typing**: If backend returns a complete response, the UI simulates typing at ~30ms per word
- **Thinking Indicator**: Displays a loading spinner while waiting for the backend

## 📁 Project Structure

```
agent-supabase-web/
├── app/
│   ├── layout.tsx          # Root layout with global styles
│   ├── page.tsx            # Main landing page
## 🎨 Customization

### Colors

The project uses a custom color palette defined in `tailwind.config.ts`. See **[Technical Documentation](TECHNICAL.md)** for details.

### API Configuration

Update the `.env.local` file to change the backend API URL:

```env
NEXT_PUBLIC_API_URL=https://your-new-api-url.com/endpoint
```

## 📖 Additional Documentation

- **[Project Summary](PROJECT_SUMMARY.md)** - Complete overview of the project structure
- **[Technical Documentation](TECHNICAL.md)** - Detailed component specifications and architecture
- **[Quick Start Guide](QUICKSTART.md)** - Step-by-step setup instructions
- **[Deployment Guide](DEPLOYMENT.md)** - Deploy to various platforms
- **[CI/CD Setup](CICD_SETUP.md)** - Automated deployment configuration Chat Backend URL

## 🚀 Build for Production

```bash
npm run build
npm start
```

## 🌐 Deployment

Multiple deployment options are available:

- **[Vercel](DEPLOYMENT.md#option-1-vercel-recommended---5-minutes)** (Recommended) - Quick deployment with zero configuration
- **[Netlify](DEPLOYMENT.md#option-2-netlify-alternative)** - Alternative serverless platform

See the **[Deployment Guide](DEPLOYMENT.md)** for detailed instructions on each option.eaders: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ question: userMessage.content }),
})
```

## 🚀 Build for Production

### Animations

All components use Framer Motion for:
- Initial page load animations
- Scroll-triggered reveals
- Hover effects
- Message appearance transitions

See **[Technical Documentation](TECHNICAL.md)** for detailed animation specifications.

## 🔐 Environment Variables

- `NEXT_PUBLIC_API_URL`: Backend API endpoint (required)
- Initial page load animations
- Scroll-triggered reveals
- Hover effects
- Message appearance transitions

## 🔐 Environment Variables

Currently, no environment variables are required. The backend URL is hardcoded in the ChatInterface component for simplicity.

For production, consider creating a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

And update the fetch call to use `process.env.NEXT_PUBLIC_API_URL`.

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment platform
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
