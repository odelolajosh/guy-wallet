import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { ArrowDownLeft, ArrowUpRight, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export const WalletCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <Card ref={ref} {...props} className={cn("flex flex-col", className)}>
      <CardHeader className="pb-2">
        <CardDescription>Your balance</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div>
          <span className="text-3xl font-semibold">$40,306</span>
          <span className="text-sm text-muted-foreground">.38</span>
        </div>
        <div className="flex items-center space-x-1 text-sm">
          <TrendingUp className="text-tertiary" />
          <span>3.2%</span>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button variant="outline" className="text-tertiary hover:text-tertiary"> <ArrowUpRight /> Send</Button>
        <Button variant="outline" className="text-tertiary hover:text-tertiary"> <ArrowDownLeft /> Receive</Button>
      </CardFooter>
    </Card>
  )
});