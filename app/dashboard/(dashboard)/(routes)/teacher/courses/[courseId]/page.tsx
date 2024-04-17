import { IconBadge } from "@/components/shared/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { redirect } from "next/navigation";

import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapters-form";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/dashboard");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/dashboard");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields}`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields ({completionText})
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl font-semibold text-slate-700">
              Customize your course
            </h2>
          </div>

          <TitleForm initialData={course} courseId={course.id} />

          <DescriptionForm
            initialData={{ description: course.description || "" }}
            courseId={course.id}
          />

          <ImageForm
            initialData={{ imageUrl: course.imageUrl || "" }}
            courseId={course.id}
          />

          <CategoryForm
            initialData={{ categoryId: course.categoryId || "" }}
            courseId={course.id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </div>

        <div className="space-y-6">
          {/* Course Chapters Field */}
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h1 className="text-xl font-semibold text-slate-700">
                {" "}
                Course Chapters
              </h1>
            </div>

            <ChaptersForm initialData={course} courseId={course.id} />
          </div>

          {/* Course Price Field */}
          <>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={CircleDollarSign} />
              <h2 className="text-xl font-semibold text-slate-700">
                Sell your course
              </h2>
            </div>

            <PriceForm initialData={course} courseId={course.id} />
          </>

          {/* Course Attachments Field */}
          <>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={File} />
              Resources & Attachments
            </div>

            <AttachmentForm
              initialData={{ ...course, attachment: course.attachments }}
              courseId={course.id}
            />
          </>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
