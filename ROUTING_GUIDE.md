# CodeSync Route Structure & Implementation Guide

## 📂 Complete Route Analysis

### **Current Route Structure**

```
CodeSync Application Routes:
├── / (Home)                           → src/app/(root)/(home)/page.tsx
├── /dashboard (Admin Only)            → src/app/(admin)/dashboard/page.tsx
├── /schedule (Interviewer Only)       → src/app/(root)/schedule/page.tsx
├── /meeting/[id] (Dynamic)           → src/app/(root)/meeting/[id]/page.tsx
└── /recordings (Authenticated)        → src/app/(root)/recordings/page.tsx
```

### **Route Groups Implementation**

#### **1. `(root)` Route Group**
**Purpose**: Main application routes with Stream video provider
**Layout**: `src/app/(root)/layout.tsx`

```typescript
// src/app/(root)/layout.tsx
import StreamClientProvider from "@/components/providers/StreamClientProvider";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <StreamClientProvider>{children}</StreamClientProvider>;
};

export default layout;
```

**Routes in this group**:
- Home page: `(home)/page.tsx`
- Schedule: `schedule/page.tsx`
- Meetings: `meeting/[id]/page.tsx`
- Recordings: `recordings/page.tsx`

#### **2. `(admin)` Route Group**
**Purpose**: Admin-only routes with specific permissions
**Layout**: No custom layout (inherits from root)

```typescript
// src/app/(admin)/dashboard/page.tsx
"use client";

function DashboardPage() {
  const users = useQuery(api.users.getUsers);
  const interviews = useQuery(api.interviews.getAllInterviews);
  
  // Admin-specific functionality
  const handleStatusUpdate = async (id: string, status: string) => {
    await updateStatus({ id, status });
  };
  
  return (
    <div className="container mx-auto py-10">
      {/* Admin dashboard content */}
    </div>
  );
}
```

### **Dynamic Route Implementation**

#### **Meeting Route: `/meeting/[id]`**

```typescript
// src/app/(root)/meeting/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";

const MeetingPage = () => {
  const { id } = useParams(); // Extract [id] parameter
  const { isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);

  if (!isLoaded || isCallLoading) {
    return <LoaderUI />;
  }

  if (!call) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold">Meeting not found</p>
      </div>
    );
  }

  return (
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetupComplete ? (
          <MeetingSetup onSetupComplete={() => setIsSetupComplete(true)} />
        ) : (
          <MeetingRoom />
        )}
      </StreamTheme>
    </StreamCall>
  );
};
```

## 🔒 Route Protection Implementation

### **Middleware Protection**

```typescript
// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",      // Admin routes
  "/schedule(.*)",       // Interviewer routes
  "/meeting(.*)",        // Meeting routes
  "/recordings(.*)",     // Recording routes
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect(); // Require authentication
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
```

### **Component-Level Protection**

```typescript
// src/app/(root)/schedule/page.tsx
"use client";

function SchedulePage() {
  const router = useRouter();
  const { isInterviewer, isLoading } = useUserRole();

  // Loading state
  if (isLoading) return <LoaderUI />;
  
  // Role-based redirect
  if (!isInterviewer) return router.push("/");

  // Protected content
  return <InterviewScheduleUI />;
}
```

## 🎯 Route-Specific Interview Questions

### **Q: How would you add a new route `/interviews/history` for candidates?**

**A: Step-by-step implementation:**

1. **Create the route file:**
```
src/app/(root)/interviews/history/page.tsx
```

2. **Implement the component:**
```typescript
"use client";

import { useUserRole } from "@/hooks/useUserRole";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

function InterviewHistoryPage() {
  const { isCandidate, isLoading } = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);

  if (isLoading) return <LoaderUI />;
  if (!isCandidate) return <div>Access denied</div>;

  return (
    <div className="container mx-auto py-10">
      <h1>My Interview History</h1>
      {interviews?.map(interview => (
        <InterviewCard key={interview._id} interview={interview} />
      ))}
    </div>
  );
}

export default InterviewHistoryPage;
```

3. **Update middleware if needed:**
```typescript
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/schedule(.*)",
  "/meeting(.*)",
  "/recordings(.*)",
  "/interviews(.*)", // Add new route pattern
]);
```

### **Q: How would you implement nested layouts for different user types?**

**A: Create role-based layout groups:**

1. **Interviewer Layout:**
```typescript
// src/app/(interviewer)/layout.tsx
import InterviewerNavbar from "@/components/InterviewerNavbar";

export default function InterviewerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <InterviewerNavbar />
      <main className="interviewer-layout">
        {children}
      </main>
    </div>
  );
}
```

2. **Candidate Layout:**
```typescript
// src/app/(candidate)/layout.tsx
import CandidateNavbar from "@/components/CandidateNavbar";

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <CandidateNavbar />
      <main className="candidate-layout">
        {children}
      </main>
    </div>
  );
}
```

### **Q: How would you implement catch-all routes for a documentation section?**

**A: Implementation example:**

```typescript
// src/app/docs/[...slug]/page.tsx
import { notFound } from "next/navigation";

interface DocsPageProps {
  params: {
    slug: string[];
  };
}

export default function DocsPage({ params }: DocsPageProps) {
  const { slug } = params;
  
  // slug is an array: ['getting-started', 'installation']
  // URL: /docs/getting-started/installation
  
  const docPath = slug.join('/');
  const docContent = getDocumentation(docPath);
  
  if (!docContent) {
    notFound(); // Returns 404 page
  }
  
  return (
    <div>
      <h1>{docContent.title}</h1>
      <div>{docContent.content}</div>
    </div>
  );
}

// Generate static params for known docs
export async function generateStaticParams() {
  return [
    { slug: ['getting-started'] },
    { slug: ['getting-started', 'installation'] },
    { slug: ['api', 'authentication'] },
  ];
}
```

## 🔄 Navigation Patterns

### **Programmatic Navigation**

```typescript
import { useRouter } from "next/navigation";

const MyComponent = () => {
  const router = useRouter();
  
  const handleNavigation = () => {
    // Navigate to dynamic route
    router.push(`/meeting/${meetingId}`);
    
    // Navigate with query params
    router.push('/dashboard?tab=scheduled');
    
    // Replace current route
    router.replace('/');
    
    // Go back
    router.back();
  };
};
```

### **Link Component Usage**

```typescript
import Link from "next/link";

const Navigation = () => {
  return (
    <nav>
      {/* Static route */}
      <Link href="/dashboard">Dashboard</Link>
      
      {/* Dynamic route */}
      <Link href={`/meeting/${meetingId}`}>
        Join Meeting
      </Link>
      
      {/* Conditional navigation */}
      <Link 
        href={isInterviewer ? "/schedule" : "/interviews"}
        className={isActive ? "active" : ""}
      >
        My Interviews
      </Link>
    </nav>
  );
};
```

## 📱 Mobile Route Considerations

### **Responsive Route Behavior**

```typescript
// Check for mobile and adjust behavior
import { useEffect, useState } from "react";

const MeetingPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  
  return (
    <div>
      {isMobile ? (
        <MobileMeetingInterface />
      ) : (
        <DesktopMeetingInterface />
      )}
    </div>
  );
};
```

## 🎯 Advanced Routing Patterns

### **Route Interception (Example)**

```typescript
// Intercept meeting route for modal
// src/app/(.)meeting/[id]/page.tsx

export default function InterceptedMeeting() {
  return (
    <Modal>
      <MeetingPreview />
    </Modal>
  );
}
```

### **Parallel Routes (Example)**

```typescript
// Show sidebar and main content simultaneously
// src/app/@sidebar/page.tsx
export default function Sidebar() {
  return <div>Sidebar content</div>;
}

// src/app/@main/page.tsx
export default function Main() {
  return <div>Main content</div>;
}

// src/app/layout.tsx
export default function Layout({
  children,
  sidebar,
  main,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  main: React.ReactNode;
}) {
  return (
    <div className="layout">
      <div className="sidebar">{sidebar}</div>
      <div className="main">{main}</div>
      <div className="children">{children}</div>
    </div>
  );
}
```

## 🔧 Route Debugging Tips

### **1. Check Route Resolution**
```bash
# Build and analyze routes
npm run build

# Check .next folder structure
ls -la .next/server/app/
```

### **2. Debug Dynamic Routes**
```typescript
const MeetingPage = () => {
  const params = useParams();
  console.log("Current params:", params);
  
  // Log all available parameters
  console.log("Meeting ID:", params.id);
  console.log("Params type:", typeof params.id);
  
  // Handle array vs string params
  const meetingId = Array.isArray(params.id) ? params.id[0] : params.id;
};
```

### **3. Route Protection Debugging**
```typescript
// Add logging to middleware
export default clerkMiddleware(async (auth, req) => {
  console.log("Middleware - Path:", req.nextUrl.pathname);
  console.log("Middleware - Protected:", isProtectedRoute(req));
  
  if (isProtectedRoute(req)) {
    console.log("Middleware - Requiring auth");
    await auth.protect();
  }
});
```

This comprehensive route analysis provides practical examples and patterns for implementing and debugging Next.js routing in a real-world application like CodeSync.