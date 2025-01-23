"use client";
import React from "react";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon,
  FacebookIcon,
  GlobeIcon,
  TwitchIcon,
  FileCodeIcon,
  CodepenIcon,
  GitlabIcon,
  MessagesSquareIcon,
  NewspaperIcon,
  PaintbrushIcon,
  PaletteIcon,
  HashIcon,
  BookOpenIcon,
  RssIcon,
  ShareIcon,
  LinkIcon,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Social {
  icon: string;
  link: string;
  name: string;
  _id: string;
}

const iconMap = {
  github: GithubIcon,
  gitlab: GitlabIcon,
  codepen: CodepenIcon,
  stackoverflow: HashIcon,
  linkedin: LinkedinIcon,
  portfolio: FileCodeIcon,
  website: GlobeIcon,
  blog: NewspaperIcon,
  mail: MailIcon,
  discord: MessagesSquareIcon,
  rss: RssIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  facebook: FacebookIcon,
  twitch: TwitchIcon,
  behance: PaintbrushIcon,
  dribbble: PaletteIcon,
  medium: BookOpenIcon,
  link: LinkIcon,
  share: ShareIcon,
};

async function fetchSocials() {
  const response = await fetch(
    "https://kyu37vb9.api.sanity.io/v2025-01-20/data/query/production?query=*%5B_type+%3D%3D+%22social%22%5D"
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

export function Footer() {
  const { data: socials = [] } = useQuery<Social[]>({
    queryKey: ["socials"],
    queryFn: fetchSocials,
  });

  const { data: cvUrl } = useQuery<string | null>({
    queryKey: ["cv"],
    queryFn: fetchCV,
  });

  const mailSocial = socials.find((social) => social.icon === "mail");
  const otherSocials = socials.filter((social) => social.icon !== "mail");

  return (
    <footer className="mt-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-200">
              Let&apos;s Connect
            </h3>
            <p className="text-slate-400 max-w-md">
              Feel free to reach out for collaborations or just a friendly
              hello.
            </p>
            {mailSocial && (
              <a
                href={mailSocial.link}
                className="group inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
              >
                <MailIcon className="w-5 h-5" />
                <span>{mailSocial.link.replace("mailto:", "")}</span>
                <LinkIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )}

            {/* CV Open in New Tab */}
            {cvUrl && (
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
              >
                <FileCodeIcon className="w-5 h-5" />
                <span>Check Out My Resume</span>
                <LinkIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )}
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-6">
            {otherSocials.map((social) => {
              const Icon = iconMap[social.icon as keyof typeof iconMap];
              return (
                <a
                  key={social._id}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-wrap items-center gap-2 px-6 py-3 rounded-full bg-slate-800/80 text-slate-200 hover:bg-slate-700 transition-all duration-300 hover:scale-105"
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  <span className="font-medium capitalize">{social.name}</span>
                  <LinkIcon className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
