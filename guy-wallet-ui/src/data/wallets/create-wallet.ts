import axios from "@/lib/axios";
import { Wallet } from "./types";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";

export const createWallet = async (currency: string) => {
  const response = await axios.post("/wallets", { currency }) as { wallet: Wallet };
  return response.wallet;
}

export const useCreateWallet = () => (
  useMutation({
    mutationFn: (currency: string) => createWallet(currency),
    onSuccess: (newWallet) => {
      queryClient.cancelQueries({
        queryKey: ["wallets"]
      });
      queryClient.setQueryData(["wallets"], newWallet);
      queryClient.invalidateQueries({
        queryKey: ["wallets"]
      });
    }
  })
)