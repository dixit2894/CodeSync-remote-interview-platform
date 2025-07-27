"use client";

import { useEffect, useState } from "react";

interface VideoPlayerProps {
  src: string;
  className?: string;
  ariaLabel?: string;
}

const VideoPlayer = ({ src, className, ariaLabel }: VideoPlayerProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder during server-side rendering
    return (
      <div
        className={`${className} bg-gray-200 dark:bg-gray-800 animate-pulse flex items-center justify-center`}
        aria-label="Loading video..."
      >
        <div className="text-gray-400 text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className={className}
      aria-label={ariaLabel}
    />
  );
};

export default VideoPlayer;
