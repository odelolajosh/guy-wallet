type CreatePaymentPartyParams = {
  type: "wallet" | "bank"
  walletId?: string
  bankName?: string
  accountNumber?: string
  accountName?: string
}

/**
 * Payment party represents a party in a payment transaction.
 * It can be a bank account or a wallet.
 */
export class PaymentParty {
  type: "wallet" | "bank";
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  walletId?: string;

  constructor(type: "wallet", id: string);
  constructor(type: "bank", id: string, accountNumber: string, accountName: string);
  constructor(type: "wallet" | "bank", id: string, accountNumber?: string, accountName?: string) {
    this.type = type;
    if (type === "bank") {
      this.bankName = id;
      this.accountNumber = accountNumber!;
      this.accountName = accountName!;
    } else {
      this.walletId = id;
    }
  }

  static create({
    type,
    walletId,
    bankName,
    accountNumber,
    accountName
  }: CreatePaymentPartyParams): PaymentParty {
    if (type === "bank") {
      return new PaymentParty("bank", bankName!, accountNumber!, accountName!)
    } else {
      return new PaymentParty("wallet", walletId!)
    }
  }
}
