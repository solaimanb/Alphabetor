"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackTo = () => {
  const router = useRouter();

  const backTo = () => {
    router.back();
  };

  return (
    <button onClick={backTo} className="">
      <ChevronLeft className="w-6 h-6" />
    </button>
  );
};

export default BackTo;
