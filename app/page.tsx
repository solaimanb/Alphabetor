import Link from "next/link";

const Home = () => {
  return (
    <div>
      Home Page
      <Link href={"/dashboard"} className="ml-auto">
        <button type="button" className="bg-black text-white p-2 rounded">
          Dashboard
        </button>
      </Link>
    </div>
  );
};

export default Home;
