"use client";

import {ReactNode} from "react";
import {cn} from "@/lib/cn";

interface IconAndTextProps {
  icon: ReactNode;
  text: ReactNode;
  className?: string;
}

export function IconAndText({icon, text, className}: IconAndTextProps) {
  return (
      <span className={cn(`flex items-center gap-2`, className)}>
      <span className="h-5 w-5 flex items-center justify-center">
        {icon}
      </span>
      <span>{text}</span>
    </span>
  );
}
