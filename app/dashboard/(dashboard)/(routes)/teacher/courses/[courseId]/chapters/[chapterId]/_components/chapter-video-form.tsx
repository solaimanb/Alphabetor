"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FileUpload } from "@/components/shared/file-upload";
import { Chapter, MuxData } from "@prisma/client";
import MuxPlayer from "@mux/mux-player-react";

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current: any) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Submitting form with values:", values);
    try {
      const response = await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      if (response.status === 200) {
        toast.success("Chapter updated!");
        toggleEdit();
        router.refresh();
      } else {
        throw new Error("Server responded with non-OK status");
      }
    } catch (error: any) {
      console.log("Error uploading chapter video:", error.message || error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="mt-10 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Video
        <Button onClick={toggleEdit} variant={"ghost"} size={"sm"}>
          {isEditing && <span className="text-destructive">Cancel</span>}

          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add a video
            </>
          )}

          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-40 bg-slate-200 rounded-md">
            <Video className="w-10 h-10 text-slate-500" />
          </div>
        ) : (
          initialData?.muxData?.playbackId && (
            <div className="relative aspect-video mt-2">
              <MuxPlayer playbackId={initialData.muxData.playbackId} />
            </div>
          )
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />

          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter&apos;s video.
          </div>
        </div>
      )}

      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if video
          dose not appear.
        </div>
      )}
    </div>
  );
};
