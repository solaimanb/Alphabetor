"use client";

import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import MuxPlayer from "@mux/mux-player-react";

import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  chapterId: string;
  courseId: string;
  title: string;
  nextChapterId: string;
  playbackId: string;
  isLocked: boolean;
  completeOnEnd: boolean;
}

const VideoPlayer = ({
  playbackId,
  chapterId,
  courseId,
  title,
  nextChapterId,
  isLocked,
  completeOnEnd,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="relative aspect-video">
      {!isReady ||
        (!isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-emerald-950 rounded-md h-full">
            <Loader2 className="h-6 w-6 animate-spin text-secondary" />
          </div>
        ))}

      {isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-950 gap-y-2 text-secondary rounded h-full">
          <Lock className="h-6 w-6" />
          <p className="text-sm">This chapter is locked.</p>
        </div>
      )}

      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          onEnded={() => {}}
          autoPlay
          playbackId={playbackId}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
