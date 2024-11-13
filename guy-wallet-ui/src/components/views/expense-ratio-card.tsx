import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { gcd } from "@/lib/math";

export const ExpenseRatioCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const chartData = [{ month: "january", expenses: 1260, income: 570 }]
  const chartConfig = {
    expenses: {
      label: "Expenses",
      color: "hsl(var(--chart-1))",
    },
    income: {
      label: "Income",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

  const total = chartData[0].expenses + chartData[0].income
  const divisor = gcd(chartData[0].expenses, total)
  const ratio = `${chartData[0].expenses / divisor}/${total / divisor}`

  return (
    <Card ref={ref} className={className} {...props}>
      <CardHeader className="pb-2">
        <CardDescription className="text-center">Expends Ratio</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto h-[120px] w-[240px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={90}
            outerRadius={120}
            cx={120}
            cy={120}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {ratio}
                        </tspan>
                        {/* <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan> */}
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="expenses"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-expenses)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="income"
              fill="var(--color-income)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
});