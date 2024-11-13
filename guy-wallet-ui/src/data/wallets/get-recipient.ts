import { queryClient } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getBankRecipient = async (bankCode: string, accountNumber: string) => {
  const result = await axios.get('https://api.example.com/bank-recipient', {
    params: {
      bankCode,
      accountNumber
    }
  })
  return result
}

export const useBankRecipient = (bankCode?: string, accountNumber?: string) => (
  useQuery({
    queryKey: ['bank-recipient', bankCode, accountNumber],
    queryFn: async () => {
      const cachedResult = queryClient.getQueryData(['bank-recipient', bankCode, accountNumber])
      if (cachedResult) {
        return cachedResult
      }

      return getBankRecipient(bankCode!, accountNumber!)
    },
    enabled: !!bankCode && !!accountNumber
  })
)