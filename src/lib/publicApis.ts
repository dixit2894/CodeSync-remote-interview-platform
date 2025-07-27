export interface NewsItem {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
}

export const getInterviewNews = async (): Promise<NewsItem[]> => {
  const news: NewsItem[] = [
    {
      title: "Top 5 AI Tools for Interview Preparation in 2025",
      description:
        "Discover how AI-powered platforms are transforming the way job seekers prepare for technical and behavioral interviews in India.",
      url: "https://www.analyticsinsight.net/top-10-ai-tools-for-interview-preparation-in-2025/",
      publishedAt: "2025-07-09T14:00:00Z",
      source: "Analytics Insight",
    },
    {
      title: "Indian IT Sector Sees Surge in Cloud Computing Roles",
      description:
        "Demand for cloud architects and engineers is skyrocketing across major Indian tech hubs, driven by digital transformation initiatives.",
      url: "https://economictimes.indiatimes.com/tech/information-tech/indian-it-sector-sees-surge-in-cloud-computing-roles/articleshow/101234567.cms",
      publishedAt: "2025-07-08T11:45:00Z",
      source: "Economic Times Tech",
    },
    {
      title: "Mastering Data Structures and Algorithms for FAANG Interviews",
      description:
        "An in-depth guide to excelling in DSA rounds, crucial for securing positions at top-tier product-based companies in India.",
      url: "https://www.geeksforgeeks.org/how-to-prepare-for-faang-interviews/",
      publishedAt: "2025-07-07T17:00:00Z",
      source: "GeeksForGeeks News",
    },
    {
      title: "Remote Work vs. Office Return: Impact on Indian Tech Hiring",
      description:
        "A look at how major companies are balancing remote, hybrid, and in-office models, and what it means for job applicants.",
      url: "https://www.livemint.com/companies/news/remote-work-vs-office-return-impact-on-indian-tech-hiring-11678901234567.html",
      publishedAt: "2025-07-06T09:30:00Z",
      source: "LiveMint",
    },
    {
      title: "How to Crack System Design Interviews in 2025",
      description:
        "System design rounds are evolving. Here’s what you need to know to stay ahead.",
      url: "https://www.interviewbit.com/blog/system-design-interview-questions/",
      publishedAt: "2025-07-05T10:00:00Z",
      source: "InterviewBit Blog",
    },
    {
      title: "Women in Tech: Breaking Barriers in Indian IT",
      description:
        "Celebrating the achievements and challenges of women in the Indian technology sector.",
      url: "https://yourstory.com/2024/03/women-in-tech-india-barriers-success",
      publishedAt: "2025-07-04T12:00:00Z",
      source: "YourStory",
    },
    {
      title: "The Rise of Product Management Roles in India",
      description:
        "Product management is becoming a hot career path for engineers and MBAs alike.",
      url: "https://inc42.com/resources/the-rise-of-product-management-in-india/",
      publishedAt: "2025-07-03T15:00:00Z",
      source: "Inc42",
    },
    {
      title: "Upskilling: The Key to Surviving Tech Layoffs",
      description:
        "Continuous learning is helping Indian techies stay relevant in a volatile job market.",
      url: "https://tech.economictimes.indiatimes.com/news/careers/upskilling-the-key-to-surviving-tech-layoffs/101234567",
      publishedAt: "2025-07-02T09:00:00Z",
      source: "Economic Times Tech",
    },
    {
      title: "Freshers Guide: Landing Your First Software Job in India",
      description:
        "Tips and tricks for new graduates to break into the competitive Indian IT industry.",
      url: "https://www.shiksha.com/online-courses/articles/freshers-guide-to-getting-your-first-software-job-in-india-blogId-12345",
      publishedAt: "2025-07-01T08:00:00Z",
      source: "Shiksha",
    },
    {
      title: "The Future of Remote Tech Interviews",
      description:
        "How remote interviewing is changing the hiring landscape for Indian companies.",
      url: "https://www.hackerrank.com/blog/the-future-of-remote-tech-interviews/",
      publishedAt: "2025-06-30T13:00:00Z",
      source: "HackerRank Blog",
    },
  ];
  const shuffled = news.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

export const getMotivationalQuote = async (): Promise<{
  quote: string;
  author: string;
}> => {
  const quotes = [
    {
      quote: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
    },
    {
      quote: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
    },
    {
      quote:
        "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
    },
    {
      quote:
        "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
    },
    {
      quote: "Don't watch the clock; do what it does. Keep going.",
      author: "Sam Levenson",
    },
    {
      quote: "Your time is limited, don't waste it living someone else's life.",
      author: "Steve Jobs",
    },
    {
      quote: "Opportunities don't happen, you create them.",
      author: "Chris Grosser",
    },
    { quote: "Dream big and dare to fail.", author: "Norman Vaughan" },
    {
      quote: "Hard work beats talent when talent doesn't work hard.",
      author: "Tim Notke",
    },
    {
      quote: "Don't be afraid to give up the good to go for the great.",
      author: "John D. Rockefeller",
    },
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  return randomQuote;
};

export const getTrendingTopics = async (): Promise<string[]> => {
  const fresherTrendingTopics = [
    "Entry Level Programming",
    "Campus Placement Tips",
    "Resume Building for Freshers",
    "Basic Data Structures & Algorithms",
    "Frontend Development Basics",
    "Backend Development Fundamentals",
    "Internship Opportunities",
    "First Job Interview Tips",
    "Coding Interview Preparation",
    "Professional Communication Skills",
  ];
  return fresherTrendingTopics;
};
