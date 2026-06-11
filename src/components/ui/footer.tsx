"use client";

import React from "react";
import { Mail, FileCode, Link as LinkIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchCV, fetchSocials, queryKeys, type Social } from "@/lib/sanity/queries";
import { socialIconMap } from "@/lib/social-icons";

export function Footer() {
  const { data: socials = [] } = useQuery<Social[]>({
    queryKey: queryKeys.socials,
    queryFn: fetchSocials,
  });

  const { data: cvUrl } = useQuery<string | null>({
    queryKey: queryKeys.cv,
    queryFn: fetchCV,
  });

  const mailSocial = socials.find((social) => social.icon === "mail");
  const otherSocials = socials.filter((social) => social.icon !== "mail");

  return (
    <footer id="contact" className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-200">
              Let&apos;s Connect
            </h2>
            <p className="text-slate-400 max-w-md leading-relaxed">
              Feel free to reach out for collaborations or just a friendly
              hello.
            </p>
            {mailSocial && (
              <a
                href={mailSocial.link}
                className="group inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 rounded-sm"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
                <span>{mailSocial.link.replace("mailto:", "")}</span>
                <LinkIcon
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
              </a>
            )}

            {cvUrl && (
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 rounded-sm"
              >
                <FileCode className="w-5 h-5" aria-hidden="true" />
                <span>Check Out My Resume</span>
                <LinkIcon
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
              </a>
            )}
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-4">
            {otherSocials.map((social) => {
              const Icon = socialIconMap[social.icon];
              return (
                <a
                  key={social._id}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800/80 text-slate-200 hover:bg-slate-700 transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600"
                >
                  {Icon && <Icon className="w-5 h-5" aria-hidden="true" />}
                  <span className="font-medium capitalize">{social.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
