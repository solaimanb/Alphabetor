"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CountUp from "react-countup";

const counterData = [
  { label: "Courses", count: 70 },
  { label: "Enrolled", count: 4600 },
  { label: "Students", count: 2470 },
  { label: "Teachers", count: 27 },
];

const Counter = () => {
  return (
    <div className="container grid grid-cols-2 md:grid-cols-4 justify-center gap-6 py-5 bg-brand/90 rounded-md mt-10">
      {counterData.map((item) => (
        <Card
          key={item.label}
          className="flex flex-col items-center text-center
           bg-brand border-none text-white/90 font-medium shadow-md p-2 rounded-md"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium uppercase">
              {item.label}
            </CardTitle>
          </CardHeader>

          <CardContent className="text-3xl font-bold">
            <CountUp end={item.count} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Counter;
