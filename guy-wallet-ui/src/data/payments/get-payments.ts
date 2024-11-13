import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export type PaymentParty = {
  type: "wallet",
  walletId: string;
} | {
  type: "bank",
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  reason: string;
  from: PaymentParty;
  to: PaymentParty;
  reference: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const getPayments = async () => {
  const response = await axios.get('/payments') as { payments: Payment[] };
  return response.payments;
}

export const usePayments = () => (
  useQuery({
    queryKey: ['payments'],
    queryFn: () => getPayments(),
    refetchInterval: 10 * 1000,
  })
)