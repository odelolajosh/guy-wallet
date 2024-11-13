import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Wallet } from "./types";

const getWallets = async () => {
  const response = await axios.get("/wallets") as { wallets: Wallet[] };
  return response.wallets;
}

export const useWallets = () => (
  useQuery({
    queryKey: ["wallets"],
    queryFn: () => getWallets(),
    refetchInterval: 10 * 1000,
  })
)