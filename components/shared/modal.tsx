import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

interface ModalProps {
  isOpen?: boolean;
}

export const Modal = ({
  isOpen = false,
  children,
}: PropsWithChildren<ModalProps>) => {
  const [open, setOpen] = useState(isOpen);
  const pathname = usePathname();
  const router = useRouter();

  const handleCloseModal = () => {
    setOpen(false);
    router.replace(pathname);
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return open ? (
    <div
      className="absolute h-full w-full flex items-center justify-center p-24 bg-black bg-opacity-50"
      // onClick={handleCloseModal}
    >
      {children}
    </div>
  ) : null;
};
