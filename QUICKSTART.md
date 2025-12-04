# Quick Start Guide

> **Navigation**: [← Back to README](README.md) | [Project Summary](PROJECT_SUMMARY.md) | [Technical Docs](TECHNICAL.md) | [Deployment](DEPLOYMENT.md) | [📚 Docs Map](DOCS_MAP.md)

## 🚀 Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

### 3. Open Your Browser
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔧 Testing with Backend

### Option 1: Use the Sample Backend (Recommended for Testing)

1. Install Express and CORS:
```bash
npm install express cors
```

2. Start the sample backend:
```bash
node server-example.js
```

3. The backend will run on `http://localhost:8080`

4. Test with curl:
```bash
curl -X POST http://localhost:8080/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"What is RapidScale AI?"}'
```

### Option 2: Connect Your Own Backend

Your backend should:
- Accept POST requests at any endpoint
- Receive JSON payload: `{ "question": "user's message" }`
- Return JSON with one of these keys: `answer`, `response`, or `message`

Example:
```json
{
  "answer": "Your AI response here"
}
```

Configure the API URL in your `.env.local` file:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/ask
```

See **[Backend Integration](README.md#-backend-integration)** in the README for more details.

---

## 🌐 Deploy Your Application

Ready to deploy? You have several options:

### Quick Deploy (5 minutes)
- **[Vercel](DEPLOYMENT.md#option-1-vercel-recommended---5-minutes)** (Recommended) - Zero configuration, instant deployment
- **[Netlify](DEPLOYMENT.md#option-2-netlify-alternative)** - Alternative serverless platform

See the full **[Deployment Guide](DEPLOYMENT.md)** for detailed instructions.

---

## 📋 Features Checklist

✅ Modern Next.js 15 with App Router  
✅ Dark theme with RapidScale branding  
✅ Responsive design (mobile & desktop)  
✅ ChatGPT-like interface  
✅ Typing effect simulation (30ms per word)  
✅ Thinking indicator while loading  
✅ Glassmorphism effects  
✅ Framer Motion animations  
✅ Error handling  
✅ Auto-scroll to latest message  
✅ Keyboard shortcuts (Enter to send)  

---

## 🎨 Customization

### Change Brand Colors

Edit `tailwind.config.ts`:
```typescript
rapidscale: {
  400: '#YOUR_COLOR',  // Primary accent
  500: '#YOUR_COLOR',  // Main brand
  600: '#YOUR_COLOR',  // Darker variant
}
```

### Adjust Typing Speed

Edit `components/ChatInterface.tsx`, line 43:
```typescript
await new Promise(resolve => setTimeout(resolve, 30)) // Change 30 to desired ms
```

Faster: 10-20ms  
Normal: 30-40ms  
Slower: 50-80ms

For more customization options, see the **[Technical Documentation](TECHNICAL.md)**.

---

## 🐛 Troubleshooting

### Backend Connection Error

**Problem**: "Failed to get response from backend"

**Solutions**:
1. Check if backend is running: `curl http://localhost:8080/ask`
2. Verify `NEXT_PUBLIC_API_URL` in `.env.local`
3. Check browser console for CORS errors
4. Ensure backend accepts POST requests with JSON body
4. Ensure backend has CORS enabled

### TypeScript Errors

**Problem**: Module not found errors

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

**Problem**: Port 3000 is already in use

**Solution**:
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

---

## 📦 Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

For deployment to production platforms, see:
- **[Deployment Guide](DEPLOYMENT.md)** - Vercel, Netlify, Docker options
- **[CI/CD Setup Guide](CICD_SETUP.md)** - Automated deployment to Google Cloud Run

---

## 📚 Next Steps

Now that you're up and running:

1. **Customize the design** - See color and styling options above
2. **Connect your backend** - Configure `.env.local` with your API URL
3. **Deploy to production** - Check out the [Deployment Guide](DEPLOYMENT.md)
4. **Learn the architecture** - Dive into [Technical Documentation](TECHNICAL.md)

---

## 🆘 Need Help?

- **Configuration issues**: Check [Technical Documentation](TECHNICAL.md)
- **Deployment questions**: See [Deployment Guide](DEPLOYMENT.md)
- **Project overview**: Review [Project Summary](PROJECT_SUMMARY.md)
- **General info**: Back to [README](README.md)

---

## 📱 Mobile Optimization

The app is optimized for mobile with:
- Touch-friendly buttons (min 44px)
- Responsive text sizes
- Mobile-first breakpoints
- Optimized animations
- No horizontal scroll

Test on mobile:
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select device (iPhone, iPad, etc.)

---

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload .next folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 💡 Tips & Tricks

1. **Keyboard Shortcuts**:
   - `Enter`: Send message
   - `Shift + Enter`: New line in message

2. **Performance**:
   - Messages are auto-scrolled
   - Animations use GPU acceleration
   - Images lazy load by default

3. **Development**:
   - Hot reload is enabled
   - Changes reflect instantly
   - Console shows helpful errors

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review console errors in browser DevTools
3. Ensure all dependencies are installed
4. Verify backend is running and accessible

---

Enjoy building with RapidScale AI Insight! 🚀
