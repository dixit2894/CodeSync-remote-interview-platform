"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import {
  ArrowRight,
  Users,
  Video,
  Shield,
  Zap,
  Star,
  CheckCircle,
  Calendar,
  BarChart3,
  Clock,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import VideoPlayer from "./VideoPlayer";
import { useIsClient } from "@/hooks/useIsClient";

const LandingPage = () => {
  const isClient = useIsClient();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      icon: <Video className="w-6 h-6" />,
      title: "HD Video Interviews",
      description:
        "Crystal clear video quality with real-time collaboration tools and screen sharing capabilities",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Smart Scheduling",
      description:
        "Automated scheduling with calendar integration and timezone detection for global teams",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics & Insights",
      description:
        "Comprehensive interview analytics and candidate evaluation tools with detailed reports",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description:
        "Multiple interviewers can join seamlessly with real-time note sharing and feedback",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description:
        "Quick setup, instant connections, zero delays with optimized performance",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Head of Talent",
      company: "TechCorp",
      content:
        "CodeSync transformed our hiring process. We reduced time-to-hire by 40% and improved candidate satisfaction scores significantly.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Engineering Manager",
      company: "StartupXYZ",
      content:
        "The most intuitive interview platform we've used. The video quality is exceptional and the collaboration features are game-changing.",
      rating: 4,
    },
    {
      name: "Emily Rodriguez",
      role: "Talent Acquisition Lead",
      company: "GlobalTech",
      content:
        "Candidates love the smooth experience. Our offer acceptance rate increased by 25% since switching to CodeSync.",
      rating: 4,
    },
  ];

  const stats = [
    {
      number: "50k+",
      label: "Interviews Conducted",
      icon: <Video className="w-5 h-5" />,
    },
    {
      number: "99.9%",
      label: "Uptime Guarantee",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      number: "1000+",
      label: "Companies Trust Us",
      icon: <Users className="w-5 h-5" />,
    },
    {
      number: "40%",
      label: "Faster Hiring",
      icon: <Clock className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x / 20,
            top: mousePosition.y / 20,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200/30 dark:bg-emerald-800/30 rounded-full animate-bounce delay-1000" />
        <div className="absolute top-40 right-10 w-32 h-32 bg-teal-200/20 dark:bg-teal-800/20 rounded-full animate-pulse delay-500" />
        <div className="absolute bottom-20 left-20 w-16 h-16 bg-emerald-300/25 dark:bg-emerald-700/25 rounded-full animate-bounce delay-2000" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-4 sm:px-6 lg:px-8 py-6 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-emerald-100 dark:border-emerald-800">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Users className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              CodeSync
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <SignInButton mode="modal">
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-xl hover:from-emerald-700 hover:to-teal-600 font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-32 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
            {/* Left: Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="inline-flex items-center px-6 py-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-full text-emerald-700 dark:text-emerald-300 font-medium mb-8 animate-pulse">
                <Zap className="w-4 h-4 mr-2" />
                Now with an integrated code editor.
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
                <span className="block text-gray-900 dark:text-white animate-fade-in">
                  Revolutionize Your
                </span>
                <span className="block bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent animate-fade-in delay-200">
                  Interview Process
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in delay-300">
                Transform how you hire with our cutting-edge interview platform.
                Connect with top talent through seamless video interviews,
                collaborative tools, and intelligent insights that matter.
              </p>
              <div className="mb-16"></div>
            </div>
            {/* Right: Illustration */}
            <div className="w-full lg:w-1/2 flex justify-center items-center mb-12 lg:mb-0">
              <VideoPlayer
                src="/interviewillustration.mp4"
                className="max-w-xs sm:max-w-md lg:max-w-lg w-full h-auto drop-shadow-xl rounded-xl"
                ariaLabel="Animated interview illustration"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose CodeSync?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with intuitive
              design to deliver the best interview experience for both
              recruiters and candidates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what our customers are saying about CodeSync
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
              >
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-300"
                      style={{ animationDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-lg mr-4">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 to-teal-500 relative z-10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of companies already using CodeSync to find and hire
            the best talent faster than ever before.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <SignUpButton mode="modal">
              <button className="px-8 py-4 bg-white text-emerald-600 rounded-xl hover:bg-gray-50 font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                Start Your Free Trial
              </button>
            </SignUpButton>

            <SignInButton mode="modal">
              <button className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-emerald-600 font-semibold text-lg transition-all duration-300 hover:scale-105">
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-500 rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold">CodeSync</span>
          </div>

          <div className="text-center text-gray-400">
            <p>&copy; 2025 CodeSync. All rights reserved.</p>
            <p className="mt-2">
              Revolutionizing interviews, one connection at a time.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
