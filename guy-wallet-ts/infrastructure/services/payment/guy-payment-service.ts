import { IConfiguration } from "@/infrastructure/config/interfaces"
import express from "express"
import { createServer, Server } from "http"
import morgan from "morgan"

interface ITransfer {
  status: "completed" | "failed" | "pending"
  amount: number
  currency: string
  verified: boolean
  reference: string
  reason?: string
  senderBankName: string
  senderAccountNumber: string
  senderAccountName: string
  receiverBankName: string
  receiverAccountNumber: string
  receiverAccountName: string
  createdAt?: Date
  updatedAt?: Date
}

export class GuyPaymentService {
  private server: Server
  private app: express.Application
  private port: number
  
  private webhook: string;
  private transfers = new Map<string, ITransfer>()

  constructor(configuration: IConfiguration) {
    this.port = parseInt(configuration.get("GUY_PAYMENT_PORT"))
    this.webhook = configuration.get("GUY_PAYMENT_WEBHOOK")
    this.app = express();
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(morgan(function (tokens, req, res) {
      return [
        '[Guy Payment Service]',
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens['response-time'](req, res), 'ms'
      ].join(' ')
    }))

    this.app.post("/virtual-accounts", this.createVirtualAccount.bind(this));
    this.app.post("/transfer", this.initiateTransfer.bind(this));
    this.app.get("/transfer/verify/:reference", this.verifyTransfer.bind(this));
    
    this.server = createServer(this.app)
  }

  start() {
    this.server.listen(this.port, () => {
      this.log(`Running on port ${this.port}`)
    })
  }

  close() {
    this.server.close(() => {
      this.log("stopped!")
    })
  }

  async createVirtualAccount(request: express.Request, response: express.Response) {
    const accountNumber = `123456${Math.floor(Math.random() * 10000)}`;
    const bankName = "Guy Bank";
    const reference = `guy-ref-${Date.now()}`;

    response.json({
      status: "success",
      accountNumber,
      bankName,
      reference
    });
  }

  async initiateTransfer(request: express.Request, response: express.Response) {
    const { amount, currency, reference, receiverAccountName, receiverAccountNumber, receiverBankName } = request.body;
    this.log(`Processing payment of ${amount} ${currency} with reference ${reference}`);

    if (this.transfers.has(reference)) {
      response.status(400).json({
        status: "failed",
        data: {
          reason: "Duplicate reference"
        }
      })
      return
    }

    const success = Math.random() > 0.2 // 80% chance of success
    const transferCode = `guy-tx-${Date.now()}`
    const transfer = {
      status: success ? "completed" : "failed",
      amount,
      currency,
      verified: success,
      reference,
      senderBankName: "Guy Bank",
      senderAccountNumber: "1234567890",
      senderAccountName: "Guy Payment Service",
      receiverBankName,
      receiverAccountNumber,
      receiverAccountName,
    } as ITransfer

    this.transfers.set(reference, transfer)

    response.json({
      status: success ? "success" : "failed",
      data: {
        amount: transfer.amount,
        currency: transfer.currency,
        reason: !success ? "Insufficient funds" : undefined,
        transfer_code: transferCode,
      }
    })

    await this.notifyWebhook(transfer)
  }

  async verifyTransfer(request: express.Request, response: express.Response) {
    const { reference } = request.params
    const transfer = this.transfers.get(reference)

    if (!transfer) {
      response.status(404).json({
        status: "failed",
        data: {
          reason: "Transfer not found"
        }
      })
      return
    }

    response.json({
      status: "success",
      data: {
        amount: transfer.amount,
        currency: transfer.currency,
        verified: transfer.verified,
        reference
      }
    })
  }

  private async notifyWebhook(transfer: ITransfer) {
    if (!this.webhook) {
      return
    }

    const payload = { transfer }

    const response = await fetch(this.webhook, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (!response.ok) {
      throw new Error("Failed to notify webhook")
    }

    this.log("Webhook notified")
  }

  private log(message: string) {
    console.log(`[Guy Payment Service] ${message}`)
  }
}
