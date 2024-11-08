import { TransactionsCard } from "@/components/transactions-card";
import { WalletCard } from "@/components/wallet-card";

export const Wallet = () => {
  return (
    <div>
      <section className="py-4">
        <h1 className="text-2xl">Wallet</h1>
        <small className="text-muted-foreground text-sm">
          Manage your wallet and transactions.
        </small>
      </section>
      <section className="grid gap-2">
        <div className="max-w-full w-128">
          <WalletCard />
        </div>
        <div>
          <TransactionsCard />
        </div>
      </section>
    </div>
  )
}