import React from "react";
import { cn } from "@/lib/utils";

interface SectionSeparatorProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionSeparator = ({
  children,
  className,
}: SectionSeparatorProps) => {
  return (
    <div
      className={cn(["mt-2 border rounded-sm p-2 mx-10 min-w-96", className])}
    >
      {children}
    </div>
  );
};
