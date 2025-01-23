"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { useQuery } from "@tanstack/react-query";
import { LinkIcon } from "lucide-react";

interface AboutData {
  name: string;
  title: string;
  brief: string;
  details: string;
}

async function fetchAbout() {
  const response = await fetch(
    "https://kyu37vb9.api.sanity.io/v2025-01-20/data/query/production?query=*%5B_type+%3D%3D+%22about%22%5D%5B0%5D"
  );
  const { result } = await response.json();
  return result;
}

async function fetchCV() {
  const response = await fetch(
    "https://kyu37vb9.api.sanity.io/v2025-01-20/data/query/production?query=*%5B_type+%3D%3D+%22resume%22%5D{ 'cvUrl': cv.asset->url }"
  );
  const { result } = await response.json();
  return result.length > 0 ? result[0].cvUrl : null;
}

export function HeroSection() {
  const { data: about } = useQuery<AboutData>({
    queryKey: ["about"],
    queryFn: fetchAbout,
  });

  const { data: cvUrl } = useQuery<string | null>({
    queryKey: ["cv"],
    queryFn: fetchCV,
  });

  return (
    <LampContainer>
      <div className="relative flex flex-col items-center sm:px-6 md:px-8 text-center">
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0.5, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-white/80 py-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight break-words leading-tight"
        >
          {about?.name || "Loading..."}
        </motion.h1>

        {/* Title & Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-12" // Reduced space between children
        >
          <h2 className="text-2xl mb-6 sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-200/80 to-slate-400 bg-clip-text text-transparent">
            {about?.title}
          </h2>

          {/* CV Button */}
          {cvUrl && (
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden rounded-lg text-lg font-medium text-white transition-all duration-300 bg-gradient-to-r from-cyan-700 to-blue-800 shadow-lg hover:from-cyan-700 hover:to-blue-950 focus:outline-none focus:ring-2 focus:ring-cyan-800 focus:ring-offset-2 w-full max-w-xs sm:max-w-sm"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 px-3 py-2">
                  <LinkIcon className="h-5 w-5" />
                  Check Out My Resume
                </span>
                {/* Radial background shimmer effect */}
                <div className="absolute inset-0 z-0 scale-150 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-800/20 to-transparent opacity-50 transition-all duration-500"></div>
                {/* Continuous shimmer effect */}
                <div className="absolute inset-0 z-10 overflow-hidden rounded-lg">
                  <div className="absolute -left-full top-0 h-full w-[150%] bg-gradient-to-r from-transparent via-black/40 to-transparent opacity-10 animate-shimmer"></div>
                </div>
              </motion.button>
            </a>
          )}

          {/* Description */}
          <div className="space-y-6 sm:space-y-6">
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {about?.brief}
            </p>
            <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-400/90 leading-relaxed">
              {about?.details}
            </p>
          </div>
        </motion.div>
      </div>
    </LampContainer>
  );
}
