import { Skeleton } from "@/components/ui/skeleton";

export const SocialButtonsSkeleton = () => {
  return (
    <div className="flex gap-x-6">
      <Skeleton className="w-[107px] h-[44px] rounded-md" />
      <Skeleton className="w-[107px] h-[44px] rounded-md" />
    </div>
  );
};
