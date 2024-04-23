import Header from "@/components/shared/header/header";
import Hero from "./_components/hero";
import Sponsors from "./_components/sponsors";
import Footer from "@/components/shared/footer/footer";
import Newsletter from "./_components/newsletter";
import Counter from "./_components/countup";
import Testimonial from "./_components/testimonial";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Sponsors />
      <Counter />
      {/* <Testimonial /> */}
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
