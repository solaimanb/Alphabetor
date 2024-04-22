import Image from "next/image";
import Link from "next/link";

import Apple from "@/public/apple-store-badge-en.svg";
import Google from "@/public/google-play-badge-en.webp";

const quickLinks = [
  { id: 1, text: "Courses", link: "/courses" },
  { id: 2, text: "Docs", link: "/docs" },
  { id: 3, text: "Forum", link: "/forum" },
  { id: 4, text: "About", link: "/about" },
  { id: 5, text: "Contact", link: "/contact" },
];

const socialLinks = [
  { id: 1, text: "Facebook", url: "https://facebook.com/your-page" },
  { id: 2, text: "Twitter", url: "https://twitter.com/your-handle" },
  { id: 3, text: "LinkedIn", url: "https://linkedin.com/company/your-company" },
  { id: 4, text: "Instagram", url: "https://instagram.com/your-profile" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="container mx-auto py-10 px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* BRAND-INFO/LOGO */}
          <div className="flex flex-col justify-between md:col-span-2 lg:col-span-1 h-full">
            <div>
              <h2 className="font-bold italic text-xl uppercase">
                <Link href={"/"}>Alphabetor</Link>
              </h2>

              <div className="text-gray-400 text-sm font-semibold mt-2">
                <p>support@alphabetor.com</p>
                <p>Melbourne, Australia, 104 South Park Avenue</p>
              </div>
            </div>

            {/* INSTALLATION */}
            <div>
              <p className="text-xs font-semibold">
                Download our mobile app and learn on the go.
              </p>
              <div className="flex flex-col md:flex-row gap-2 mt-2 lg:mt-auto">
                <Image
                  src={Apple}
                  alt="apple-store-badge"
                  className="w-[120px] h-10"
                  width={500}
                  height={500}
                />

                <Image
                  src={Google}
                  alt="google-play-badge"
                  className="w-[120px] h-10"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="list-none">
              {quickLinks?.map((link) => (
                <li key={link.id} className="mb-2 text-sm">
                  <Link
                    href={link.link.toString()}
                    className="text-gray-300 hover:text-white"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIAL LINKS */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <ul className="list-none">
              {socialLinks?.map((link) => (
                <li key={link?.id} className="mb-2 text-sm">
                  <Link
                    href={link?.url.toString()}
                    className="text-gray-300 hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link?.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* LANGUAGE */}
          <div className="">
            <h3 className="text-xl font-semibold mb-4">Language</h3>
            <select
              id="language"
              name="language"
              className="border rounded-sm p-1 bg-gray-800"
            >
              <option value="english">English</option>
              <option value="bangla">Bangla</option>
              <option value="german">German</option>
            </select>
          </div>
        </div>
      </div>

      {/* ALPHABETOR COPYRIGHT */}
      <div className="mt-2 bg-black p-5 text-center">
        <small>&copy;2023 ALPHABETOR all rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
