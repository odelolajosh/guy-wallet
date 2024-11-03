import { ExpenseRatioCard } from "@/components/expense-ratio-card";
import { SendAgainCard } from "@/components/send-again-card";
import { SpendingListCard } from "@/components/spending-list-card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { WalletCard } from "@/components/wallet-card";

export const Home = () => {
  return (
    <div>
      <section className="bg-neutral text-neutral-foreground px-6 py-4 pb-[120px] grid gap-4">
        <header>
          <SidebarTrigger />
        </header>
        <div>
          <h1 className="text-2xl">Dashboard</h1>
          <small className="text-muted-foreground text-sm">
            Send and receive money the guy way.
          </small>
        </div>
      </section>
      <section className="-mt-[100px] grid gap-2 px-6">
        <div className="grid lg:grid-cols-[2fr,3fr,1fr] gap-2">
          <WalletCard />
          <WalletCard />
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
