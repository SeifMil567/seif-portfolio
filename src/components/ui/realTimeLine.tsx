"use client";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface ExperienceItem {
  position: string;
  details: string;
  tech: string;
  name: string;
  start: string;
  end?: string;
  link: string;
}

async function fetchExperience() {
  const response = await fetch(
    "https://kyu37vb9.api.sanity.io/v2025-01-20/data/query/production?query=*%5B_type+%3D%3D+%22experience%22%5D"
  );
  const { result } = await response.json();
  return result;
}

export function TimelineDemo() {
  const {
    data: experiences,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["experiences"],
    queryFn: fetchExperience,
    select: (data: ExperienceItem[]) =>
      data.map((item) => ({
        title: `${item.start}${item.end ? ` - ${item.end}` : ""}`,
        content: (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-neutral-200 dark:text-neutral-200">
                {item.position}
              </h3>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-semibold text-blue-500 hover:text-blue-600"
              >
                {item.name}
                <ExternalLink size={14} />
              </a>
            </div>

            <p className="text-neutral-400 dark:text-neutral-200 text-lg">
              {item.details}
            </p>

            <div className="flex flex-wrap gap-2">
              {item.tech.split(",").map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs rounded-full bg-slate-700 text-slate-200 hover:bg-slate-700 transition-colors"
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
    return (
      <div className="w-full text-center text-neutral-600 dark:text-neutral-400">
        Loading experience timeline...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center text-red-600 dark:text-red-400">
        Error loading experience timeline. Please try again later.
      </div>
    );
  }

  return (
    <div className="w-full">
      <Timeline data={experiences || []} />
    </div>
  );
}
