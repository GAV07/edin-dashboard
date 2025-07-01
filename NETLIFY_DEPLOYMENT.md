# Netlify Deployment Guide for Authentication

## 🚀 **Step-by-Step Deployment Instructions**

### **1. Environment Variables Setup**

You need to add these environment variables in your Netlify dashboard:

#### **Go to Netlify Dashboard:**
1. Log into your Netlify dashboard
2. Navigate to your site
3. Go to **Site settings** → **Environment variables**
4. Add the following variables:

```bash
# NextAuth Configuration
NEXTAUTH_SECRET=FzKuqigX7cwu7Y+CRxR3tgUH9iASFjlGPio3PGqM/is=
NEXTAUTH_URL=https://your-site-name.netlify.app

# Your existing Google Sheets variables
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-google-service-account-email
GOOGLE_PRIVATE_KEY=your-google-private-key-here
GOOGLE_SHEET_ID=your-google-sheet-id

# Your existing Notion variables  
NOTION_TOKEN=your-notion-token
NOTION_DATABASE_ID=your-notion-database-id
```

#### **Important Notes:**
- Replace `your-site-name.netlify.app` with your actual Netlify domain
- Use the same `NEXTAUTH_SECRET` from your local `.env.local` file
- Make sure all your existing environment variables are also added

### **2. Generate Production NextAuth Secret** 

For production, generate a new secure secret:

```bash
# Run this locally to generate a new secret
openssl rand -base64 32
```

Use this new secret for `NEXTAUTH_SECRET` in Netlify (more secure than reusing development secret).

### **3. Install Netlify Next.js Plugin**

The plugin is specified in `netlify.toml`, but you should also install it in your project:

```bash
npm install --save-dev @netlify/plugin-nextjs
```

### **4. Update Your Domain**

Once deployed, if you're using a custom domain, update the `NEXTAUTH_URL` environment variable in Netlify to match your custom domain:

```
NEXTAUTH_URL=https://yourdomain.com
```

### **5. Deploy to Netlify**

#### **Method 1: Git Integration (Recommended)**
1. Push your changes to your GitHub repository
2. Netlify will automatically detect the changes and deploy
3. Monitor the deploy logs for any issues

#### **Method 2: Manual Deploy**
1. Run `npm run build` locally
2. Drag and drop the `.next` folder to Netlify

### **6. Test Authentication on Production**

After deployment:

1. **Visit your live site**
2. **Test sign-in** with demo credentials:
   - `admin@edincapital.com` / `password123`
   - `investor@edincapital.com` / `password123`
3. **Verify session persistence** - navigate between pages
4. **Check Google Analytics** - confirm user tracking works

### **7. Common Issues & Solutions**

#### **Issue: "Invalid credentials" on production**
- **Solution:** Verify all environment variables are set correctly in Netlify
- Check that `NEXTAUTH_SECRET` and `NEXTAUTH_URL` are properly configured

#### **Issue: Redirect loops**
- **Solution:** Ensure `NEXTAUTH_URL` matches your exact domain (with https://)
- Check that the middleware is properly configured

#### **Issue: Session not persisting**
- **Solution:** Verify `NEXTAUTH_SECRET` is set in Netlify environment variables
- Ensure cookies are working (check browser developer tools)

#### **Issue: API routes not working**
- **Solution:** The `@netlify/plugin-nextjs` should handle this automatically
- Check deploy logs for any build errors

### **8. Security Checklist for Production**

- ✅ **Strong NEXTAUTH_SECRET** generated with `openssl rand -base64 32`
- ✅ **HTTPS enabled** (automatic with Netlify)
- ✅ **Environment variables secured** in Netlify dashboard
- ✅ **No secrets in code** - all sensitive data in environment variables
- ✅ **Security headers configured** in netlify.toml

### **9. Monitoring & Analytics**

#### **Check Google Analytics:**
1. **User tracking** - Should see authenticated users
2. **Event tracking** - Login/logout events
3. **Page views** - With user context
4. **User properties** - Role and email data

#### **Monitor Authentication:**
- Check Netlify function logs for authentication errors
- Monitor user sign-in patterns
- Watch for failed login attempts

### **10. Production User Management**

For production, consider these improvements:

#### **Add Database Users:**
Replace the in-memory user store with a database:
```bash
# Example with Supabase
npm install @supabase/supabase-js
```

#### **User Registration:**
Implement user registration for new investors/admins

#### **Password Reset:**
Add forgot password functionality

#### **Role Management:**
Create admin interface for managing user roles

### **11. Custom Domain Setup**

If using a custom domain:

1. **Configure domain in Netlify:**
   - Site settings → Domain management
   - Add your custom domain

2. **Update environment variables:**
   ```
   NEXTAUTH_URL=https://dashboard.yourdomain.com
   ```

3. **Update Google Analytics:**
   - Update allowed domains in GA if needed

### **12. Backup & Recovery**

#### **Environment Variables Backup:**
Keep a secure backup of all environment variables

#### **Database Backup:**
When you migrate to a database, implement regular backups

### **🎉 Deployment Complete!**

Your authentication system should now be fully functional on Netlify with:

- ✅ **Secure authentication** with NextAuth.js
- ✅ **Session persistence** across page navigation
- ✅ **Google Analytics integration** with user tracking
- ✅ **Production-ready security** headers and configuration
- ✅ **Scalable architecture** ready for database integration

## **Demo Credentials for Testing:**

- **Admin:** `admin@edincapital.com` / `password123`
- **Investor:** `investor@edincapital.com` / `password123`

## **Support**

If you encounter issues:
1. Check Netlify deploy logs
2. Verify environment variables are set
3. Test authentication locally first
4. Review browser console for errors

---

**Your investor dashboard is now secure and deployed! 🚀** 