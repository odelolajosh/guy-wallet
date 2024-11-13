import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useWallets } from "@/data/wallets/get-wallets"

interface ReceiveMoneyDialogProps {
  children?: React.ReactNode
}

export const ReceiveMoneyDialog = ({ children }: ReceiveMoneyDialogProps) => {
  const { data: wallets } = useWallets();

  const wallet = wallets?.[0]!

  return (
    <Dialog>
      {children && (
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Receive money</DialogTitle>
          <DialogDescription>
            Your wallet&apos;s account details are below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label htmlFor="bank-name">
              Bank name
            </Label>
            <div className="relative">
              <Input
                id="bank-name"
                defaultValue={wallet.bankName}
                readOnly
              />
              <span className="absolute inset-y-0 right-[2px] grid place-items-center">
                <Button type="submit" size="sm" variant="ghost" className="px-3">
                  <span className="sr-only">Copy</span>
                  <Copy />
                </Button>
              </span>
            </div>
          </div>
          <div className="grid gap-1">
            <Label htmlFor="account-number">
              Account number
            </Label>
            <div className="relative">
              <Input
                id="account-number"
                defaultValue={wallet.accountNumber}
                readOnly
              />
              <span className="absolute inset-y-0 right-[2px] grid place-items-center">
                <Button type="submit" size="sm" variant="ghost" className="px-3">
                  <span className="sr-only">Copy</span>
                  <Copy />
                </Button>
              </span>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
