import { IWalletService } from "@/application/wallet/wallet-interface";
import { beforeAll, describe, expect, it } from "vitest";
import { TestWalletRepository } from "../mocks/wallet-repository";
import { WalletService } from "@/application/wallet/wallet-service";
import { Currency } from "@/domain/common/money";
import { TestPaymentProvider } from "../mocks/test-payment-provider";

describe("WalletService", () => {
  let walletService: IWalletService

  beforeAll(() => {
    const walletRepository = new TestWalletRepository()
    const paymentProvider = new TestPaymentProvider()
    walletService = new WalletService(walletRepository, paymentProvider)
  })

  it("should create a new wallet", async () => {
    const userId = "user-id-1"
    const currency = Currency.USD
    const wallet = await walletService.createWallet(userId, currency)
    expect(wallet.userId).toEqual(userId)
    expect(wallet.balance.toNumber()).toEqual(0)
    expect(wallet.balance.currencyCode).toEqual(currency)
    expect(wallet.accountNumber).not.toBeNull()
    expect(wallet.bankName).not.toBeNull()
  })

  it("should get the wallet by id", async () => {
    const userId = "user-id-2"
    const currency = Currency.USD
    const wallet = await walletService.createWallet(userId, currency)
    const walletById = await walletService.getWalletById(wallet.id)
    expect(walletById).toEqual(wallet)
  })
})
