import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CreditCard, Music, User, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

const spendings = [
  { icon: User, category: "transfer", name: "Simon Pegg", date: new Date("2021-09-01:6:30"), amount: +44 },
  { icon: Music, category: "subscription", name: "Spotify", date: new Date("2021-09-01:12:00"), amount: -9.99 },
  { icon: UtensilsCrossed, category: "restaurant", name: "McDonald's", date: new Date("2021-09-01:18:00"), amount: -5.18 },
  { icon: CreditCard, category: "transfer", name: "Mastercard", date: new Date("2021-09-01:20:00"), amount: +13 },
  { icon: User, category: "transfer", name: "Guy", date: new Date("2021-09-01:6:30"), amount: +13 },
];

export const ListOfSpendingCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <Card ref={ref} {...props} className={cn("flex flex-col", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">List of spendings</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {spendings.map((spending, index) => (
          <div key={index} className="flex items-center gap-2 py-2">
            <span className="size-6 grid place-items-center">
              <spending.icon className="size-4" />
            </span>
            <div className="grid">
              <div>{spending.name}</div>
              <small className="capitalize text-xs text-muted-foreground">{new Date(spending.date).toLocaleString()}</small>
            </div>
            <div className="grid ml-auto text-right">
              <span>{spending.amount}</span>
              <small className="capitalize text-xs text-muted-foreground">{spending.category}</small>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
});
