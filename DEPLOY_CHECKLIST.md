# 🚨 URGENT: Fix 404 Authentication Issue

## Current Problem
Your site at `investor.edin.capital` is returning a 404 error for `/api/auth/signin` because of missing environment variables and configuration issues.

## ✅ IMMEDIATE FIXES NEEDED

### 1. Set Environment Variables in Netlify Dashboard

**Go to**: Netlify Dashboard → Your Site → Site Settings → Environment Variables

**Add these variables:**

```bash
# CRITICAL - Authentication will fail without these
NEXTAUTH_URL=https://investor.edin.capital
NEXTAUTH_SECRET=generate-a-32-character-secret-key-here

# Your existing variables (copy from local .env.local if you have them)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-email-here
GOOGLE_PRIVATE_KEY=your-private-key-here
GOOGLE_SHEET_ID=your-sheet-id-here
AIRTABLE_API_KEY=your-airtable-key-here
AIRTABLE_BASE_ID=your-base-id-here
```

### 2. Generate NEXTAUTH_SECRET

Run this command locally to generate a secure secret:

```bash
openssl rand -base64 32
```

Copy the output and use it as your `NEXTAUTH_SECRET` value.

### 3. Deploy the Fixed Configuration

The `netlify.toml` file has been updated to fix the routing issues. You need to:

1. Commit these changes:
   ```bash
   git add .
   git commit -m "Fix Netlify configuration for NextAuth"
   git push
   ```

2. Or manually trigger a redeploy in Netlify dashboard

### 4. Verify the Fix

After deployment with correct environment variables:

1. Visit: `https://investor.edin.capital`
2. It should redirect to: `https://investor.edin.capital/auth/signin`
3. Test login with:
   - Email: `admin@edincapital.com`
   - Password: `password123`

## 🔧 What Was Fixed

1. **Removed conflicting redirects** from `netlify.toml` that were interfering with NextAuth
2. **Simplified configuration** to let `@netlify/plugin-nextjs` handle routing automatically
3. **Proper publish directory** configuration for Next.js

## ⚠️ Critical Notes

- **NextAuth requires server-side rendering** - cannot be static exported
- **Environment variables MUST be set** in Netlify dashboard, not just locally
- **NEXTAUTH_URL must match your exact domain** including https://

## 📞 If Still Not Working

1. Check Netlify deploy logs for errors
2. Verify all environment variables are saved in Netlify
3. Ensure no typos in `NEXTAUTH_URL` (must be exact domain)
4. Try clearing browser cache and cookies

---

**Expected Result**: Authentication should work and users can sign in successfully at `https://investor.edin.capital` 