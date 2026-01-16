# Chronicle Deployment Guide

This guide covers deploying your Chronicle website to production.

## Pre-Deployment Checklist

- [ ] Database schema applied to Supabase
- [ ] Environment variables configured
- [ ] Sample content created
- [ ] Site tested locally
- [ ] Code pushed to Git repository

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides zero-configuration deployment for SvelteKit applications with excellent performance.

#### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects SvelteKit

3. **Configure Environment Variables**
   
   In Vercel project settings, add:
   ```
   PUBLIC_SUPABASE_URL=https://ktmxcvvhfeeuocjymzpy.supabase.co
   PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site is live!

#### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate is automatically provisioned

### Option 2: Netlify

Netlify is another excellent option with similar ease of deployment.

#### Steps

1. **Push to GitHub** (same as Vercel)

2. **Import to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository

3. **Configure Build Settings**
   ```
   Build command: npm run build
   Publish directory: build
   ```

4. **Add Environment Variables**
   
   In Site Settings → Environment Variables:
   ```
   PUBLIC_SUPABASE_URL=https://ktmxcvvhfeeuocjymzpy.supabase.co
   PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

5. **Deploy**
   - Click "Deploy site"
   - Your site goes live automatically

### Option 3: Self-Hosted (VPS/Cloud)

For more control, deploy to your own server.

#### Requirements
- Node.js 18+ installed
- Process manager (PM2 recommended)
- Reverse proxy (Nginx recommended)
- SSL certificate (Let's Encrypt)

#### Steps

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Transfer Files**
   ```bash
   # Copy build directory and dependencies
   scp -r build package.json package-lock.json user@server:/var/www/chronicle
   ```

3. **Install Dependencies on Server**
   ```bash
   ssh user@server
   cd /var/www/chronicle
   npm install --production
   ```

4. **Set Environment Variables**
   ```bash
   # Create .env file
   echo "PUBLIC_SUPABASE_URL=https://ktmxcvvhfeeuocjymzpy.supabase.co" > .env
   echo "PUBLIC_SUPABASE_ANON_KEY=your-key" >> .env
   ```

5. **Start with PM2**
   ```bash
   npm install -g pm2
   pm2 start build/index.js --name chronicle
   pm2 save
   pm2 startup
   ```

6. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

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

7. **Enable SSL with Certbot**
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

## Post-Deployment

### Verify Deployment

1. Visit your live site
2. Check homepage loads correctly
3. Click through to article pages
4. Test admin interface at `/admin`
5. Create a test article

### Performance Optimization

1. **Enable Caching**
   - Configure CDN (Cloudflare recommended)
   - Set appropriate cache headers

2. **Image Optimization**
   - Use Supabase Storage for images
   - Implement lazy loading
   - Use modern formats (WebP, AVIF)

3. **Database Optimization**
   - Review Supabase query performance
   - Add indexes if needed
   - Enable connection pooling

### Monitoring

1. **Vercel Analytics** (if using Vercel)
   - Enable in project settings
   - Monitor page views and performance

2. **Supabase Dashboard**
   - Monitor database usage
   - Check API request counts
   - Review error logs

3. **Error Tracking** (Optional)
   - Integrate Sentry for error monitoring
   - Set up uptime monitoring (UptimeRobot, Pingdom)

## Continuous Deployment

Both Vercel and Netlify automatically deploy when you push to your main branch.

```bash
# Make changes
git add .
git commit -m "Update content"
git push

# Deployment starts automatically
```

## Rollback

### Vercel
1. Go to Deployments tab
2. Find previous successful deployment
3. Click "Promote to Production"

### Netlify
1. Go to Deploys tab
2. Find previous deployment
3. Click "Publish deploy"

## Troubleshooting

### Build Fails

**Check build logs** for specific errors:
- Missing environment variables
- TypeScript errors
- Dependency issues

**Common fixes:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Verify build locally
npm run build
```

### Site Not Loading

1. Check environment variables are set correctly
2. Verify Supabase connection
3. Check browser console for errors
4. Review deployment logs

### Database Connection Issues

1. Verify Supabase project is active
2. Check RLS policies allow public read access
3. Confirm anon key is correct
4. Test connection in Supabase dashboard

## Security Checklist

- [ ] Environment variables not committed to Git
- [ ] Supabase RLS policies enabled
- [ ] HTTPS/SSL enabled
- [ ] CORS configured correctly
- [ ] Admin routes protected (add auth if needed)
- [ ] Rate limiting configured (Supabase handles this)

## Backup Strategy

### Database Backups

Supabase automatically backs up your database. To create manual backups:

1. Go to Supabase Dashboard
2. Database → Backups
3. Create manual backup

### Code Backups

Your Git repository serves as code backup. Consider:
- Multiple remote repositories (GitHub + GitLab)
- Regular commits with meaningful messages
- Tagged releases for major versions

## Scaling Considerations

### When to Scale

Monitor these metrics:
- Database response time
- API request volume
- Concurrent users
- Storage usage

### Scaling Options

1. **Supabase**: Upgrade to Pro plan for:
   - More database resources
   - Higher API limits
   - Better performance

2. **Hosting**: 
   - Vercel/Netlify automatically scale
   - Self-hosted: Add load balancer + multiple servers

3. **CDN**: 
   - Cloudflare for global content delivery
   - Reduces server load
   - Improves performance worldwide

## Support

For deployment issues:
- SvelteKit: [kit.svelte.dev/docs](https://kit.svelte.dev/docs)
- Supabase: [supabase.com/docs](https://supabase.com/docs)
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Netlify: [docs.netlify.com](https://docs.netlify.com)

---

**Your Chronicle site is ready to deploy!** Choose the option that best fits your needs and follow the steps above.
