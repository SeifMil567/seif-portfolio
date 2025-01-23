"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { useQuery } from "@tanstack/react-query";

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

export function HeroSection() {
  const { data: about } = useQuery<AboutData>({
    queryKey: ["about"],
    queryFn: fetchAbout,
  });

  return (
    <LampContainer>
      <div className="relative flex flex-col justify-center items-center h-56 sm:px-6 md:px-8 text-center">
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0.5, y: -20 }} // Reduced from -70 to -20
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-20 sm:mt-32 text-white/80 py-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight break-words leading-tight"
        >
          {about?.name || "Loading..."}
        </motion.h1>

        {/* Title & Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-24 mt-6"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-200/80 to-slate-400 bg-clip-text text-transparent">
            {about?.title}
          </h2>

          <div className="space-y-6 sm:space-y-8">
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
