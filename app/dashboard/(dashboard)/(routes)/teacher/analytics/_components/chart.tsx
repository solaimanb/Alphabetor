"use client";

import { Card } from "@/components/ui/card";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface ChartProps {
  data: {
    name: String;
    total: number;
  }[];
}

export const Chart = ({ data }: ChartProps) => {
  return (
    <Card>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
