import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  chapters: { id: string }[];
  progress: number | null;
  category: string;
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  chapters,
  progress,
  category,
}: CourseCardProps) => {
  return (
    <Link
      href={`/courses/${id}`}
      className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-2 h-full"
    >
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image fill className="object-cover" alt={title} src={imageUrl} />
      </div>

      <div className="flex flex-col p-2">
        <div className="text-lg md:text-base font-medium group-hover:text-emerald-950 transition line-clamp-2">
          {title}
        </div>

        <p className="text-xs text-muted-foreground">{category} Category</p>

        <div className="my-2 flex items-center gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-x-1 text-slate-500">
            <IconBadge size="sm" icon={BookOpen} />
            <span>
              {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
            </span>
          </div>
        </div>
        {progress !== null ? (
          <div>TODO: Progress bar</div>
        ) : (
          <p className="font-medium text-slate-700">{formatPrice(price)}</p>
        )}
      </div>
    </Link>
  );
};
