import { createContext } from "@/lib/context"

export type SendMoneyStep =
  | 'choose_platform'
  | 'choose_guy_recipient'
  | 'choose_bank_recipient'
  | 'enter_amount'
  | 'review'
  | 'success'

export type SendMoneyRecipient =
  | { type: 'wallet', walletId: string }
  | { type: 'bank', bankName: string, accountNumber: string }
  | null

interface SendMoneyContextValues {
  currentStep: SendMoneyStep
  goToStep: (step: SendMoneyStep) => void
  goBack: () => void
  recipient: SendMoneyRecipient
  setRecipient: (recipient: SendMoneyRecipient) => void
  amount: number
  setAmount: (amount: number) => void
}

export const [useSendMoney, SendMoneyProvider] = createContext<SendMoneyContextValues>('SendMoneyDialog')
