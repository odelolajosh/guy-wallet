import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { countries } from "@/data/wallets/countries";
import { useControllableState } from "@/hooks/use-controllable";

export interface CreateWalletDTO {
  currency: keyof typeof countries;
}

export interface CreateWalletCardProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: CreateWalletDTO;
  onValueChange?: (value: CreateWalletDTO) => void;
}

const defaultState: CreateWalletDTO = {
  currency: "NGN",
}

export const CreateWalletCard = React.forwardRef<
  HTMLDivElement,
  CreateWalletCardProps
>(({ className, value, onValueChange, ...props }, ref) => {
  const [state, setState] = useControllableState<CreateWalletDTO>({
    prop: value,
    onChange: onValueChange,
    defaultProp: defaultState,
  });

  const updateState = <T extends keyof CreateWalletDTO>(key: T, value: CreateWalletDTO[T]) => {
    setState((prev = defaultState) => ({
      ...prev,
      [key]: value,
    }));
  }

  const country = countries[state?.currency ?? "NGN"];

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
                <span>40,306</span>
              </h2>
              <span className="text-sm text-muted-foreground">.38</span>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <TrendingUp className="text-tertiary" />
              <span>3.2%</span>
            </div>
          </div>
          <div>
            <Select value={state?.currency} onValueChange={value => updateState("currency", value as keyof typeof countries)}>
              <SelectTrigger className="w-[66px]">
                <SelectValue placeholder="Theme">
                  <span>{country.flag}</span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.entries(countries).map(([key, country]) => (
                  <SelectItem key={key} value={country.currency}>
                    <div className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
});