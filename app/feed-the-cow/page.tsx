"use client";

import Link from "next/link";
import { ArrowLeft, RotateCw } from "lucide-react";
import { useEffect, useState } from "react";

export default function FeedTheCowPage() {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const portrait = window.innerHeight > window.innerWidth;
      setIsPortrait(portrait && window.innerWidth < 768);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col overflow-hidden">
      <header className="bg-black border-b border-white/10 z-10">
        <div className="container max-w-screen-lg mx-auto px-4 py-3 flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
          <div className="flex-1 text-center">
            <h1 className="text-white font-medium">Feed The Cow</h1>
          </div>
          <div className="w-[80px]"></div>
        </div>
      </header>

      {isPortrait ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <RotateCw className="h-16 w-16 text-white mb-4 animate-pulse" />
          <h2 className="text-white text-xl font-semibold mb-2">
            Please Rotate Your Device
          </h2>
          <p className="text-white/70 text-sm">
            This game is best played in landscape mode
          </p>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <div className="w-full h-full md:max-w-screen-lg md:max-h-[calc(100vh-60px)]">
            <iframe
              src="https://jadedm.github.io/feed-the-cow"
              className="w-full h-full border-0"
              title="Feed The Cow Game"
            />
          </div>
        </div>
      )}
    </div>
  );
}
