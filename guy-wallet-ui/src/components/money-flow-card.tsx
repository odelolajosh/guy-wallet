
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";
import { Progress } from "./ui/progress";

export const MoneyFlowCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <Card ref={ref} {...props} className={cn("flex flex-col", className)}>
      <CardHeader className="pb-0" />
      <CardContent className="grid gap-6">
        <div className="flex justify-between">
          <div className="grid gap-1">
            <span className="border rounded-full text-lg size-9 grid place-items-center">
              💰
            </span>
            <h4 className="text-sm text-muted-foreground">Monthly Income</h4>
            <div className="flex items-baseline">
              <h2 className="text-xl font-semibold">$2,703</h2>
              <span className="text-sm text-muted-foreground">.43</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <TrendingUp className="text-tertiary" />
              <span>3.2%</span>
              <span>from last month</span>
            </div>
          </div>
          <div className="grid gap-1">
            <span className="border rounded-full text-lg size-9 grid place-items-center">
              💸
            </span>
            <h4 className="text-sm text-muted-foreground">Monthly Expense</h4>
            <div className="flex items-baseline">
              <h2 className="text-xl font-semibold">$1,174</h2>
              <span className="text-sm text-muted-foreground">.50</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <TrendingUp className="text-tertiary" />
              <span>1.3%</span>
              <span>from last month</span>
            </div>
          </div>
        </div>
        <div>
          <Progress value={40} />
        </div>
      </CardContent>
    </Card>
  )
});