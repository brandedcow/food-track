import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function SidebarSkeleton() {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-2 gap-x-2",
        "laptop:flex-col laptop:justify-start laptop:gap-y-4"
      )}
    >
      <Skeleton
        className={cn(
          "hidden m-3 w-[252px] h-[281.195px] rounded-md",
          "laptop:block"
        )}
      />
      <Skeleton className="px-32 flex w-full h-[44px] rounded-md" />
      <Skeleton className="px-32 flex w-full h-[44px] rounded-md" />
      <Skeleton className="px-32 flex w-full h-[44px] rounded-md" />
    </div>
  );
}
