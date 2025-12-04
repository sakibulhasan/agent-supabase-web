# RapidScale AI Insight

A high-performance, modern landing page with an integrated AI chatbot built with Next.js 15, Tailwind CSS, and Framer Motion.

![RapidScale AI Insight](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🚀 Features

- **Modern UI/UX**: Sleek dark theme with glassmorphism effects and smooth animations
- **AI Chatbot**: ChatGPT-like interface with typing effect simulation
- **Backend Integration**: Connects to local backend at `http://localhost:8080/ask`
- **Responsive Design**: Mobile-first approach with full desktop support
- **Performance Optimized**: Built with Next.js 15 App Router and Server Components
- **Smooth Animations**: Framer Motion powered transitions and interactions

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
- Backend server running on `http://localhost:8080/ask` (optional for testing)

## 🔧 Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd agent-supabase-web
```

2. **Install dependencies**:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

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
│   └── globals.css         # Global CSS with Tailwind
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section
│   ├── Features.tsx        # Features grid
│   └── ChatInterface.tsx   # AI chatbot component
├── public/                 # Static assets
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## 🎨 Customization

### Colors

The project uses a custom color palette defined in `tailwind.config.ts`:

```typescript
rapidscale: {
  50: '#ecfeff',
  100: '#cffafe',
  // ... more shades
  900: '#164e63',
}
```

### Chat Backend URL

To change the backend URL, modify the `fetch` call in `components/ChatInterface.tsx`:

```typescript
const response = await fetch('YOUR_BACKEND_URL', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ question: userMessage.content }),
})
```

## 🚀 Build for Production

```bash
npm run build
npm start
```

## 📝 Component Details

### ChatInterface Component

The core chatbot component includes:
- Message state management with TypeScript interfaces
- Smooth typing effect simulation
- Auto-scrolling to latest message
- Loading states and error handling
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)

### Animations

All components use Framer Motion for:
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
