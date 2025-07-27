"use client";
import ActionCard from "@/components/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/useUserRole";
import { useDynamicData } from "@/hooks/useDynamicData";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import MeetingModal from "@/components/MeetingModal";
import LoaderUI from "@/components/LoaderUI";
import {
  Loader2Icon,
  BookOpen,
  MessageCircle,
  Calendar,
  Clock,
  CheckCircle,
  Target,
  Users,
  TrendingUp,
  Award,
  FileText,
  Video,
  Star,
  BarChart3,
  UserCheck,
  Brain,
  Lightbulb,
  ClipboardList,
  Timer,
  AlertCircle,
  PlusCircle,
  Search,
  Newspaper,
  Quote,
  Zap,
  Info,
  AlertTriangle,
} from "lucide-react";
import MeetingCard from "@/components/MeetingCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();
  const { isInterviewer, isLoading: isUserLoading } = useUserRole();

  // Dynamic data from backend and public APIs
  const {
    interviewerStats,
    candidateStats,
    recentActivity,
    performance,
    interviewTips,
    interviewResources,
    newsData,
    motivationalQuote,
    trendingTopics,
    derivedStats,
    isLoading,
  } = useDynamicData();

  // Interview data
  const candidateInterviews = useQuery(api.interviews.getMyInterviews);
  const interviewerInterviews = useQuery(
    api.interviews.getInterviewerInterviews
  );
  const interviews = isInterviewer
    ? interviewerInterviews
    : candidateInterviews;

  if (isUserLoading || isLoading) return <LoaderUI />;

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      default:
        router.push(`/${title.toLowerCase()}`);
    }
  };

  // Dynamic stats for candidates
  const quickStats = [
    {
      label: "Total Interviews",
      value: candidateStats?.totalInterviews || 0,
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      label: "Completed",
      value: candidateStats?.completedInterviews || 0,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      label: "Upcoming",
      value: candidateStats?.upcomingInterviews || 0,
      icon: Clock,
      color: "text-orange-600",
    },
  ];

  // Dynamic stats for interviewers
  const dynamicInterviewerStats = [
    {
      label: "Total Interviews",
      value: interviewerStats?.totalInterviews || 0,
      icon: Calendar,
      color: "text-blue-600",
      change: `+${interviewerStats?.thisWeekInterviews || 0} this week`,
    },
    {
      label: "Candidates Evaluated",
      value: interviewerStats?.candidatesEvaluated || 0,
      icon: UserCheck,
      color: "text-green-600",
      change: `+${interviewerStats?.thisWeekCompleted || 0} this week`,
    },
    {
      label: "Pending Reviews",
      value: interviewerStats?.pendingReviews || 0,
      icon: Clock,
      color: "text-orange-600",
      change: "Review needed",
    },
    {
      label: "Avg Rating Given",
      value: `${interviewerStats?.avgRating || "0.0"}/5`,
      icon: Star,
      color: "text-yellow-600",
      change: interviewerStats?.monthlyRatingChange
        ? `${interviewerStats.monthlyRatingChange >= 0 ? "+" : ""}${interviewerStats.monthlyRatingChange.toFixed(1)} this month`
        : "No change this month",
    },
  ];

  // Dynamic recent activity
  const getActivityIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "succeeded":
        return CheckCircle;
      case "upcoming":
        return Calendar;
      case "failed":
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case "completed":
      case "succeeded":
        return "text-green-600";
      case "upcoming":
        return "text-orange-600";
      case "failed":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="container max-w-7xl mx-auto p-6">
      <div className="rounded-lg bg-card p-6 border shadow-sm mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
          Welcome back!
        </h1>
        <p className="text-muted-foreground mt-2">
          {isInterviewer
            ? "Manage your interviews and review candidates effectively"
            : "Access your upcoming interviews and preparations"}
        </p>
        {motivationalQuote && (
          <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg border">
            <div className="flex items-start gap-3">
              <Quote className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <p className="text-sm italic">"{motivationalQuote.quote}"</p>
                <p className="text-xs text-muted-foreground mt-1">
                  — {motivationalQuote.author}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {isInterviewer ? (
        <>
          {/* Enhanced Stats for Interviewers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dynamicInterviewerStats.map((stat, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {QUICK_ACTIONS.map((action) => (
              <ActionCard
                key={action.title}
                action={action}
                onClick={() => handleQuickAction(action.title)}
              />
            ))}
          </div>

          {/* Recent Activity */}
          <div className="mb-8">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Recent Activity</h2>
            </div>
            <div className="bg-card rounded-lg border shadow-sm">
              {recentActivity && recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => {
                  const ActivityIcon = getActivityIcon(activity.status);
                  const activityColor = getActivityColor(activity.status);

                  return (
                    <div
                      key={index}
                      className={`p-4 flex items-center gap-3 ${
                        index !== recentActivity.length - 1 ? "border-b" : ""
                      }`}
                    >
                      <ActivityIcon className={`h-5 w-5 ${activityColor}`} />
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          activity.status === "completed" ||
                          activity.status === "succeeded"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : activity.status === "upcoming"
                              ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                              : activity.status === "failed"
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No recent activity
                </div>
              )}
            </div>
          </div>

          {/* Interviews Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">Your Interviews</h2>
                <p className="text-muted-foreground">
                  Manage and conduct your scheduled interviews
                </p>
              </div>
              <button
                onClick={() => {
                  setModalType("start");
                  setShowModal(true);
                }}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                Schedule Interview
              </button>
            </div>

            {interviews === undefined ? (
              <div className="flex justify-center py-12">
                <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : interviews.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {interviews.map((interview) => (
                  <MeetingCard key={interview._id} interview={interview} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-lg border">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No Interviews Scheduled
                </h3>
                <p className="text-muted-foreground mb-6">
                  Get started by scheduling your first interview or managing
                  existing ones.
                </p>
                <button
                  onClick={() => {
                    setModalType("start");
                    setShowModal(true);
                  }}
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Schedule Interview
                </button>
              </div>
            )}
          </div>

          {/* Interviewing Tips */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">
                Interviewing Best Practices
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {interviewTips?.map((tip, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg p-4 border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {tip.category}
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-2">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Insights */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-lg p-6 border mb-8">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="h-8 w-8 text-emerald-600" />
              <div>
                <h3 className="text-xl font-bold">Interview Performance</h3>
                <p className="text-muted-foreground">
                  Your interviewing insights and metrics this month
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Timer className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">Avg Interview Time</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {performance?.avgInterviewTime || 45} min
                </p>
                <p className="text-sm text-muted-foreground">
                  Average time spent per interview
                </p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-semibold">Interview Success Rate</span>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {performance?.interviewSuccessRate || 0}%
                </p>
                <p className="text-sm text-muted-foreground">
                  succeeded interviews vs total
                </p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <span className="font-semibold">Reviews Pending</span>
                </div>
                <p className="text-2xl font-bold text-orange-600">
                  {performance?.pendingReviews || 0}
                </p>
                <p className="text-sm text-muted-foreground">
                  Complete by end of week
                </p>
              </div>
            </div>
          </div>

          {/* Achievement Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <Award className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="text-xl font-bold">
                  Excellence in Interviewing
                </h3>
                <p className="text-muted-foreground">
                  Your impact on candidate experience and hiring quality
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-sm">
                🏆 Top Interviewer
              </span>
              <span className="bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 px-3 py-1 rounded-full text-sm">
                ⭐ 5-Star Reviews
              </span>
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                📊 Data-Driven
              </span>
              <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm">
                🎯 Quality Focused
              </span>
            </div>
          </div>

          <MeetingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={
              modalType === "join" ? "Join Interview" : "Start New Interview"
            }
            isJoinMeeting={modalType === "join"}
          />
        </>
      ) : (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {quickStats.map((stat, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 border shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Interviews Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Your Interviews</h2>
            <p className="text-muted-foreground">
              View and join your scheduled interviews
            </p>
          </div>

          <div className="mb-8">
            {interviews === undefined ? (
              <div className="flex justify-center py-12">
                <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : interviews.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {interviews.map((interview) => (
                  <MeetingCard key={interview._id} interview={interview} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-lg border">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No Scheduled Interviews
                </h3>
                <p className="text-muted-foreground">
                  You don't have any interviews scheduled at the moment. Use
                  this time to prepare!
                </p>
              </div>
            )}
          </div>

          {/* Interview Preparation Tips */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Interview Preparation Tips</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {interviewTips?.map((tip, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg p-4 border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {tip.category}
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-2">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Latest News */}
          {newsData.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Newspaper className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Latest News</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {newsData.slice(0, 3).map((news, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <CardHeader>
                      <CardTitle className="text-base line-clamp-2">
                        {news.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{news.source}</span>
                        <span>•</span>
                        <span>
                          {new Date(news.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {news.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Trending Topics */}
          {trendingTopics.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Trending Topics</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingTopics.map((topic, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Achievement Section */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <Award className="h-8 w-8 text-emerald-600" />
              <div>
                <h3 className="text-xl font-bold">Keep Growing!</h3>
                <p className="text-muted-foreground">
                  Every interview is a learning opportunity. Stay prepared and
                  confident.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-emerald-100 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full text-sm">
                📚 Continuous Learning
              </span>
              <span className="bg-teal-100 dark:bg-teal-950/30 text-teal-800 dark:text-teal-300 px-3 py-1 rounded-full text-sm">
                🎯 Goal Oriented
              </span>
              <span className="bg-blue-100 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                💪 Confidence Builder
              </span>
              <span className="bg-green-100 dark:bg-green-950/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm">
                🌟 Success Mindset
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
