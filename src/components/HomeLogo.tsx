"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  className?: string;
};

export function HomeLogo({ className }: Props) {
  const [src, setSrc] = useState<string>("/logo-home.jpg");

  return (
    <Image
      src={src}
      alt="Arivu Homes"
      width={32}
      height={32}
      className={className}
      priority
      onError={() => setSrc("/logo-simple.svg")}
    />
  );
}

