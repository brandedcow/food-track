import { BuiltInProviderType } from "next-auth/providers";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface SocialButtonProps {
  provider: BuiltInProviderType;
  onClick: (provider: BuiltInProviderType) => void;
  disabled?: boolean;
  loading?: boolean;
}

export const SocialButton = ({
  provider,
  onClick,
  disabled,
  loading,
}: SocialButtonProps) => {
  return (
    <Button size="lg" onClick={() => onClick(provider)} disabled={disabled}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {provider}
    </Button>
  );
};
