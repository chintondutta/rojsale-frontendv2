
'use client';

import * as React from 'react';
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { IncomeData } from '@/lib/types';

const data: IncomeData[] = [
    { name: 'Package Sales', value: 4500, fill: 'hsl(var(--chart-2))' },
    { name: 'Ad Revenue', value: 2500, fill: 'hsl(var(--chart-1))' },
    { name: 'Sponsorships', value: 1200, fill: 'hsl(var(--chart-3))' },
  ];

const Legend = ({ payload }: any) => {
  return (
    <ul className="flex flex-col mt-4 space-y-2">
      {payload?.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center text-sm">
          <span className="mr-2 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-primary">{entry.value}</span>
          <span className="ml-auto font-medium text-primary">₹{data[index].value.toLocaleString()}</span>
        </li>
      ))}
    </ul>
  );
};


export function IncomeChart({ chartConfig }: { chartConfig: ChartConfig }) {
    return (
        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
        >
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Tooltip 
                        cursor={false}
                        content={
                            <ChartTooltipContent 
                                hideLabel
                                nameKey="name" 
                                formatter={(value) => `₹${Number(value).toLocaleString()}`} 
                            />
                        } 
                    />
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={0}
                        startAngle={90}
                        endAngle={450}
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <Legend payload={data.map(item => ({value: item.name, color: item.fill}))} />
        </ChartContainer>
    );
}
