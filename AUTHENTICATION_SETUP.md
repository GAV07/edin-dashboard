# Authentication Setup Guide

## Overview
Your Next.js application now has a complete authentication system with Google Analytics integration. Here's what has been implemented:

## Features Implemented

### 🔐 Authentication System
- **NextAuth.js (Auth.js)** for secure authentication
- **Credentials provider** with email/password login
- **JWT session management** with 24-hour expiration
- **Protected routes** via middleware
- **Role-based access** (admin, investor)

### 📊 Google Analytics Integration
- **User session tracking** with authenticated user data
- **Page view tracking** with user context
- **Event tracking** for login, logout, and failed attempts
- **User properties** including role and email
- **Enhanced analytics** for user behavior analysis

### 🛡️ Security Features
- **Password hashing** with bcryptjs
- **Session protection** with JWT tokens
- **Route protection** middleware
- **Secure cookie handling**

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in your project root with the following variables:

```bash
# NextAuth Configuration
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000

# Your existing environment variables...
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-google-service-account-email
GOOGLE_PRIVATE_KEY=your-google-private-key
GOOGLE_SHEET_ID=your-google-sheet-id
AIRTABLE_API_KEY=your-airtable-api-key
AIRTABLE_BASE_ID=your-airtable-base-id
```

### 2. Generate a Strong Secret
Run this command to generate a secure NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

### 3. Demo Credentials
The system comes with demo users:

**Admin User:**
- Email: `admin@edincapital.com`
- Password: `password123`
- Role: `admin`

**Investor User:**
- Email: `investor@edincapital.com`
- Password: `password123`
- Role: `investor`

## File Structure

```
src/
├── app/
│   ├── api/auth/[...nextauth]/route.ts    # NextAuth API routes
│   ├── auth/signin/page.tsx               # Sign-in page
│   └── layout.tsx                         # Updated with providers
├── components/
│   ├── AuthProvider.tsx                   # NextAuth session provider
│   ├── AnalyticsWrapper.tsx              # GA integration
│   └── Sidebar.tsx                       # Updated with user info
├── lib/
│   └── auth.ts                           # NextAuth configuration
├── types/
│   └── next-auth.d.ts                    # TypeScript declarations
└── middleware.ts                         # Route protection
```

## How It Works

### 1. Route Protection
- All routes except `/auth/signin` require authentication
- Unauthenticated users are redirected to sign-in page
- Middleware automatically protects your application

### 2. Session Management
- Sessions last 24 hours
- JWT tokens store user ID and role
- Automatic session renewal on activity

### 3. Google Analytics Tracking
- **Login Events:** Tracked with user ID and role
- **Page Views:** Include user context
- **User Properties:** Role, email, and ID
- **Session Events:** Track user engagement

### 4. User Interface
- **Sign-in page:** Modern, responsive design
- **Sidebar integration:** Shows user info and sign-out
- **Role-based styling:** Different colors for user roles

## Analytics Events Tracked

```javascript
// Login success
gtag('event', 'login', {
  method: 'credentials',
  user_id: 'user_id',
  event_category: 'Authentication'
});

// Login failure
gtag('event', 'login_failed', {
  event_category: 'Authentication',
  event_label: 'Credentials'
});

// Logout
gtag('event', 'logout', {
  event_category: 'Authentication',
  user_id: 'user_id'
});

// Page views with user context
gtag('event', 'page_view', {
  page_title: 'Dashboard',
  user_id: 'user_id',
  event_category: 'Navigation'
});
```

## Customization

### Adding New Users
Update the `users` array in `src/lib/auth.ts`:

```typescript
const users = [
  {
    id: "3",
    email: "newuser@edincapital.com",
    password: await bcrypt.hash("newpassword", 12),
    name: "New User",
    role: "investor"
  }
  // ... existing users
]
```

### Adding Database Support
For production, replace the in-memory user store with a proper database:

1. Install Prisma: `npm install prisma @prisma/client`
2. Set up your database schema
3. Update the auth configuration to use database queries

### Customizing Roles
Add new roles in the TypeScript declarations and auth configuration:

```typescript
// In next-auth.d.ts
interface User extends DefaultUser {
  role: 'admin' | 'investor' | 'viewer' | 'editor'
}
```

## Testing the Implementation

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Access the application:**
   - Visit `http://localhost:3000`
   - You'll be redirected to `/auth/signin`

3. **Test login:**
   - Use demo credentials to log in
   - Check Google Analytics for tracked events

4. **Test protection:**
   - Try accessing pages without authentication
   - Verify redirect to sign-in page

## Security Considerations

### Production Deployment
- Use a strong, unique `NEXTAUTH_SECRET`
- Implement proper password policies
- Use HTTPS in production
- Consider rate limiting for login attempts
- Implement proper error handling

### Database Migration
- Move from in-memory users to database
- Implement user registration
- Add password reset functionality
- Consider OAuth providers (Google, GitHub, etc.)

## Troubleshooting

### Common Issues

1. **"Invalid credentials" error:**
   - Check username/password combination
   - Verify password hashing is correct

2. **Redirect loop:**
   - Check middleware configuration
   - Verify NEXTAUTH_URL is correct

3. **Session not persisting:**
   - Check NEXTAUTH_SECRET is set
   - Verify cookie settings

4. **Analytics not tracking:**
   - Check Google Analytics ID
   - Verify gtag is loaded
   - Check browser console for errors

## Next Steps

1. **Add user registration** for new users
2. **Implement password reset** functionality
3. **Add OAuth providers** (Google, GitHub)
4. **Create admin dashboard** for user management
5. **Add activity logging** for audit trails
6. **Implement 2FA** for enhanced security

## Support

For questions or issues:
- Check the NextAuth.js documentation: https://next-auth.js.org/
- Review Google Analytics documentation for custom events
- Contact the development team for custom modifications

---

🎉 **Your authentication system is now ready!** Users must sign in to access the dashboard, and all user activities are tracked in Google Analytics. 