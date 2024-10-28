import { Payment } from "@/domain/payment/model";
import { IQueueJob, IQueueWorkerProcessor } from "../queue/queue-interface";

/**
 * @class PaymentProcessor
 * A queue worker processor for processing payments
 */
export class PaymentProcessor implements IQueueWorkerProcessor<Payment> {
  async process(job: IQueueJob<Payment>): Promise<void> {
    // process payment
  }

  async onCompleted(job: IQueueJob<Payment>): Promise<void> {
    // update payment status
  }

  async onFailed(error: Error, job?: IQueueJob<Payment>): Promise<void> {
    // handle failed payment
  }
}