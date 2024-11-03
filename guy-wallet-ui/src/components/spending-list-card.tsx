import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowDown, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatRelative } from 'date-fns'
import { Payment, usePayments } from "@/data/payments/get-payments";
import { Link } from "react-router-dom";

const SpendingRow = ({ spending }: { spending: Payment }) => {

  const name = useMemo(() => {
    if (spending.from.type === 'wallet') {
      return spending.from.walletId
    }
    return spending.from.accountName
  }, [spending.from])

  return (
    <Link to={`/spending/${spending.id}`} className="block">
      <div className="flex items-center gap-2 py-2 px-3 transition-colors hover:bg-muted rounded-lg">
        <span className="size-8 rounded-full bg-neutral text-white grid place-items-center">
          <User className="size-4" />
        </span>
        <div className="grid">
          <div className="font-medium leading-4">{name}</div>
          <small className="capitalize text-xs text-muted-foreground">{formatRelative(new Date(spending.createdAt), new Date())}</small>
        </div>
        <div className="grid ml-auto text-right">
          <span className="flex items-center gap-1">
            <ArrowDown className="size-5 text-destructive" />
            {/* <ArrowUp className="size-5 text-tertiary" /> */}
            <span className="flex items-center">₦{spending.amount}</span>
          </span>
        </div>
      </div>
    </Link>
  )
}

export const SpendingListCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { data: payments = [] } = usePayments();

  return (
    <Card ref={ref} {...props} className={cn("flex flex-col", className)}>
      <CardHeader>
        <CardTitle>List of spendings</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 px-3 gap-1">
        {payments.map((spending) => <SpendingRow key={spending.id} spending={spending} />)}
      </CardContent>
    </Card>
  )
});
