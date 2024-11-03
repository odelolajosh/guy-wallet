import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";

export const SendAgainCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <Card ref={ref} {...props} className={cn("flex flex-col", className)}>
      <CardHeader className="pb-2">
        <CardTitle>Send Again</CardTitle>
        <CardDescription>Send money to your friends and family</CardDescription>
      </CardHeader>
      <CardContent>
      </CardContent>
    </Card>
  )
});