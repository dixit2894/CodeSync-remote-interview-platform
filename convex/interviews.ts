import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAllInterviews = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const interviews = await ctx.db.query("interviews").collect();
    return interviews;
  },
});

export const getMyInterviews = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const interviews = await ctx.db
      .query("interviews")
      .withIndex("by_candidate_id", (q) =>
        q.eq("candidateId", identity.subject)
      )
      .collect();

    return interviews;
  },
});

export const getInterviewerInterviews = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const interviews = await ctx.db.query("interviews").collect();
    return interviews.filter((interview) =>
      interview.interviewerIds.includes(identity.subject)
    );
  },
});

export const getInterviewerStats = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const interviews = await ctx.db.query("interviews").collect();
    const comments = await ctx.db.query("comments").collect();

    const myInterviews = interviews.filter((interview) =>
      interview.interviewerIds.includes(identity.subject)
    );

    const myComments = comments.filter(
      (comment) => comment.interviewerId === identity.subject
    );

    const totalInterviews = myInterviews.length;
    const completedInterviews = myInterviews.filter(
      (i) => i.status === "completed"
    ).length;
    const succeededInterviews = myInterviews.filter(
      (i) => i.status === "succeeded"
    ).length;
    const failedInterviews = myInterviews.filter(
      (i) => i.status === "failed"
    ).length;
    const upcomingInterviews = myInterviews.filter(
      (i) => i.status === "upcoming"
    ).length;

    const candidatesEvaluated =
      completedInterviews + succeededInterviews + failedInterviews;

    const interviewsWithComments = myComments.map(
      (comment) => comment.interviewId
    );
    const pendingReviews = myInterviews.filter(
      (i) =>
        (i.status === "completed" ||
          i.status === "succeeded" ||
          i.status === "failed") &&
        !interviewsWithComments.includes(i._id)
    ).length;

    const avgRating =
      myComments.length > 0
        ? (
            myComments.reduce((sum, comment) => sum + comment.rating, 0) /
            myComments.length
          ).toFixed(1)
        : "0.0";

    // Calculate monthly rating change
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    const thisMonthComments = myComments.filter((comment) => {
      const commentDate = new Date(comment._creationTime);
      return commentDate > monthAgo;
    });

    const lastMonthComments = myComments.filter((comment) => {
      const commentDate = new Date(comment._creationTime);
      const twoMonthsAgo = new Date();
      twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
      return commentDate > twoMonthsAgo && commentDate <= monthAgo;
    });

    const thisMonthAvgRating =
      thisMonthComments.length > 0
        ? thisMonthComments.reduce((sum, comment) => sum + comment.rating, 0) /
          thisMonthComments.length
        : 0;

    const lastMonthAvgRating =
      lastMonthComments.length > 0
        ? lastMonthComments.reduce((sum, comment) => sum + comment.rating, 0) /
          lastMonthComments.length
        : 0;

    const monthlyRatingChange = thisMonthAvgRating - lastMonthAvgRating;

    const thisWeekInterviews = myInterviews.filter((i) => {
      const interviewDate = new Date(i.startTime);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return interviewDate > weekAgo;
    }).length;

    const thisWeekCompleted = myInterviews.filter((i) => {
      const interviewDate = new Date(i.startTime);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return (
        interviewDate > weekAgo &&
        (i.status === "completed" ||
          i.status === "succeeded" ||
          i.status === "failed")
      );
    }).length;

    console.log("Interviewer Stats Debug:", {
      totalInterviews,
      completedInterviews,
      succeededInterviews,
      failedInterviews,
      upcomingInterviews,
      candidatesEvaluated,
      pendingReviews,
      myCommentsCount: myComments.length,
      interviewsWithCommentsCount: interviewsWithComments.length,
    });

    return {
      totalInterviews,
      completedInterviews,
      candidatesEvaluated,
      pendingReviews,
      avgRating,
      monthlyRatingChange,
      thisWeekInterviews,
      thisWeekCompleted,
    };
  },
});

export const getCandidateStats = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const interviews = await ctx.db
      .query("interviews")
      .withIndex("by_candidate_id", (q) =>
        q.eq("candidateId", identity.subject)
      )
      .collect();

    const totalInterviews = interviews.length;
    const completedInterviews = interviews.filter(
      (i) =>
        i.status === "completed" ||
        i.status === "succeeded" ||
        i.status === "failed"
    ).length;
    const upcomingInterviews = interviews.filter(
      (i) => i.status === "upcoming"
    ).length;
    const succeededInterviews = interviews.filter(
      (i) => i.status === "succeeded"
    ).length;
    const failedInterviews = interviews.filter(
      (i) => i.status === "failed"
    ).length;

    console.log("Candidate Stats Debug:", {
      totalInterviews,
      completedInterviews,
      upcomingInterviews,
      succeededInterviews,
      failedInterviews,
      allStatuses: interviews.map((i) => i.status),
    });

    return {
      totalInterviews,
      completedInterviews,
      upcomingInterviews,
    };
  },
});

export const getRecentActivity = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) return [];

    const interviews = await ctx.db.query("interviews").collect();
    const comments = await ctx.db.query("comments").collect();
    const users = await ctx.db.query("users").collect();

    let relevantInterviews = [];

    if (user.role === "interviewer") {
      relevantInterviews = interviews.filter((interview) =>
        interview.interviewerIds.includes(identity.subject)
      );
    } else {
      relevantInterviews = interviews.filter(
        (interview) => interview.candidateId === identity.subject
      );
    }

    const recentInterviews = relevantInterviews
      .sort((a, b) => b.startTime - a.startTime)
      .slice(0, 5);

    const activity = recentInterviews.map((interview) => {
      const candidate = users.find((u) => u.clerkId === interview.candidateId);
      const interviewers = users.filter((u) =>
        interview.interviewerIds.includes(u.clerkId)
      );

      const timeAgo = getTimeAgo(interview.startTime);

      if (user.role === "interviewer") {
        return {
          type: "interview",
          title: `Interview with ${candidate?.name || "Unknown Candidate"}`,
          time: timeAgo,
          status: interview.status,
          interviewId: interview._id,
        };
      } else {
        return {
          type: "interview",
          title: `Interview with ${interviewers.map((i) => i.name).join(", ")}`,
          time: timeAgo,
          status: interview.status,
          interviewId: interview._id,
        };
      }
    });

    return activity;
  },
});

export const getInterviewByStreamCallId = query({
  args: {
    streamCallId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("interviews")
      .withIndex("by_stream_call_id", (q) =>
        q.eq("streamCallId", args.streamCallId)
      )
      .first();
  },
});

export const createInterview = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    status: v.string(),
    streamCallId: v.string(),
    candidateId: v.string(),
    interviewerIds: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db.insert("interviews", {
      ...args,
    });
  },
});

export const updateInterviewStatus = mutation({
  args: {
    id: v.id("interviews"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db.patch(args.id, {
      status: args.status,
      ...(args.status === "completed" ? { endTime: Date.now() } : {}),
    });
  },
});

export const getInterviewerPerformance = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const interviews = await ctx.db.query("interviews").collect();
    const comments = await ctx.db.query("comments").collect();

    const myInterviews = interviews.filter((interview) =>
      interview.interviewerIds.includes(identity.subject)
    );

    const completedInterviews = myInterviews.filter(
      (i) =>
        (i.status === "completed" ||
          i.status === "succeeded" ||
          i.status === "failed") &&
        i.endTime
    );

    let avgInterviewTime = 45;
    if (completedInterviews.length > 0) {
      const totalTime = completedInterviews.reduce((sum, interview) => {
        return sum + (interview.endTime! - interview.startTime);
      }, 0);
      avgInterviewTime = Math.round(
        totalTime / (1000 * 60 * completedInterviews.length)
      );
    }

    const myComments = comments.filter(
      (comment) => comment.interviewerId === identity.subject
    );

    // Calculate Interview Success Rate
    const successfulInterviews = myInterviews.filter(
      (i) => i.status === "succeeded"
    ).length;
    const interviewSuccessRate =
      myInterviews.length > 0
        ? Math.round((successfulInterviews / myInterviews.length) * 100)
        : 0;

    const interviewsWithComments = myComments.map(
      (comment) => comment.interviewId
    );
    const pendingReviews = myInterviews.filter(
      (i) =>
        (i.status === "completed" ||
          i.status === "succeeded" ||
          i.status === "failed") &&
        !interviewsWithComments.includes(i._id)
    ).length;

    return {
      avgInterviewTime,
      interviewSuccessRate,
      pendingReviews,
    };
  },
});

export const getInterviewsByInterviewer = query({
  args: {
    interviewerId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const interviews = await ctx.db.query("interviews").collect();
    return interviews.filter((interview) =>
      interview.interviewerIds.includes(args.interviewerId)
    );
  },
});

export const getInterviewTips = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (user?.role === "interviewer") {
      return [
        {
          title: "Create a Welcoming Environment",
          description:
            "Start with small talk to help candidates feel comfortable",
          category: "communication",
          priority: 1,
        },
        {
          title: "Use the STAR Method",
          description: "Help candidates structure their behavioral responses",
          category: "technique",
          priority: 2,
        },
        {
          title: "Take Detailed Notes",
          description:
            "Document key points and observations during the interview",
          category: "documentation",
          priority: 3,
        },
        {
          title: "Ask Follow-up Questions",
          description: "Dig deeper into interesting responses and examples",
          category: "technique",
          priority: 4,
        },
      ];
    } else {
      return [
        {
          title: "Research the Company",
          description: "Study the company's mission, values, and recent news",
          category: "preparation",
          priority: 1,
        },
        {
          title: "Practice Common Questions",
          description: "Prepare answers for behavioral and technical questions",
          category: "preparation",
          priority: 2,
        },
        {
          title: "Test Your Setup",
          description: "Check your camera, microphone, and internet connection",
          category: "technical",
          priority: 3,
        },
        {
          title: "Prepare Questions",
          description:
            "Have thoughtful questions ready about the role and team",
          category: "preparation",
          priority: 4,
        },
      ];
    }
  },
});

export const getInterviewResources = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (user?.role === "interviewer") {
      return [
        {
          title: "Interview Question Bank",
          description: "Curated questions for different roles and skill levels",
          category: "questions",
          stats: "200+ questions",
          url: "/resources/questions",
        },
        {
          title: "Evaluation Rubrics",
          description:
            "Standardized criteria for consistent candidate assessment",
          category: "evaluation",
          stats: "15 categories",
          url: "/resources/rubrics",
        },
        {
          title: "Interview Templates",
          description: "Pre-built interview structures for different positions",
          category: "templates",
          stats: "12 templates",
          url: "/resources/templates",
        },
        {
          title: "Best Practices Guide",
          description: "Expert tips for conducting effective interviews",
          category: "guidance",
          stats: "Updated weekly",
          url: "/resources/best-practices",
        },
      ];
    } else {
      return [
        {
          title: "Interview Preparation Guide",
          description: "Comprehensive guide to ace your technical interviews",
          category: "preparation",
          url: "/resources/preparation",
        },
        {
          title: "Common Interview Questions",
          description: "Practice with frequently asked questions and answers",
          category: "practice",
          url: "/resources/questions",
        },
        {
          title: "Technical Skills Assessment",
          description: "Test your skills with practice coding challenges",
          category: "assessment",
          url: "/resources/assessment",
        },
      ];
    }
  },
});

function getTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }
}
