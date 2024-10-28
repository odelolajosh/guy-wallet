import { IQueue } from "@/application/queue/queue-interface";
import { Queue, QueueOptions, RedisConnection } from "bullmq";

/**
 * @class BullQueue
 * A queue implementation using BullMQ
 */
export class BullQueue<T> implements IQueue<T> {
  private queue: Queue<T>;

  constructor(name: string, options?: QueueOptions) {
    this.queue = new Queue(name, options);
  }

  async enqueue(jobName: string, data: T): Promise<void> {
    await this.queue.add(jobName, data);
  }
}
