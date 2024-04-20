import { Category } from "@prisma/client";
import { CourseCard } from "./course-card";

type CourseWithProgressWithCategory = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}

export const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-2 md:gap-4">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            chapters={item.chapters}
            progress={item.progress}
            category={item?.category?.name!}
          />
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-sm text-center text-muted-foreground mt-20">
          No courses found!
        </div>
      )}
    </div>
  );
};
