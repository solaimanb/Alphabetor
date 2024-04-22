import Header from "@/components/shared/header/header";
import Hero from "./_components/hero";
import Sponsors from "./_components/sponsors";
import Footer from "@/components/shared/footer/footer";
import Newsletter from "./_components/newsletter";
import Counter from "./_components/countup";

interface HomeProps {
  searchParams: {
    categoryId: string;
    title: string;
  };
}

const Home = async ({ searchParams }: HomeProps) => {
  return (
    <>
      <Header />
      <Hero />
      <Sponsors />
      <Counter />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
