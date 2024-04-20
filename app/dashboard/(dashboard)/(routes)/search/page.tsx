import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { SearchInput } from "@/components/shared/search-input";
import { getCourses } from "@/actions/get-courses";

import { Categories } from "./_components/categories";
import { CoursesList } from "@/components/shared/courses-list";

interface SearchPageProps {
  searchParams: {
    categoryId: string;
    title: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/dashboard");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <>
      <div className="block md:hidden">
        <SearchInput />
      </div>

      <div className="px-2 py-4 md:px-4">
        <Categories items={categories} />

        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
