# 🚀 Deployment Guide - RapidScale AI Insight

> **Navigation**: [← Back to README](README.md) | [Quick Start](QUICKSTART.md) | [Project Summary](PROJECT_SUMMARY.md) | [Technical Docs](TECHNICAL.md) | [📚 Docs Map](DOCS_MAP.md)

## Quick Deploy Options

### Option 1: Vercel (Recommended - 5 minutes)

**Why Vercel?**
- Built by Next.js creators
- Zero configuration
- Automatic HTTPS
- Global CDN
- Free tier available

**Steps**:

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Deploy**:
```bash
vercel
```

3. **Follow prompts**:
- Set up and deploy? **Y**
- Which scope? **Select your account**
- Link to existing project? **N**
- Project name? **rapidscale-ai-insight**
- Directory? **./
**
- Override settings? **N**

4. **Done!** Your app is live at `https://your-project.vercel.app`

**Production Deploy**:
```bash
vercel --prod
```

**Environment Variables** (if needed):
```bash
vercel env add NEXT_PUBLIC_API_URL production
# Enter your production API URL
```

---

### Option 2: Netlify (Alternative)

1. **Build the project**:
```bash
npm run build
```

2. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
```

3. **Deploy**:
```bash
netlify deploy --prod
```

4. **Or use Netlify UI**:
- Go to https://app.netlify.com
- Drag and drop the `.next` folder
- Done!

---

### Option 3: Docker (Advanced)

**Dockerfile**:
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

**Build and run**:
```bash
docker build -t rapidscale-ai .
docker run -p 3000:3000 rapidscale-ai
```

---

### Option 4: Traditional Hosting (cPanel, VPS)

1. **Build the project**:
```bash
npm run build
```

2. **Install PM2**:
```bash
npm install -g pm2
```

3. **Start with PM2**:
```bash
pm2 start npm --name "rapidscale" -- start
pm2 save
pm2 startup
```

4. **Configure Nginx** (if using):
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Environment Setup for Production

### Create `.env.production` file:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://your-backend-api.com/ask

# Optional: Analytics
NEXT_PUBLIC_GA_ID=UA-XXXXXXXXX-X

# Optional: Error Tracking (Sentry)
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx

# Optional: Feature Flags
NEXT_PUBLIC_ENABLE_CHAT=true
```

### Update ChatInterface.tsx for production:

Replace:
```typescript
const response = await fetch('http://localhost:8080/ask', {
```

With:
```typescript
const response = await fetch(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/ask', {
```

---

## Pre-Deployment Checklist

### 1. Code Quality
- [ ] Run `npm run lint` - No errors
- [ ] Run `npm run build` - Successful build
- [ ] Test all features locally
- [ ] Check browser console for errors
- [ ] Test on mobile devices

### 2. Configuration
- [ ] Set production API URL
- [ ] Configure CORS on backend
- [ ] Add environment variables
- [ ] Update meta tags (SEO)
- [ ] Add favicon and OG images

### 3. Performance
- [ ] Run Lighthouse audit (score > 90)
- [ ] Optimize images (if any)
- [ ] Enable compression
- [ ] Configure caching headers
- [ ] Test on slow 3G

### 4. Security
- [ ] Enable HTTPS
- [ ] Set CSP headers
- [ ] Add rate limiting (backend)
- [ ] Sanitize user inputs
- [ ] Remove console.logs

### 5. Monitoring
- [ ] Set up error tracking
- [ ] Configure analytics
- [ ] Set up uptime monitoring
- [ ] Configure alerts

---

## Post-Deployment Steps

### 1. Verify Deployment
```bash
# Test homepage
curl https://your-domain.com

# Test API connection (if public)
curl -X POST https://your-domain.com/api/test \
  -H "Content-Type: application/json" \
  -d '{"question":"test"}'
```

### 2. Monitor Performance

**Vercel Analytics** (Recommended):
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

**Google Analytics**:
```typescript
// app/layout.tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
  strategy="afterInteractive"
/>
```

### 3. Set Up CI/CD (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## Troubleshooting Deployment Issues

### Issue: Build Fails

**Error**: "Module not found"
```bash
# Solution
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

### Issue: API Not Connecting

**Error**: "CORS policy blocked"
```javascript
// Backend needs CORS
app.use(cors({
  origin: 'https://your-domain.com',
  credentials: true
}))
```

### Issue: Environment Variables Not Working

**Error**: Variables are undefined
```bash
# Vercel
vercel env pull

# Check variables are prefixed with NEXT_PUBLIC_
NEXT_PUBLIC_API_URL=https://api.com
```

### Issue: Images Not Loading

**Error**: 404 on images
```typescript
// Use Next.js Image component
import Image from 'next/image'

<Image
  src="/logo.png"
  alt="Logo"
  width={100}
  height={100}
/>
```

---

## Performance Optimization for Production

### 1. Enable Compression

**next.config.js**:
```javascript
module.exports = {
  compress: true,
  poweredByHeader: false,
}
```

### 2. Add Security Headers

**next.config.js**:
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}
```

### 3. Configure Caching

**vercel.json**:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## Scaling Considerations

### When Traffic Grows

1. **Enable CDN** (Vercel does this automatically)
2. **Add Database** (for message history)
3. **Implement Caching** (Redis)
4. **Use Queue System** (for backend processing)
5. **Load Balancing** (multiple backend instances)

### Cost Estimates

**Vercel Free Tier**:
- Unlimited deployments
- 100GB bandwidth/month
- Automatic SSL
- **Cost**: $0

**Vercel Pro** (when you scale):
- $20/month
- 1TB bandwidth
- Advanced analytics
- Team collaboration

---

## Domain Configuration

### Connect Custom Domain

**Vercel**:
1. Go to project settings
2. Click "Domains"
3. Add your domain
4. Update DNS records:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.21.21
```

**Cloudflare** (recommended for extra features):
- Add site to Cloudflare
- Point to Vercel
- Enable caching and DDoS protection

---

## Monitoring & Alerts

### Set Up Uptime Monitoring

**Free Options**:
- UptimeRobot (https://uptimerobot.com)
- Pingdom
- Better Uptime

**Configuration**:
- Monitor: https://your-domain.com
- Interval: 5 minutes
- Alerts: Email + Slack

### Error Tracking with Sentry

```bash
npm install @sentry/nextjs
```

**sentry.client.config.ts**:
```typescript
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
})
```

---

## Backup Strategy

### Code Backup
- ✅ Git repository (GitHub/GitLab)
- ✅ Automatic via version control

### Database Backup (if added)
- Daily automated backups
- 30-day retention
- Point-in-time recovery

---

## 🎉 You're Ready to Deploy!

Choose your platform and follow the steps above. For most users, **Vercel** is the easiest and fastest option.

**Quick Deploy with Vercel**:
```bash
npm install -g vercel
vercel
```

That's it! Your RapidScale AI Insight is live! 🚀

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- GitHub Issues: Create an issue in your repo

**Happy Deploying! 🎈**
