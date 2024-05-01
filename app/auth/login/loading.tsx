import { SocialButtonsSkeleton } from "@/components/auth/skeletons/social-buttons-skeletons";

export default function LoadingLoginPage() {
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-y-10">
      <div className="text-xl font-bold">Food Track</div>
      <SocialButtonsSkeleton />
    </div>
  );
}
