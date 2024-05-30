"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const formatCurrency = (value: any) => {
  const float = parseFloat(value);
  const currency = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(float);

  return currency;
};

const Chart = ({ data }: { data: any }) => (
  <ResponsiveContainer height={350} width={"100%"}>
    <BarChart
      width={500}
      height={400}
      data={data}
      style={{ fontSize: "0.75rem" }}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      barSize={44}
    >
      <XAxis dataKey="name" axisLine={false} tickLine={false} />
      <YAxis
        width={44}
        axisLine={false}
        tickLine={false}
        tickFormatter={formatCurrency}
      />
      <Bar
        dataKey="paid"
        stackId="a"
        className="fill-primary"
        radius={[4, 4, 0, 0]}
      />
    </BarChart>
  </ResponsiveContainer>
);

export default Chart;
