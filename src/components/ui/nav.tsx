"use client";

import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { fetchSocials, queryKeys, type Social } from "@/lib/sanity/queries";
import { socialIconMap } from "@/lib/social-icons";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export function Navigation() {
  const { data: socials = [] } = useQuery<Social[]>({
    queryKey: queryKeys.socials,
    queryFn: fetchSocials,
  });

  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header>
      <nav
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50 bg-slate-900/70 backdrop-blur-md border-b border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <button
              onClick={() => handleNavClick("home")}
              className="text-slate-200 font-semibold tracking-wide hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 rounded-sm"
            >
              SM
            </button>

            <div className="hidden md:flex items-center gap-1">
              {SECTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600",
                    activeSection === id
                      ? "text-cyan-400"
                      : "text-slate-400 hover:text-slate-200"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-3">
                {socials.map((social) => {
                  const Icon = socialIconMap[social.icon];
                  return (
                    <a
                      key={social._id}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 rounded-sm"
                      aria-label={social.name}
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                    </a>
                  );
                })}
              </div>

              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="md:hidden p-2 text-slate-400 hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 rounded-md"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-900/95 backdrop-blur-md">
            <div className="px-4 py-3 space-y-1">
              {SECTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className={cn(
                    "block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    activeSection === id
                      ? "text-cyan-400 bg-slate-800/50"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            {socials.length > 0 && (
              <div className="px-4 pb-4 pt-2 border-t border-slate-800/60 flex flex-wrap gap-3">
                {socials.map((social) => {
                  const Icon = socialIconMap[social.icon];
                  return (
                    <a
                      key={social._id}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600"
                      aria-label={social.name}
                    >
                      {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
                      <span className="capitalize">{social.name}</span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
