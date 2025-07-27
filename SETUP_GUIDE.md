# CodeSync Interview Platform - Setup Guide

## Issue Resolution Summary

### 1. Clerk Middleware Error Fix ✅

**Problem**: `clerkMiddleware` is not exported from `@clerk/nextjs/server`
**Solution**: Updated to use `authMiddleware` which is correct for Clerk v4.29.12

### 2. Environment Variables Setup Required

Create a `.env.local` file in your project root with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_here
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret

# Convex Database
NEXT_PUBLIC_CONVEX_URL=https://your-convex-url.convex.cloud
CONVEX_DEPLOY_KEY=your_convex_deploy_key

# Stream.io Video
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_SECRET_KEY=your_stream_secret_key
```

### 3. How to Get Your Keys

#### Clerk Keys:

1. Go to https://dashboard.clerk.com/
2. Select your application
3. Go to "API Keys" section
4. Copy the Publishable key and Secret key

#### Convex Keys:

1. Go to https://dashboard.convex.dev/
2. Select your project
3. Go to Settings → Environment Variables
4. Copy the deployment URL and deploy key

#### Stream.io Keys:

1. Go to https://dashboard.getstream.io/
2. Select your application
3. Go to Dashboard → App Settings
4. Copy the API Key and Secret

### 4. Project Architecture Overview

Your CodeSync platform has:

**Frontend Stack:**

- Next.js 14 with TypeScript
- Tailwind CSS + Radix UI components
- React Hot Toast for notifications

**Authentication:**

- Clerk for user management
- Middleware protection for routes

**Real-time Features:**

- Convex for database and real-time sync
- Comments system for interview feedback

**Video Calling:**

- Stream.io Video SDK for interviews
- Recording capabilities

**Key Features:**

- Interview scheduling system
- Code editor for live coding
- Meeting rooms with video calls
- Recording playback
- Admin dashboard

### 5. Next Steps After Environment Setup

1. **Install dependencies** (if not done):

   ```bash
   npm install
   ```

2. **Set up Convex**:

   ```bash
   npx convex dev
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

### 6. Common Issues & Solutions

**Issue**: Missing publishableKey error
**Solution**: Ensure NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is set in .env.local

**Issue**: Convex connection errors  
**Solution**: Make sure NEXT_PUBLIC_CONVEX_URL is correct and Convex is running

**Issue**: Video features not working
**Solution**: Verify Stream.io API keys are correctly set

### 7. File Structure Explanation

```
src/
├── app/                     # Next.js App Router
│   ├── (admin)/            # Admin-only routes
│   ├── (root)/             # Main app routes
│   └── layout.tsx          # Root layout with providers
├── components/
│   ├── providers/          # Context providers (Clerk, Convex, Theme)
│   ├── ui/                 # Reusable UI components
│   └── [Features]          # Feature-specific components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
└── middleware.ts           # Route protection

convex/                     # Backend logic
├── auth.config.ts          # Clerk integration
├── interviews.ts           # Interview management
├── users.ts               # User operations
└── schema.ts              # Database schema
```

The middleware now correctly protects your routes while allowing public access to the homepage and API endpoints.
