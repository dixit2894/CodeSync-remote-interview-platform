import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState, useEffect } from "react";
import {
  getInterviewNews,
  getMotivationalQuote,
  getTrendingTopics,
  type NewsItem,
} from "@/lib/publicApis";

export const useDynamicData = () => {
  // Backend data
  const interviewerStats = useQuery(api.interviews.getInterviewerStats);
  const candidateStats = useQuery(api.interviews.getCandidateStats);
  const recentActivity = useQuery(api.interviews.getRecentActivity);
  const performance = useQuery(api.interviews.getInterviewerPerformance);
  const interviewTips = useQuery(api.interviews.getInterviewTips);
  const interviewResources = useQuery(api.interviews.getInterviewResources);

  // Public API data
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [motivationalQuote, setMotivationalQuote] = useState<{
    quote: string;
    author: string;
  } | null>(null);
  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);
  const [isLoadingPublicData, setIsLoadingPublicData] = useState(true);

  // Fetch public API data
  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const [news, quote, topics] = await Promise.all([
          getInterviewNews(),
          getMotivationalQuote(),
          getTrendingTopics(),
        ]);

        setNewsData(news);
        setMotivationalQuote(quote);
        setTrendingTopics(topics);
      } catch (error) {
        console.error("Error fetching public data:", error);
      } finally {
        setIsLoadingPublicData(false);
      }
    };

    fetchPublicData();
  }, []);

  // Calculate derived statistics
  const getDerivedStats = () => {
    if (!interviewerStats) return null;

    const totalInterviews = interviewerStats.totalInterviews;
    const completedInterviews = interviewerStats.completedInterviews;
    const candidatesEvaluated =
      interviewerStats.candidatesEvaluated ||
      interviewerStats.completedInterviews;
    const successRate =
      totalInterviews > 0 ? (candidatesEvaluated / totalInterviews) * 100 : 0;

    return {
      successRate: Math.round(successRate),
      efficiencyScore: Math.round(
        parseFloat(interviewerStats.avgRating) * 20 + successRate * 0.5
      ),
      weeklyGrowth:
        interviewerStats.thisWeekInterviews > 0
          ? "+" + interviewerStats.thisWeekInterviews
          : "0",
    };
  };

  return {
    // Backend data
    interviewerStats,
    candidateStats,
    recentActivity,
    performance,
    interviewTips,
    interviewResources,

    // Public API data
    newsData,
    motivationalQuote,
    trendingTopics,
    isLoadingPublicData,

    // Derived data
    derivedStats: getDerivedStats(),

    // Loading states
    isLoading: !interviewerStats || !candidateStats || isLoadingPublicData,
  };
};
