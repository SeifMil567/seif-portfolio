"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { useQuery } from "@tanstack/react-query";
import { LinkIcon } from "lucide-react";
import {
  fetchAbout,
  fetchCV,
  queryKeys,
  type AboutData,
} from "@/lib/sanity/queries";
import { HeroSkeleton } from "@/components/ui/skeleton";

function HeroContent({ about, cvUrl }: { about: AboutData; cvUrl: string | null | undefined }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <motion.h1
        initial={prefersReducedMotion ? false : { opacity: 0.5, y: -20 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="text-white/80 py-2 sm:py-4 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight break-words leading-tight"
      >
        {about.name}
      </motion.h1>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-6 sm:space-y-10"
      >
        {about.title && (
          <p className="text-2xl mb-6 sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-200/80 to-slate-400 bg-clip-text text-transparent">
            {about.title}
          </p>
        )}

        {cvUrl && (
          <motion.a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
            className="relative inline-flex overflow-hidden rounded-lg text-lg font-medium text-white transition-all duration-300 bg-gradient-to-r from-cyan-700 to-blue-800 shadow-lg hover:from-cyan-700 hover:to-blue-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 max-w-xs sm:max-w-sm"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 px-6 py-3">
              <LinkIcon className="h-5 w-5" aria-hidden="true" />
              Check Out My Resume
            </span>
            <div className="absolute inset-0 z-0 scale-150 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-800/20 to-transparent opacity-50" />
            {!prefersReducedMotion && (
              <div className="absolute inset-0 z-10 overflow-hidden rounded-lg">
                <div className="absolute -left-full top-0 h-full w-[150%] bg-gradient-to-r from-transparent via-black/40 to-transparent opacity-10 animate-shimmer" />
              </div>
            )}
          </motion.a>
        )}

        <div className="space-y-6">
          {about.brief && (
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {about.brief}
            </p>
          )}
          {about.details && (
            <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-400/90 leading-relaxed">
              {about.details}
            </p>
          )}
        </div>
      </motion.div>
    </>
  );
}

export function HeroSection() {
  const { data: about, isLoading: aboutLoading } = useQuery<AboutData | null>({
    queryKey: queryKeys.about,
    queryFn: fetchAbout,
  });

  const { data: cvUrl } = useQuery<string | null>({
    queryKey: queryKeys.cv,
    queryFn: fetchCV,
  });

  return (
    <LampContainer>
      <div className="relative flex flex-col items-center w-full text-center">
        {aboutLoading || !about ? (
          <HeroSkeleton />
        ) : (
          <HeroContent about={about} cvUrl={cvUrl} />
        )}
      </div>
    </LampContainer>
  );
}
