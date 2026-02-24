"use client";

import Image from "next/image";

type Props = {
  src: string;
  alt?: string;
  onClose: () => void;
};

export function AwardModal({ src, alt, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm cursor-zoom-out"
      onClick={onClose}
    >
      <div className="flex h-full w-full items-center justify-center px-6">
        <div className="relative max-h-[90vh] max-w-[90vw]">
          <Image
            src={src}
            alt={alt ?? ""}
            width={2400}
            height={1600}
            className="h-auto w-auto max-h-[90vh] max-w-[90vw] object-contain"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
}
