"use client";
import React from "react";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Instagram,
  Youtube,
  Facebook,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Social {
  icon: string;
  link: string;
  name: string;
  _id: string;
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
};

async function fetchSocials() {
  const response = await fetch(
    "https://kyu37vb9.api.sanity.io/v2025-01-20/data/query/production?query=*%5B_type+%3D%3D+%22social%22%5D"
  );
  const { result } = await response.json();
  return result;
}

export function Navigation() {
  const { data: socials = [] } = useQuery<Social[]>({
    queryKey: ["socials"],
    queryFn: fetchSocials,
  });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/50 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <span className="text-slate-200 font-medium">SM</span>
          </div>
          <div className="flex items-center gap-4">
            {socials.map((social) => {
              const Icon = iconMap[social.icon as keyof typeof iconMap];
              return (
                <a
                  key={social._id}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-slate-200 transition-colors"
                  aria-label={social.name}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
