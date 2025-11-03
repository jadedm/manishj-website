import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Feed The Cow",
  description: "A fast-paced browser arcade game built with Phaser 2 for World Milk Day",
};

export default function FeedTheCowPage() {
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
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <div className="w-full h-full md:max-w-screen-lg md:max-h-[calc(100vh-60px)]">
          <iframe
            src="/feed-the-cow/index.html"
            className="w-full h-full border-0"
            title="Feed The Cow Game"
          />
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-xs opacity-50 pointer-events-none md:hidden landscape:hidden">
        Rotate your device for best experience
      </div>
    </div>
  );
}
