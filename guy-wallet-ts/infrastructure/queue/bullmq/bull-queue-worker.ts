import { IQueueJob, IQueueWorker, IQueueWorkerProcessor } from "@/application/queue/queue-interface";
import { Job, Worker, WorkerOptions } from "bullmq";

/**
 * @class BullQueueJob
 * A queue job implementation using BullMQ
 */
export class BullQueueJob<T> implements IQueueJob<T> {
  job: Job<T>;

  constructor(job: Job<T>) {
    this.job = job;
  }

  get name(): string {
    return this.job.name;
  }

  get data(): T {
    return this.job.data;
  }

  setProgress(progress: number): void {
    this.job.updateProgress(progress);
  }
}


/**
 * @class BullQueueWorker
 * A queue worker implementation using BullMQ
 */
export class BullQueueWorker<T> implements IQueueWorker<T> {
  private worker: Worker<T>;

  constructor(queueName: string, processor: IQueueWorkerProcessor<T>, opts?: WorkerOptions) {
    this.worker = new Worker(queueName, async (job: Job<T>) => {
      const queueJob = new BullQueueJob(job);
      await processor.process(queueJob);
    }, opts);

    this.worker.on('completed', async (job: Job<T>) => {
      const queueJob = new BullQueueJob(job);
      await processor.onCompleted(queueJob);
    });

    this.worker.on('failed', async (job: Job<T> | undefined, error: Error) => {
      const queueJob = job ? new BullQueueJob(job) : undefined;
      await processor.onFailed(error, queueJob);
    });
  }

  get isRunning(): boolean {
    return this.worker.isRunning();
  }

  async start(): Promise<void> {
    await this.worker.run();
  }

  async stop(): Promise<void> {
    await this.worker.close();
  }

  async pause(): Promise<void> {
    await this.worker.pause();
  }

  async resume(): Promise<void> {
    this.worker.resume();
  }
}
