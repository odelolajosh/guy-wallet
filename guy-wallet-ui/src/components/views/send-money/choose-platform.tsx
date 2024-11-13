import { GuyLogo } from "@/components/guy-logo"
import { Button } from "@/components/ui/button"
import { PiggyBank } from "lucide-react"
import { useSendMoney } from "./send-money-provider"

export const ChoosePlatform = () => {
  const { goToStep } = useSendMoney("ChoosePlatform")

  return (
    <div className="grid gap-2">
      <Button variant="outline" className="h-16 flex gap-4 text-left text-foreground hover:text-foreground" onClick={() => goToStep('choose_guy_recipient')}>
        <span className="shrink-0 grid place-items-center">
          <GuyLogo />
        </span>
        <div className="grid gap-px flex-1">
          <h4 className="text-base leading-4">Guy wallet</h4>
          <span className="text-muted-foreground font-normal">Send money another Guy wallet</span>
        </div>
      </Button>
      <Button variant="outline" className="h-16 flex gap-4 text-left text-foreground hover:text-foreground" onClick={() => goToStep('choose_bank_recipient')}>
        <span className="shrink-0 grid place-items-center">
          <PiggyBank className="!size-6" />
        </span>
        <div className="grid gap-px flex-1">
          <h4 className="text-base leading-4">Bank account</h4>
          <span className="text-muted-foreground font-normal">Send money to a bank account</span>
        </div>
      </Button>
    </div>
  )
}