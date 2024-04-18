import { IconBadge } from "@/components/shared/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterDescriptionForm } from "./_components/chapter-description-form";
import { ChapterAccessForm } from "./_components/chapter-access-form";
import { ChapterVideoForm } from "./_components/chapter-video-form";
import { Banner } from "@/components/shared/banner";
import { ChapterActions } from "./_components/chapter-actions";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/dashboard");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect("/dashboard");
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields}`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course"
        />
      )}

      <div className="p-6">
        {/* Back Btn & Heading Info */}
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/dashboard/teacher/courses/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-75"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to course setup
            </Link>

            <div className="mt-6 flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter Creation</h1>

                <span className="text-sm text-slate-700">
                  Complete all fields ({completionText})
                </span>
              </div>

              <ChapterActions
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-lg font-medium">Customize your chapter</h2>
              </div>

              {/* Chapter Title Form */}
              <ChapterTitleForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />

              {/* Chapter Description Form */}
              <ChapterDescriptionForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>

            {/* Chapter Status */}
            <div className="mt-10">
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-lg font-medium">Access Settings</h2>
              </div>

              <ChapterAccessForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-lg font-medium">Add a Video</h2>
            </div>

            <ChapterVideoForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage;
