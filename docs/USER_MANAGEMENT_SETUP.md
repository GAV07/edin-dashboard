# User Management System Setup

## 🎯 **Overview**

Your investor dashboard now has a complete user management system that allows you to easily onboard new investors and manage user accounts. Here's how to set it up and use it.

## 🔧 **Setup Options**

### **Option 1: Database Setup (Recommended for Production)**

For production use, set up a Supabase database to store users:

#### **1. Create Supabase Project**
1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Get your project URL and service role key

#### **2. Create Users Table**
Run this SQL in your Supabase SQL editor:

```sql
-- Create users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'investor')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON users 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial admin user (password is 'password123')
INSERT INTO users (email, password_hash, name, role) VALUES 
('demo-admin@example.com', '$2b$12$6/.4/lJbAxylYEA3Ght5neBkQ/ZkI3SxXVLnjYBk8ufQPuieQ3J.C', 'Demo Admin', 'admin');
```

#### **3. Add Environment Variables**
Add to your `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### **Option 2: In-Memory Users (Development/Testing)**

For development, the system automatically falls back to in-memory users if no database is configured.

## 🚀 **How to Add New Users**

### **Method 1: Admin Interface (Recommended)**

1. **Sign in as Admin**
   - Email: `demo-admin@example.com`
   - Password: `password123`

2. **Access User Management**
   - Look for "Manage Users" in the sidebar (admin only)
   - Or go directly to `/admin/users`

3. **Add New User**
   - Click "Add New User" button
   - Fill in the form:
     - **Full Name**: Investor's full name
     - **Email**: Their email address
     - **Password**: Temporary password (min 8 characters)
     - **Role**: Select "Investor" or "Admin"
   - Click "Create User"

4. **Manage Existing Users**
   - View all users in the table
   - Activate/Deactivate accounts
   - See user creation dates and roles

### **Method 2: API Endpoint (Programmatic)**

For bulk imports or automated onboarding:

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -H "Cookie: your-admin-session-cookie" \
  -d '{
    "email": "newvestor@example.com",
    "password": "temporarypass123",
    "name": "New Investor",
    "role": "investor"
  }'
```

## 👥 **User Roles**

### **Admin Users**
- Full access to all dashboard features
- Can create, edit, and manage other users
- Access to user management interface
- Can activate/deactivate accounts

### **Investor Users**
- Access to all dashboard data and analytics
- Cannot manage other users
- Standard dashboard permissions

## 🔐 **Security Features**

### **Password Requirements**
- Minimum 8 characters
- Automatically hashed with bcrypt
- Secure password verification

### **Account Management**
- Soft delete (deactivation) instead of permanent deletion
- Admin cannot deactivate their own account
- Role-based access control

### **Session Security**
- 24-hour session expiration
- Secure JWT tokens
- Analytics tracking for all user actions

## 📊 **Analytics Integration**

All user management actions are tracked in Google Analytics:

### **Events Tracked**
- User creation by admin
- User login/logout
- Password changes
- Account activation/deactivation

### **User Properties**
- User ID
- Role (admin/investor)
- Email domain
- Registration date

## 🛠 **Onboarding New Investors**

### **Standard Process**

1. **Admin creates account**
   - Use admin interface to add new user
   - Set role to "Investor"
   - Use a temporary secure password

2. **Send credentials securely**
   - Email or communicate credentials through secure channel
   - Include login URL: `https://your-domain.com/auth/signin`

3. **First login guidance**
   - Investor signs in with provided credentials
   - Guide them through the dashboard features
   - Recommend they change password (future feature)

### **Bulk Onboarding**

For multiple investors:

1. **Prepare user data** in spreadsheet format
2. **Use API endpoints** to programmatically create accounts
3. **Generate welcome emails** with credentials
4. **Track onboarding** through analytics

## 🔄 **Managing Existing Users**

### **Deactivating Users**
- Use admin interface to deactivate accounts
- User loses access immediately
- Data remains for historical tracking

### **Reactivating Users**
- Click "Activate" button in admin interface
- User regains immediate access
- Analytics tracks reactivation

### **Role Changes**
- Update user role through admin interface
- Changes take effect on next login
- Tracked in analytics

## 🚨 **Troubleshooting**

### **Common Issues**

#### **"Cannot access admin panel"**
- Verify you're signed in as admin role
- Check that `/admin/users` URL is correct
- Ensure admin role in user record

#### **"Failed to create user"**
- Check all required fields are filled
- Verify email format is valid
- Ensure email doesn't already exist

#### **"Database connection error"**
- Verify Supabase environment variables
- Check Supabase project is running
- Falls back to in-memory users automatically

#### **"User can't login"**
- Verify account is active
- Check password is correct
- Ensure no typos in email

### **Reset Admin Password**

If you lose admin access:

1. **With Database**: Update password hash directly in Supabase
2. **Without Database**: Modify fallback users in `src/lib/auth.ts`

## 📈 **Scaling Considerations**

### **Database Optimization**
- Add indexes for email lookups
- Implement user search functionality
- Consider user activity logging

### **Enhanced Security**
- Add password reset functionality
- Implement 2FA for admin accounts
- Add login attempt rate limiting

### **User Experience**
- Add user registration flow
- Implement password change feature
- Create user profile management

## 🎯 **Next Steps**

### **Immediate (Production Ready)**
1. Set up Supabase database
2. Add environment variables
3. Test user creation process
4. Train admin team on user management

### **Future Enhancements**
1. **Self-Service Password Reset**
2. **User Profile Management** 
3. **Activity Audit Logs**
4. **Bulk User Import/Export**
5. **Advanced Role Permissions**

## 📋 **Admin Checklist**

- [ ] Database configured (if using)
- [ ] Environment variables set
- [ ] Admin account working
- [ ] Test user creation process
- [ ] Test user login process
- [ ] Analytics tracking verified
- [ ] User management access confirmed
- [ ] Backup/recovery plan in place

## 🎉 **You're Ready!**

Your user management system is now fully operational. You can:

✅ **Easily onboard new investors**  
✅ **Manage user accounts securely**  
✅ **Track all user activity**  
✅ **Scale with your business growth**  

For any issues or questions, refer to this guide or check the system logs for detailed error information. 