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
import { Badge } from "./ui/badge";
import { ArrowUp } from "lucide-react";
import { formatRelative } from "date-fns";

const Row = ({ spending }: { spending: Payment }) => {

  const name = useMemo(() => {
    if (spending.from.type === 'wallet') {
      return spending.from.walletId
    }
    return spending.from.accountName
  }, [spending.from])

  return (
    <TableRow>
      <TableCell>
        <div className="grid">
          <div className="font-medium">{name}</div>
          <div className="text-sm text-muted-foreground">{formatRelative(spending.createdAt, new Date())}</div>
        </div>
      </TableCell>
      <TableCell>
        <Badge className="text-primary bg-primary/10">Food</Badge>
      </TableCell>
      <TableCell className="font-medium">
        <div className="flex items-center gap-1">
          <span><ArrowUp className="size-4" /></span>
          <span>₦{spending.amount}</span>
        </div>
      </TableCell>
    </TableRow>
  )
}

export const TransactionsCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { data: payments = [] } = usePayments();

  return (
    <Card ref={ref} {...props} className={cn("flex flex-col", className)}>
      <CardHeader>
        <CardTitle>Recent transactions</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 px-3 gap-1">
        <Table>
          <TableCaption>
            Your recent transactions
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Nominal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <Row key={payment.id} spending={payment} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
});
