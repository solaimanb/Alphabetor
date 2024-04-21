"use client";

import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import MuxPlayer from "@mux/mux-player-react";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import toast from "react-hot-toast";
import axios from "axios";

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
  const router = useRouter();
  const confetti = useConfettiStore();

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isComplete: true,
          }
        );
      }

      if (!nextChapterId) {
        confetti.onOpen();
      }

      toast.success("Chapter completed!");
      router.refresh();

      if (nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

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
          onEnded={onEnd}
          autoPlay
          playbackId={playbackId}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
