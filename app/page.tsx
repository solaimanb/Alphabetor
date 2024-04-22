import Header from "@/components/shared/header/header";
import Hero from "./_components/hero";
import Sponsors from "./_components/sponsors";
import Footer from "@/components/shared/footer/footer";
import Newsletter from "./_components/newsletter";
import Counter from "./_components/countup";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HomeProps {
  searchParams: {
    categoryId: string;
    title: string;
  };
}

const Home = async ({ searchParams }: HomeProps) => {
  return (
    <>
      <Link href={"/dashboard"} className="ml-auto">
        <Button
          variant="brandOutline"
          type="button"
          size={"sm"}
          className="font-bold"
        >
          Dashboard
        </Button>
      </Link>
      {/* <Header />
      <Hero />
      <Sponsors />
      <Counter />
      <Newsletter />
      <Footer />
      */}
    </>
  );
};

export default Home;
