# Deployment Guide

## Pre-Deployment Checklist

### 1. Add Your Resume
- [ ] Add `resume.pdf` to the `public/` folder
- [ ] Verify the file is accessible at `/resume.pdf`

### 2. Update Configuration
- [ ] Update `src/config/portfolio.ts` with your information
- [ ] Update social media links
- [ ] Update project images and links
- [ ] Update certifications

### 3. Environment Variables
- [ ] Create `.env` file from `.env.example`
- [ ] Add Google Analytics ID (optional)
- [ ] Update site URL

### 4. SEO & Meta Tags
- [ ] Update `public/sitemap.xml` with your domain
- [ ] Update `public/robots.txt` with your domain
- [ ] Update meta tags in `index.html`
- [ ] Update Open Graph image

### 5. Images & Assets
- [ ] Add your profile picture to `public/`
- [ ] Add project images to `public/`
- [ ] Optimize all images (use WebP format)
- [ ] Add favicon.ico to `public/`

### 6. Testing
- [ ] Run `npm run build` successfully
- [ ] Test locally with `npm run preview`
- [ ] Check all links work
- [ ] Test on mobile devices
- [ ] Test accessibility with screen reader
- [ ] Run Lighthouse audit (aim for 90+ scores)

## Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Zero configuration
- Automatic HTTPS
- Global CDN
- Instant deployments
- Free for personal projects

**Steps:**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Vercel auto-detects Vite
6. Add environment variables:
   - `VITE_GA_TRACKING_ID`
   - `VITE_SITE_URL`
7. Click "Deploy"

**Custom Domain:**
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Option 2: Netlify

**Steps:**
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables in Site Settings
7. Click "Deploy site"

**Custom Domain:**
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS records

### Option 3: GitHub Pages

**Steps:**
1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/portfolio",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/portfolio/',
  // ... rest of config
});
```

4. Deploy:
```bash
npm run deploy
```

### Option 4: AWS S3 + CloudFront

**For production-grade hosting:**

1. Build the project:
```bash
npm run build
```

2. Create S3 bucket:
```bash
aws s3 mb s3://your-portfolio-bucket
```

3. Upload files:
```bash
aws s3 sync dist/ s3://your-portfolio-bucket --delete
```

4. Configure bucket for static hosting
5. Create CloudFront distribution
6. Point your domain to CloudFront

## Post-Deployment

### 1. Verify Deployment
- [ ] Visit your live site
- [ ] Test all sections scroll smoothly
- [ ] Click all external links
- [ ] Test contact form
- [ ] Test resume download
- [ ] Check mobile responsiveness

### 2. SEO Setup
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify site ownership
- [ ] Request indexing

### 3. Analytics
- [ ] Verify Google Analytics is tracking
- [ ] Set up conversion goals
- [ ] Monitor Core Web Vitals

### 4. Performance
- [ ] Run Lighthouse audit
- [ ] Check PageSpeed Insights
- [ ] Monitor loading times
- [ ] Optimize if needed

### 5. Monitoring
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Monitor error logs
- [ ] Check analytics weekly

## Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

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
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Troubleshooting

### Build Fails
- Check Node.js version (18+)
- Delete `node_modules` and reinstall
- Clear npm cache: `npm cache clean --force`

### Images Not Loading
- Verify images are in `public/` folder
- Check image paths start with `/`
- Ensure images are committed to git

### 404 on Refresh
- Add `_redirects` file (Netlify)
- Configure rewrites (Vercel auto-handles)
- Enable SPA mode in hosting settings

### Slow Loading
- Optimize images (use WebP)
- Enable compression
- Use CDN
- Lazy load images

## Domain Setup

### Namecheap
1. Go to Domain List → Manage
2. Advanced DNS
3. Add records:
   - Type: A Record, Host: @, Value: [Your host IP]
   - Type: CNAME, Host: www, Value: [Your domain]

### Cloudflare (Recommended)
1. Add site to Cloudflare
2. Update nameservers at registrar
3. Add DNS records
4. Enable SSL/TLS (Full)
5. Enable Auto Minify
6. Enable Brotli compression

## Security

- [ ] Enable HTTPS
- [ ] Add security headers
- [ ] Enable HSTS
- [ ] Configure CSP (Content Security Policy)
- [ ] Regular dependency updates

## Maintenance

### Weekly
- Check analytics
- Monitor performance
- Review error logs

### Monthly
- Update dependencies: `npm update`
- Review and update content
- Check broken links
- Backup data

### Quarterly
- Security audit
- Performance optimization
- Content refresh
- SEO review

---

Need help? Check the main README.md or open an issue!
