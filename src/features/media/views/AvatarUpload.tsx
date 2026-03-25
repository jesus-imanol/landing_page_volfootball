"use client";

import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import Spinner from "@/core/components/Spinner";

interface Props {
  currentUrl?: string | null;
  initials: string;
  isUploading: boolean;
  onFileSelected: (file: File) => void;
  size?: number;
}

export default function AvatarUpload({
  currentUrl,
  initials,
  isUploading,
  onFileSelected,
  size = 72,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onFileSelected(file);
  };

  const displayUrl = preview || currentUrl;

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="relative rounded-full overflow-hidden border-2 border-neo-accent focus:outline-none"
        style={{ width: size, height: size }}
        disabled={isUploading}
      >
        {isUploading ? (
          <div className="w-full h-full bg-neo-accent/15 flex items-center justify-center">
            <Spinner size={size / 3} />
          </div>
        ) : displayUrl ? (
          <img
            src={displayUrl}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-neo-accent/15 flex items-center justify-center">
            <span
              className="text-neo-accent font-bold"
              style={{ fontSize: size / 3 }}
            >
              {initials}
            </span>
          </div>
        )}

        {!isUploading && (
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-neo-accent rounded-full flex items-center justify-center">
            <Camera className="w-3.5 h-3.5 text-neo-bg" />
          </div>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
