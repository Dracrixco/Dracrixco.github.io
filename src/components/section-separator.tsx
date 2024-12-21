import React from "react";

interface SectionSeparatorProps {
  children: React.ReactNode;
}

export const SectionSeparator = ({ children }: SectionSeparatorProps) => {
  return (
    <div className="mt-2 border rounded-sm p-2 mx-10 min-w-96">{children}</div>
  );
};
