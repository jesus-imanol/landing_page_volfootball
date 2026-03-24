"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function PortalCard({ children, className = "", onClick }: Props) {
  return (
    <div
      className={`bg-neo-card border border-neo-border rounded-xl p-5 ${onClick ? "cursor-pointer hover:border-neo-accent/40 transition-colors" : ""} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
