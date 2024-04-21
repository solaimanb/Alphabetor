import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/shared/banner";
import VideoPlayer from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/shared/preview";
import { File } from "lucide-react";
import { IconBadge } from "@/components/shared/icon-badge";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/dashboard");
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/dashboard");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  console.log("Attachments:", attachments);

  return (
    <div className="p-4">
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this chapter." />
      )}

      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}

      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id || ""}
            playbackId={muxData?.playbackId || ""}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>

        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between gap-y-2">
            <h2 className="text-2xl font-bold">{chapter.title}</h2>

            {purchase ? (
              // TODO: Add CourseProgress component
              <div></div>
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>

          <Separator />

          <div>
            <Preview value={chapter.description || ""} />
          </div>

          <div className="space-y-2 p-4">
            {attachments.length && (
              <div className="flex items-center">
                <IconBadge size="sm" icon={File} />
                <h2 className="ml-2 text-lg font-semibold text-slate-800 underline">
                  Course Attachments:
                </h2>
              </div>
            )}

            {attachments.map((attachment) => (
              <a
                href={attachment.url}
                target="_blank"
                key={attachment.id}
                className="flex items-center p-2 w-full bg-gray-100 rounded-md border hover:underline"
              >
                <File className="h-4 w-4 mr-2" />
                <p className="line-clamp-1 text-sm">{attachment.name}</p>
              </a>
            ))}
          </div>

          {!!attachments.length && (
            <>
              <Separator />

              {/* <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-2 w-full bg-gray-100 rounded-md border hover:underline"
                  >
                    <File className="h-4 w-4 mr-2" />
                    <p className="line-clamp-1 text-sm">{attachment.name}</p>
                  </a>
                ))}
              </div> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
