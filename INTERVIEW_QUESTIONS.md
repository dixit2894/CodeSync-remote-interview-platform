# 🎯 Next.js Interview Questions & Answers - CodeSync Project

## Table of Contents
1. [Fundamentals](#fundamentals)
2. [App Router & Routing](#app-router--routing)
3. [Server & Client Components](#server--client-components)
4. [Authentication & Security](#authentication--security)
5. [Performance & Optimization](#performance--optimization)
6. [Real-time Features](#real-time-features)
7. [Advanced Patterns](#advanced-patterns)
8. [Debugging & Troubleshooting](#debugging--troubleshooting)
9. [Project-Specific Questions](#project-specific-questions)

---

## Fundamentals

### Q1: What is Next.js and why would you choose it over plain React?

**Answer:**
Next.js is a React framework that provides additional features for production:

**Key Benefits:**
- **Server-Side Rendering (SSR)**: Better SEO and initial load performance
- **Static Site Generation (SSG)**: Pre-built pages for optimal performance
- **File-based Routing**: Automatic route creation based on file structure
- **API Routes**: Built-in backend functionality
- **Built-in Optimizations**: Image, font, and bundle optimizations
- **TypeScript Support**: First-class TypeScript integration

**CodeSync Example:**
```typescript
// Automatic routing: src/app/dashboard/page.tsx → /dashboard
export default function Dashboard() {
  // Server Component by default - better performance
  const interviews = await getInterviews(); // Can fetch data directly
  return <div>{/* Dashboard content */}</div>;
}
```

### Q2: Explain the difference between SSR, SSG, and CSR.

**Answer:**

| **Type** | **When Rendered** | **Use Case** | **CodeSync Example** |
|----------|------------------|--------------|---------------------|
| **SSR** | Server on each request | Dynamic content | User dashboard with real-time data |
| **SSG** | Build time | Static content | Documentation pages |
| **CSR** | Client-side | Interactive features | Meeting room with video calls |

**Implementation:**
```typescript
// SSG - Static generation
export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }];
}

// SSR - Server-side rendering
export default async function Page() {
  const data = await fetch('/api/interviews'); // Runs on server
  return <div>{data}</div>;
}

// CSR - Client-side rendering
"use client";
export default function Interactive() {
  const [state, setState] = useState(); // Client-side state
  return <div>{/* Interactive content */}</div>;
}
```

---

## App Router & Routing

### Q3: What are the differences between App Router and Pages Router?

**Answer:**

| **Feature** | **Pages Router** | **App Router** |
|------------|------------------|----------------|
| **Directory** | `pages/` | `app/` |
| **Components** | Pages only | Server Components default |
| **Layouts** | `_app.js` | Nested `layout.tsx` |
| **Loading** | Custom implementation | Built-in `loading.tsx` |
| **Error Handling** | Custom error pages | Built-in `error.tsx` |

**CodeSync Implementation:**
```typescript
// App Router structure
src/app/
├── layout.tsx          // Root layout
├── (root)/
│   ├── layout.tsx      // Nested layout with Stream provider
│   └── meeting/[id]/
│       └── page.tsx    // Dynamic route
└── (admin)/
    └── dashboard/
        └── page.tsx    // Route group
```

### Q4: How do route groups work and why use them?

**Answer:**
Route groups `(groupName)` organize routes without affecting the URL structure.

**Benefits:**
- **Organization**: Group related routes
- **Layout Separation**: Different layouts for different sections
- **Authorization**: Separate auth logic per group

**CodeSync Example:**
```typescript
// File: src/app/(admin)/dashboard/page.tsx
// URL: /dashboard (not /admin/dashboard)

// File: src/app/(root)/(home)/page.tsx  
// URL: / (not /root/home)

// Different layouts:
// (admin) - Admin-specific layout
// (root) - Stream video provider layout
```

### Q5: Explain dynamic routing with examples.

**Answer:**
Dynamic routes use brackets `[paramName]` for variable URL segments.

**Types:**
1. **Single Dynamic Route**: `[id]` - matches one segment
2. **Catch-all Route**: `[...slug]` - matches multiple segments
3. **Optional Catch-all**: `[[...slug]]` - matches zero or more segments

**CodeSync Implementation:**
```typescript
// File: src/app/(root)/meeting/[id]/page.tsx
import { useParams } from "next/navigation";

export default function MeetingPage() {
  const { id } = useParams();
  
  // id from URL /meeting/abc123
  const { call, isCallLoading } = useGetCallById(id);
  
  if (!call) {
    return <div>Meeting not found</div>;
  }
  
  return <MeetingRoom call={call} />;
}
```

---

## Server & Client Components

### Q6: When should you use Server vs Client Components?

**Answer:**

**Server Components (Default):**
- Data fetching
- Backend API calls
- Security-sensitive operations
- Static content rendering

**Client Components (`"use client"`):**
- User interactions (onClick, onChange)
- React hooks (useState, useEffect)
- Browser APIs (localStorage, window)
- Real-time features

**CodeSync Examples:**
```typescript
// Server Component - Dashboard data fetching
export default async function Dashboard() {
  const interviews = await api.interviews.getAllInterviews();
  return <InterviewList interviews={interviews} />;
}

// Client Component - Interactive meeting room
"use client";
export default function MeetingRoom() {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  
  return (
    <div>
      <button onClick={() => setMicEnabled(!micEnabled)}>
        Toggle Mic
      </button>
    </div>
  );
}
```

### Q7: How do you handle hydration mismatches?

**Answer:**
Hydration mismatches occur when server-rendered HTML differs from client-rendered HTML.

**Common Causes:**
- Date/time rendering
- Random values
- Browser-specific APIs
- Dynamic content

**CodeSync Solution:**
```typescript
// Custom hook to prevent hydration issues
export const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return isClient;
};

// Usage in components
const VideoPlayer = () => {
  const isClient = useIsClient();
  
  if (!isClient) {
    return <div className="placeholder">Loading video...</div>;
  }
  
  return <video autoPlay muted />;
};
```

---

## Authentication & Security

### Q8: How do you implement authentication in Next.js?

**Answer:**
CodeSync uses Clerk for authentication with multiple integration points:

**1. Provider Setup:**
```typescript
// Root layout provider
<ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
  <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
    {children}
  </ConvexProviderWithClerk>
</ClerkProvider>
```

**2. Middleware Protection:**
```typescript
// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/meeting(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});
```

**3. Component-Level Auth:**
```typescript
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Layout({ children }) {
  return (
    <div>
      <SignedIn>
        <Navbar />
        {children}
      </SignedIn>
      <SignedOut>
        <LandingPage />
      </SignedOut>
    </div>
  );
}
```

### Q9: How do you implement role-based access control?

**Answer:**
CodeSync implements RBAC through custom hooks and metadata:

```typescript
// Custom hook for role checking
export const useUserRole = () => {
  const { user } = useUser();
  const userData = useQuery(api.users.getUserByClerkId, {
    clerkId: user?.id || "",
  });
  
  return {
    isLoading: userData === undefined,
    isInterviewer: userData?.role === "interviewer",
    isCandidate: userData?.role === "candidate",
  };
};

// Component protection
const SchedulePage = () => {
  const { isInterviewer, isLoading } = useUserRole();
  
  if (isLoading) return <LoaderUI />;
  if (!isInterviewer) return redirect("/");
  
  return <InterviewScheduleUI />;
};
```

---

## Performance & Optimization

### Q10: How do you optimize a Next.js application for performance?

**Answer:**

**1. Code Splitting:**
```typescript
// Dynamic imports for heavy components
const CodeEditor = dynamic(() => import("@monaco-editor/react"), {
  loading: () => <LoaderUI />,
  ssr: false, // Don't render on server
});
```

**2. Font Optimization:**
```typescript
// next/font for optimal font loading
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
```

**3. Bundle Analysis:**
```json
// package.json
{
  "scripts": {
    "analyze": "ANALYZE=true next build"
  }
}
```

**4. Caching Strategy:**
```typescript
// API route caching
export async function GET() {
  const data = await fetchData();
  
  return Response.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
    }
  });
}
```

### Q11: How do you handle loading states and error boundaries?

**Answer:**

**Loading States:**
```typescript
// Page-level loading
// src/app/dashboard/loading.tsx
export default function Loading() {
  return <LoaderUI />;
}

// Component-level loading
const Dashboard = () => {
  const interviews = useQuery(api.interviews.getAllInterviews);
  
  if (interviews === undefined) return <LoaderUI />;
  if (interviews === null) return <ErrorMessage />;
  
  return <InterviewList interviews={interviews} />;
};
```

**Error Handling:**
```typescript
// Global error boundary
// src/app/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

---

## Real-time Features

### Q12: How do you implement real-time features in Next.js?

**Answer:**
CodeSync uses multiple real-time technologies:

**1. Convex for Data:**
```typescript
// Real-time database queries
const interviews = useQuery(api.interviews.getAllInterviews);
// Automatically updates when data changes via WebSocket

const updateStatus = useMutation(api.interviews.updateInterviewStatus);
await updateStatus({ id, status: "completed" });
// Immediately propagates to all connected clients
```

**2. Stream.io for Video:**
```typescript
// Real-time video integration
<StreamCall call={call}>
  <StreamTheme>
    <MeetingRoom />
  </StreamTheme>
</StreamCall>
```

**3. Custom WebSocket Integration:**
```typescript
// Custom WebSocket hook
const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const ws = new WebSocket(url);
    ws.onmessage = (event) => {
      setMessages(prev => [...prev, JSON.parse(event.data)]);
    };
    setSocket(ws);
    
    return () => ws.close();
  }, [url]);
  
  return { socket, messages };
};
```

---

## Advanced Patterns

### Q13: How do you implement Server Actions in Next.js?

**Answer:**
Server Actions allow you to run server-side code directly from client components:

```typescript
// src/actions/stream.actions.ts
"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

export const streamTokenProvider = async () => {
  const user = await currentUser();
  
  if (!user) throw new Error("User not found");
  
  const streamClient = new StreamClient(
    process.env.NEXT_PUBLIC_STREAM_API_KEY!,
    process.env.STREAM_SECRET_KEY!
  );
  
  const token = streamClient.generateUserToken({
    user_id: user.id,
  });
  
  return token;
};

// Usage in client component
"use client";
export default function VideoSetup() {
  const handleGetToken = async () => {
    const token = await streamTokenProvider(); // Server action call
    // Use token for video setup
  };
}
```

### Q14: How do you handle complex state management?

**Answer:**
CodeSync uses a combination of patterns:

**1. Custom Hooks for Complex Logic:**
```typescript
export const useDynamicData = () => {
  // Backend data via Convex
  const interviewerStats = useQuery(api.interviews.getInterviewerStats);
  const candidateStats = useQuery(api.interviews.getCandidateStats);
  
  // Client state for UI
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [isLoadingPublicData, setIsLoadingPublicData] = useState(true);
  
  // Derived data
  const getDerivedStats = () => {
    if (!interviewerStats) return null;
    // Complex calculations
    return { successRate, efficiencyScore };
  };
  
  return {
    interviewerStats,
    newsData,
    derivedStats: getDerivedStats(),
    isLoading: !interviewerStats || isLoadingPublicData,
  };
};
```

**2. Provider Pattern for Global State:**
```typescript
// Context provider for theme
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

---

## Debugging & Troubleshooting

### Q15: How do you debug routing issues in Next.js?

**Answer:**

**1. Route Resolution Debugging:**
```bash
# Check build output
npm run build
ls -la .next/server/app/

# Enable debug mode
DEBUG=next:router npm run dev
```

**2. Dynamic Route Debugging:**
```typescript
const Page = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  
  console.log("Params:", params);
  console.log("Search params:", searchParams.toString());
  
  // Validate parameter types
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
};
```

**3. Middleware Debugging:**
```typescript
export default clerkMiddleware(async (auth, req) => {
  console.log("🛡️ Middleware - Path:", req.nextUrl.pathname);
  console.log("🛡️ Middleware - Protected:", isProtectedRoute(req));
  
  if (isProtectedRoute(req)) {
    console.log("🛡️ Middleware - Requiring auth");
    await auth.protect();
  }
});
```

---

## Project-Specific Questions

### Q16: Walk me through the CodeSync architecture.

**Answer:**

**Frontend Architecture:**
```
Next.js 14 App Router
├── Authentication: Clerk
├── Database: Convex (real-time)
├── Video: Stream.io
├── UI: Tailwind + shadcn/ui
└── State: React hooks + Convex queries
```

**Key Features:**
1. **Real-time Interview Management**: Convex provides WebSocket connections
2. **Video Conferencing**: Stream.io handles P2P video calls
3. **Role-based Access**: Custom middleware and hooks
4. **Collaborative Coding**: Monaco Editor integration
5. **Recording Playback**: Stream.io recording management

### Q17: How would you scale this application for 10,000+ users?

**Answer:**

**Scaling Strategy:**

1. **Edge Deployment**: Deploy to Vercel Edge for global distribution
2. **Database Optimization**: Convex handles auto-scaling
3. **CDN Strategy**: Static assets via Vercel CDN
4. **Code Splitting**: Lazy load heavy components
5. **Caching**: Implement aggressive caching

```typescript
// Performance optimizations
const CodeEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <LoaderUI />,
});

// Memoization for expensive calculations
const MemoizedInterviewCard = memo(InterviewCard);

// Virtual scrolling for large lists
const VirtualizedInterviewList = ({ interviews }) => {
  return (
    <VirtualList
      height={600}
      itemCount={interviews.length}
      itemSize={120}
    >
      {({ index, style }) => (
        <div style={style}>
          <InterviewCard interview={interviews[index]} />
        </div>
      )}
    </VirtualList>
  );
};
```

### Q18: How would you add a new feature: "Interview Templates"?

**Answer:**

**Implementation Plan:**

1. **Database Schema** (Convex):
```typescript
// convex/schema.ts
export default defineSchema({
  templates: defineTable({
    title: v.string(),
    description: v.string(),
    questions: v.array(v.string()),
    duration: v.number(),
    difficulty: v.string(),
    createdBy: v.id("users"),
    isPublic: v.boolean(),
  }),
});
```

2. **API Functions** (Convex):
```typescript
// convex/templates.ts
export const createTemplate = mutation({
  args: {
    title: v.string(),
    questions: v.array(v.string()),
    // ... other fields
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    
    return await ctx.db.insert("templates", {
      ...args,
      createdBy: identity.subject,
    });
  },
});
```

3. **Route Structure**:
```
src/app/(root)/templates/
├── page.tsx              # List templates
├── create/
│   └── page.tsx          # Create template
└── [id]/
    └── page.tsx          # View/edit template
```

4. **Components**:
```typescript
// TemplateCard component
const TemplateCard = ({ template }) => {
  const useTemplate = useMutation(api.interviews.createFromTemplate);
  
  const handleUseTemplate = async () => {
    await useTemplate({ templateId: template._id });
    router.push('/schedule');
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{template.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{template.description}</p>
        <Badge>{template.difficulty}</Badge>
      </CardContent>
      <CardFooter>
        <Button onClick={handleUseTemplate}>
          Use Template
        </Button>
      </CardFooter>
    </Card>
  );
};
```

This comprehensive Q&A covers all major Next.js concepts as implemented in the CodeSync project, providing both theoretical knowledge and practical implementation examples.