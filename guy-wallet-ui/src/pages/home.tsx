import { ExpenseRatioCard } from "@/components/expense-ratio-card";
import { MoneyFlowCard } from "@/components/money-flow-card";
import { SendAgainCard } from "@/components/send-again-card";
import { SpendingListCard } from "@/components/spending-list-card";
import { WalletCard } from "@/components/wallet-card";

export const Home = () => {
  return (
    <div>
      <section className="py-4">
        <h1 className="text-2xl">Dashboard</h1>
        <small className="text-muted-foreground text-sm">
          Send and receive money the guy way.
        </small>
      </section>
      <section className="grid gap-2">
        <div className="grid lg:grid-cols-[2fr,3fr,1fr] gap-2">
          <WalletCard />
          <MoneyFlowCard />
          <ExpenseRatioCard />
        </div>
        <div className="grid lg:grid-cols-[3fr,2fr] gap-2">
          <SpendingListCard />
          <SendAgainCard />
        </div>
      </section>
    </div>
  )
}
