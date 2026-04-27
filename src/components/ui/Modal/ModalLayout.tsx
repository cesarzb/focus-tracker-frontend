"use client";

import { X } from "lucide-react";

interface ModalLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ModalLayout = ({
  isOpen,
  onClose,
  title,
  children,
}: ModalLayoutProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md rounded-2xl border border-stone-800 bg-stone-900 p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-stone-50">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-stone-400 transition-colors hover:bg-stone-800 hover:text-stone-200"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
