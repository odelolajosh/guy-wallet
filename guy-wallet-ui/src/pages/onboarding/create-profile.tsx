import { CreateWalletCard, CreateWalletDTO } from "@/components/create-wallet-card"
import { GuyLogo } from "@/components/guy-logo"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useCreateWallet } from "@/data/wallets/create-wallet"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const CreateProfile = () => {
  const [value, setValue] = useState<CreateWalletDTO>({ currency: "NGN" })
  const createWallet = useCreateWallet()
  const navigate = useNavigate()

  const submit = async () => {
    if (!value.currency) return

    await createWallet.mutateAsync(value.currency)
    navigate('/')
  }

  return (
    <section className="pt-20 grid gap-12">
      <div className="flex justify-center">
        <GuyLogo showText />
      </div>
      <section className="grid gap-6">
        <div className="flex flex-col items-center">
          <h1 className="text-center text-2xl font-semibold">Create your wallet</h1>
          <small className="text-center text-muted-foreground">Start by selecting your currency</small>
        </div>
        <div className="max-w-xl w-full mx-auto grid gap-6">
          <CreateWalletCard className="w-full" value={value} onValueChange={setValue} />
          <div className="flex justify-end">
            <Button disabled={!value.currency} onClick={submit} aria-disabled={createWallet.status === "pending"}>
              {createWallet.status === "pending" && <Spinner className="w-4 h-4 mr-2 text-primary-foreground" />}
              Continue
            </Button>
          </div>
        </div>
      </section>
    </section>
  )
}
