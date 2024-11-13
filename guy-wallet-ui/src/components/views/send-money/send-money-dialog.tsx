import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SendMoneyProvider, SendMoneyRecipient, SendMoneyStep } from "./send-money-provider"
import { useCallback, useState } from "react"
import { ChoosePlatform } from "./choose-platform"
import { ChooseGuyRecipient } from "./choose-guy-recipient"
import { ArrowLeft } from "lucide-react"
import { useControllableState } from "@/hooks/use-controllable"
import { DialogProps } from "@radix-ui/react-dialog"
import { ChooseBankRecipient } from "./choose-bank-recipient"

const meta: Record<SendMoneyStep, { title: string, description: string }> = {
  'choose_platform': {
    title: 'Send money',
    description: 'Select the platform you want to send money to.',
  },
  'choose_guy_recipient': {
    title: 'Send money',
    description: 'Use recipient\'s name or phone number to send money.',
  },
  'choose_bank_recipient': {
    title: 'Send money',
    description: 'Enter the recipient\'s bank account details below.',
  },
  'enter_amount': {
    title: 'Send money',
    description: 'Enter the recipient\'s phone number below.',
  },
  'review': {
    title: 'Send money',
    description: 'Enter the recipient\'s phone number below.',
  },
  'success': {
    title: 'Send money',
    description: 'Enter the recipient\'s phone number below.',
  }
}

interface SendMoneyDialogProps extends DialogProps {
  children?: React.ReactNode
}

export const SendMoneyDialog = ({ children, ...props }: SendMoneyDialogProps) => {
  const [open, setOpen] = useControllableState({
    prop: props.open,
    onChange: props.onOpenChange,
    defaultProp: false,
  })
  const [currentStep, setCurrentStep] = useState<SendMoneyStep>('choose_platform')
  const [history, setHistory] = useState<SendMoneyStep[]>([])
  const [recipient, setRecipient] = useState<SendMoneyRecipient>(null)
  const [amount, setAmount] = useState(0)

  const goBack = useCallback(() => {
    if (history.length === 0) {
      return
    }
    setCurrentStep(history[history.length - 1])
    setHistory((prev) => prev.slice(0, -1))
  }, [history])

  const goToStep = useCallback((step: SendMoneyStep) => {
    setHistory((prev) => [...prev, currentStep])
    setCurrentStep(step)
  }, [currentStep])

  const reset = useCallback(() => {
    setCurrentStep('choose_platform')
    setHistory([])
    setRecipient(null)
    setAmount(0)
  }, [])

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) reset()
    setOpen(open)
  }, [reset, setOpen])

  return (
    <Dialog {...props} open={open} onOpenChange={handleOpenChange}>
      {children && (
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {meta[currentStep].title}
          </DialogTitle>
          <DialogDescription>
            {meta[currentStep].description}
          </DialogDescription>
        </DialogHeader>
        <SendMoneyProvider currentStep={currentStep} goToStep={goToStep} amount={amount} setAmount={setAmount} recipient={recipient} setRecipient={setRecipient} goBack={goBack}>
          {currentStep === 'choose_platform' && <ChoosePlatform />}
          {currentStep === 'choose_guy_recipient' && <ChooseGuyRecipient />}
          {currentStep === 'choose_bank_recipient' && <ChooseBankRecipient />}
        </SendMoneyProvider>
        <DialogFooter className="sm:justify-start">
          {history.length > 0 && (
            <Button type="button" variant="ghost" onClick={goBack}>
              <ArrowLeft size={16} />
              Back
            </Button>
          )}
          {/* <DialogClose asChild>
            <Button type="button">
              Close
            </Button>
          </DialogClose> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
