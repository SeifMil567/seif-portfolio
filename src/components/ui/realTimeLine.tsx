"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchExperiences,
  queryKeys,
  sortExperiencesByStartDate,
  type ExperienceItem,
} from "@/lib/sanity/queries";
import { TimelineSkeleton } from "@/components/ui/skeleton";

export function TimelineDemo() {
  const {
    data: experiences,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.experiences,
    queryFn: fetchExperiences,
    select: (data: ExperienceItem[]) =>
      sortExperiencesByStartDate(data).map((item) => ({
        id: item._id,
        title: `${item.start}${item.end ? ` - ${item.end}` : ""}`,
        content: (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="text-xl font-bold text-neutral-200">
                {item.position}
              </h3>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 rounded-sm"
              >
                {item.name}
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>

            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
              {item.details}
            </p>

            <div className="flex flex-wrap gap-2">
              {item.tech.split(",").map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs rounded-full bg-slate-700 text-slate-200"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
        ),
      })),
  });

  if (isLoading) {
    return <TimelineSkeleton />;
  }

  if (error) {
    return (
      <p
        role="alert"
        className="w-full text-center text-red-400 py-8"
      >
        Error loading experience timeline. Please try again later.
      </p>
    );
  }

  return (
    <div className="w-full">
      <Timeline data={experiences || []} />
    </div>
  );
}
