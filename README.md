# CodeSync - Remote Interview Platform

A comprehensive full-stack interview management platform built with Next.js, Convex, Clerk, and Stream that provides seamless video calling, real-time code collaboration, and interview analytics for technical hiring teams.

## Project Overview

CodeSync is a modern remote interview solution that allows interviewers to schedule, conduct, and evaluate coding interviews remotely, while providing candidates with a professional interview experience including video calls and collaborative coding environments.

## Core Features

### Interviewer Features

- *Interview Scheduling* - Calendar-based interview booking system with candidate selection
- *Video Conferencing* - HD video calls with screen sharing and recording capabilities
- *Code Editor Integration* - Real-time collaborative coding environment with syntax highlighting
- *Candidate Evaluation* - Structured feedback and rating system for post-interview assessment
- *Interview Analytics* - Performance tracking and success rate analysis
- *Recording Management* - Access to recorded interview sessions for team review

### Candidate Features

- *Interview Participation* - Join scheduled interviews through secure meeting links
- *Code Collaboration* - Write and edit code in real-time with interviewer guidance
- *Multi-language Support* - Code in JavaScript, Python, or Java with full IDE features
- *Interview Preparation* - Access to coding problems library with examples and constraints

## Technical Implementation

### Frontend Architecture

- *Next.js 14* with App Router for optimized routing and performance
- *TypeScript* for type safety and enhanced developer experience
- *Tailwind CSS* with shadcn/ui for modern, responsive UI components
- *Monaco Editor* integration providing VS Code-like coding experience

### Backend Services Integration

- *Convex Database* for real-time data storage and synchronization
- *Clerk Authentication* for secure user management and session handling
- *Stream Video SDK* for professional-grade video conferencing and recording

### Database Design

- *Users Collection* - Account information, roles, and authentication data
- *Interviews Collection* - Scheduling details, participants, and status tracking
- *Comments Collection* - Feedback, ratings, and evaluation data

## Tech Stack

*Frontend:* Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Monaco Editor  
*Backend:* Convex, Clerk Authentication, Stream Video SDK  
*Database:* Convex Real-time Database

## Installation & Setup

1. *Clone the repository*

   bash
      git clone https://github.com/dixit2894/CodeSync-remote-interview-platform.git
      cd CodeSync-remote-interview-platform
   

2. *Install dependencies*

   bash
      npm install
   

3. *Environment Setup*
   Create .env.local file with required API keys:

   env
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
      CLERK_SECRET_KEY=your_clerk_secret
      NEXT_PUBLIC_STREAM_API_KEY=your_stream_key
      STREAM_SECRET_KEY=your_stream_secret
      CONVEX_DEPLOYMENT=your_convex_deployment
      NEXT_PUBLIC_CONVEX_URL=your_convex_url
   

4. *Setup Convex Database*

   bash
      npx convex dev
   

5. *Run Development Server*
   bash
      npm run dev
   
---

*Built with modern web technologies for the future of technical interviews*
