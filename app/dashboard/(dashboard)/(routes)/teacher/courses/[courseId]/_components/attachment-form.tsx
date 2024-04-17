"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  File,
  ImageIcon,
  Loader,
  Loader2,
  Pencil,
  PlusCircle,
  X,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { FileUpload } from "@/components/shared/file-upload";
import { Attachment, Course } from "@prisma/client";

interface AttachmentFormProps {
  initialData: Course & { attachment: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  courseId,
}: AttachmentFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current: any) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      await axios.patch(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course Image updated!");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted!");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-10 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Attachment
        <Button onClick={toggleEdit} variant={"ghost"} size={"sm"}>
          {isEditing && <span className="text-destructive">Cancel</span>}

          {!isEditing && (
            <>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <>
          {initialData.attachment.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments added yet.
            </p>
          )}
          {initialData.attachment.length > 0 && (
            <div>
              {initialData.attachment.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center gap-2 mt-2 p-2 w-full bg-slate-200 text-sky-800 rounded-md font-[500]"
                >
                  <File className="w-4 h-4 text-slate-600 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>

                  {deletingId === attachment.id ? (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  ) : (
                    <button
                      onClick={() => onDelete(attachment?.id)}
                      className="ml-auto"
                    >
                      <X className="w-4 h-4 text-slate-600" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs 16:9 aspect ratio recommended.text-muted-foreground mt-4">
            Add anything your students might need to complete this course.
          </div>
        </div>
      )}
    </div>
  );
};
