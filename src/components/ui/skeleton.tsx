import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-slate-800/80",
        className
      )}
    />
  );
}

export function HeroSkeleton() {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-3xl mx-auto">
      <Skeleton className="h-14 sm:h-16 md:h-20 w-3/4" />
      <Skeleton className="h-8 sm:h-10 w-1/2" />
      <Skeleton className="h-12 w-48 rounded-lg" />
      <Skeleton className="h-6 w-full max-w-xl" />
      <Skeleton className="h-6 w-full max-w-2xl" />
      <Skeleton className="h-20 w-full max-w-3xl" />
    </div>
  );
}

export function SkillsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton key={i} className="h-28 rounded-2xl" />
      ))}
    </div>
  );
}

export function TimelineSkeleton() {
  return (
    <div className="space-y-12 max-w-3xl mx-auto">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-4 pl-20">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-24 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
      {Array.from({ length: 2 }).map((_, i) => (
        <Skeleton key={i} className="h-96 rounded-xl" />
      ))}
    </div>
  );
}
