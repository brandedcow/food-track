import { PropsWithChildren } from "react";

interface ModalProps {
  isOpen?: boolean;
}

export const Modal = ({
  isOpen = false,
  children,
}: PropsWithChildren<ModalProps>) => {
  return (
    <div className="absolute h-full w-full flex items-center justify-center p-24 bg-transparent">
      {children}
    </div>
  );
};
