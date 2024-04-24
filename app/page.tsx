import Header from "@/components/shared/header/header";
import Hero from "./_components/hero";
import Sponsors from "./_components/sponsors";
import Footer from "@/components/shared/footer/footer";
import Newsletter from "./_components/newsletter";
import Counter from "./_components/countup";
import Testimonial from "./_components/testimonial";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/shared/courses-list";
import AppFeaturedAd from "./_components/app-fetured-add";

const Home = async () => {
  const courses = await getCourses({});

  return (
    <>
      <Header />
      <Hero />
      <Sponsors />
      <Counter />
      <div className="container mt-10 px-2 md:px-0">
        <h2 className="text-center text-brand text-3xl font-bold">
          Featured Courses
        </h2>

        <CoursesList items={courses} />
      </div>

      <AppFeaturedAd />
      {/* <Testimonial /> */}
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
