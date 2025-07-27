# 🚀 CodeSync

**CodeSync** is a modern, full-stack interview and meeting management platform built with Next.js, Convex, Clerk, and Stream. It provides a seamless experience for scheduling, conducting, and reviewing technical interviews, with real-time video, code collaboration, and feedback features.

---

## 📚 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [⚡ Getting Started](#-getting-started)
- [📜 Available Scripts](#-available-scripts)
- [🧩 Key Components & Pages](#-key-components--pages)
- [🗄️ Backend & Data Model](#-backend--data-model)
- [🪝 Custom Hooks](#-custom-hooks)
- [🧱 UI Primitives](#-ui-primitives)
- [🌐 Providers](#-providers)
- [🚢 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)

---

## ✨ Features

- 🔐 **User Authentication**: Secure sign-in/sign-up with Clerk.
- 📅 **Interview Scheduling**: Schedule interviews with a calendar UI.
- 🎥 **Real-Time Video Meetings**: Powered by Stream’s video SDK.
- 👨‍💻 **Collaborative Code Editor**: Monaco-based code editor for live coding.
- 💬 **Commenting & Feedback**: Dialogs for interview feedback and comments.
- 🛡️ **Role-Based Access**: Admin dashboard for managing interviews and users.
- 🎞️ **Recordings**: Access and review past interview recordings.
- 🖥️ **Responsive UI**: Built with Radix UI, Tailwind CSS, and custom components.
- 🌗 **Dark/Light Mode**: Theme toggle for user preference.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router), React 18, Tailwind CSS, Radix UI, Monaco Editor
- **Backend**: Convex (serverless functions, data model)
- **Authentication**: Clerk
- **Video/Meetings**: Stream Video SDK
- **State/Context**: React Context, custom providers
- **Other**: date-fns, react-hot-toast, clsx, lucide-react

---

## 📁 Project Structure

```text
CodeSync/
├── convex/                # Convex backend functions, schema, and config
├── public/                # Static assets (images, videos)
├── src/
│   ├── actions/           # Server actions (e.g., streaming)
│   ├── app/               # Next.js app directory (routing, pages)
│   │   ├── (root)/        # Main user-facing routes
│   │   ├── (admin)/       # Admin dashboard routes
│   ├── components/        # UI and functional React components
│   │   ├── ui/            # Reusable UI primitives (button, card, etc.)
│   │   ├── providers/     # Context and state providers
│   ├── constants/         # App-wide constants
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions and API wrappers
│   ├── middleware.ts      # Next.js middleware (auth, etc.)
├── package.json           # Project metadata and dependencies
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

---

## ⚡ Getting Started

### Prerequisites

- 🟢 Node.js 18+
- 📦 npm, yarn, pnpm, or bun

### Installation

```bash
git clone https://github.com/harsh8104/CodeSync.git
cd CodeSync
npm install
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📜 Available Scripts

- `npm run dev` – 🚧 Start the development server
- `npm run build` – 🏗️ Build for production
- `npm run start` – 🚀 Start the production server
- `npm run lint` – 🧹 Lint the codebase

---

## 🧩 Key Components & Pages

### Main Pages

- 🏠 **Home**: `src/app/(root)/(home)/page.tsx` – Landing and overview.
- 📅 **Schedule**: `src/app/(root)/schedule/` – Interview scheduling UI.
- 📝 **Meeting Room**: `src/app/(root)/meeting/[id]/page.tsx` – Real-time video and code interview.
- 🎞️ **Recordings**: `src/app/(root)/recordings/page.tsx` – List and review past interviews.
- 🛡️ **Admin Dashboard**: `src/app/(admin)/dashboard/page.tsx` – Manage users and interviews.

### Important Components

- 🏠 `LandingPage.tsx` – Main landing UI.
- 📝 `MeetingRoom.tsx` – Handles video, code editor, and chat.
- 👨‍💻 `CodeEditor.tsx` – Monaco-based collaborative code editor.
- 💬 `CommentDialog.tsx` – Feedback and comment dialog.
- 🧭 `Navbar.tsx`, `DashboardBtn.tsx`, `UserInfo.tsx` – Navigation and user info.
- 🎞️ `RecordingCard.tsx`, `MeetingCard.tsx` – Display for recordings and meetings.

---

## 🗄️ Backend & Data Model

- **Convex**: All backend logic, data models, and serverless functions are in the `convex/` directory.
  - 🗂️ `schema.ts` – Convex data schema.
  - 👤 `users.ts`, 📋 `interviews.ts`, 💬 `comments.ts` – Business logic for users, interviews, and comments.
  - 🔐 `auth.config.ts` – Authentication configuration.
  - 🌐 `http.ts` – HTTP endpoints for integrations.

---

## 🪝 Custom Hooks

- 🔄 `useDynamicData.ts` – Fetches and manages dynamic data.
- 🛡️ `useUserRole.ts` – Determines user roles (admin, interviewer, candidate).
- 📞 `useGetCalls.ts`, `useGetCallById.ts` – Fetches meeting/call data.
- 📝 `useMeetingActions.ts` – Actions for meetings (start, end, etc.).

---

## 🧱 UI Primitives

Reusable UI components in `src/components/ui/`:

- 🔘 `button.tsx`, 🃏 `card.tsx`, 💬 `dialog.tsx`, 🗂️ `dropdown-menu.tsx`, 🔤 `input.tsx`, 🔽 `select.tsx`, 🔀 `switch.tsx`, 📅 `calendar.tsx`, 👤 `avatar.tsx`, 🏷️ `badge.tsx`, 🏷️ `label.tsx`, 📝 `textarea.tsx`, 🖱️ `scroll-area.tsx`, 📏 `resizable.tsx`

---

## 🌐 Providers

Context and state providers in `src/components/providers/`:

- 🌗 `ThemeProvider.tsx` – Dark/light mode.
- 📹 `StreamClientProvider.tsx` – Stream video context.
- 🔐 `ConvexClerkProvider.tsx` – Convex and Clerk integration.

---

## 🚢 Deployment

The app is ready to deploy on platforms like **Vercel**. See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 🤝 Contributing

1. 🍴 Fork the repo and create your branch.
2. 🛠️ Make your changes and add tests if applicable.
3. 🧹 Run `npm run lint` and ensure all checks pass.
4. 📬 Submit a pull request.

---

**For more details, see the codebase and inline documentation.**
