import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { Payment, usePayments } from "@/data/payments/get-payments";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "../ui/badge";

const SpendingRow = ({ spending }: { spending: Payment }) => {

  const name = useMemo(() => {
    if (spending.from.type === 'wallet') {
      return spending.from.walletId
    }
    return spending.from.accountName
  }, [spending.from])

  return (
    <TableRow>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>
        <Badge className="text-primary bg-primary/10">Food</Badge>
      </TableCell>
      <TableCell className="font-medium">₦{spending.amount}</TableCell>
      <TableCell>8%</TableCell>
    </TableRow>
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
        <Table>
          <TableCaption>A list of recent spendings</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Nominal</TableHead>
              <TableHead>Percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <SpendingRow key={payment.id} spending={payment} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
});
