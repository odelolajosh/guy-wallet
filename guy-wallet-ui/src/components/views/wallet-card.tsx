import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { ArrowDownLeft, ArrowUpRight, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useWallets } from "@/data/wallets/get-wallets";
import { countries } from "@/data/wallets/countries";
import { Decimal } from "@/lib/math";
import { ReceiveMoneyDialog } from "../receive-money-dialog";
import { SendMoneyDialog } from "./send-money";

export const WalletCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { data: wallets } = useWallets();

  const wallet = useMemo(() => wallets?.[0] ?? { currency: '', balance: '0' }, [wallets]);

  const country = useMemo(() => {
    const currency = (wallet.currency) as keyof typeof countries;
    return countries[currency];
  }, [wallet]);

  const [whole, decimal] = useMemo(() => {
    const x = new Decimal(wallet.balance);
    return x.format().split(".");
  }, [wallet]);


  return (
    <Card ref={ref} {...props} className={cn("flex flex-col", className)}>
      <CardHeader className="pb-2">
        <CardDescription>Your balance</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex justify-between">
          <div>
            <div className="flex items-baseline">
              <h2 className="text-3xl font-semibold space-x-px">
                <span>{country.currencySymbol}</span>
                <span>{whole}</span>
              </h2>
              <span className="text-sm text-muted-foreground">.{decimal}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <TrendingUp className="text-tertiary" />
              <span>3.2%</span>
            </div>
          </div>
          <div>
            <Button variant="outline" size="sm" className="text-lg">
              {country.flag}
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid sm:grid-cols-2 gap-2">
        <SendMoneyDialog>
          <Button variant="outline" className="text-tertiary hover:text-tertiary space-x-1">
            <ArrowUpRight />
            Send
          </Button>
        </SendMoneyDialog>
        <ReceiveMoneyDialog>
          <Button variant="outline" className="text-tertiary hover:text-tertiary space-x-1">
            <ArrowDownLeft />
            Receive
          </Button>
        </ReceiveMoneyDialog>
      </CardFooter>
    </Card>
  )
});