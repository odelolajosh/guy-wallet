
/**
 * Defines the queue interface
 */
export interface IQueue<T> {
  /**
   * Add a job to the queue
   * @param jobName The job name
   * @param data The data to be processed
   * @returns A promise that resolves when the job is added
   */
  enqueue(jobName: string, data: T): Promise<void>;
}

/**
 * Defines the queue worker interface
 * @typeparam T The type of data to be processed
 * @remarks This interface is used to define a queue worker that processes jobs
 */
export interface IQueueWorker<T> {
  /**
   * Indicates whether the queue worker is running
   * @remarks This is used to determine if the queue worker is currently processing jobs
   */
  isRunning: boolean;

  /**
   * Start the queue worker
   */
  start(): Promise<void>;

  /**
   * Stop the queue worker
   */
  stop(): Promise<void>;

  /**
   * Pause the queue worker
   */
  pause(): Promise<void>;

  /**
   * Resume the queue worker
   */
  resume(): Promise<void>;
}

/**
 * Defines the queue job interface
 * @typeparam T The type of data to be processed
 */
export interface IQueueJob<T> {
  /**
   * The job name
   * @remarks This is used to identify the job
   */
  name: string;

  /**
   * The data to be processed
   */
  data: T;

  /**
   * The progress of the job
   */
  setProgress(progress: number): void;
}

/**
 * Defines methods to handle the lifecycle of a queue worker]
 */
export interface IQueueWorkerProcessor<T> {
  /**
   * Called when a job is being processed
   * @param job The job to be processed
   * @returns A promise that resolves when the job is processed
   */
  process(job: IQueueJob<T>): Promise<void>;

  /**
   * Called when a job is completed
   * @param job The job that was completed
   * @returns A promise that resolves when the job is completed
   */
  onCompleted(job: IQueueJob<T>): Promise<void>;

  /**
   * Called when a job fails
   * @param error The error that caused the job to fail
   * @param job The job that failed
   * @returns A promise that resolves when the job failure is handled
   */
  onFailed(error: Error, job?: IQueueJob<T>): Promise<void>;
}
