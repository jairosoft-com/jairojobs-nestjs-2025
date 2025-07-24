import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';

interface NotificationData {
  email: string;
  userId?: string;
  resetToken?: string;
}

@Processor('notifications')
export class NotificationsProcessor extends WorkerHost {
  private readonly logger = new Logger(NotificationsProcessor.name);

  process(job: Job<NotificationData>): Promise<{ success: boolean }> {
    this.logger.log(`Processing job ${job.id} of type ${job.name}`);

    switch (job.name) {
      case 'welcome-email':
        if (job.data.userId) {
          this.handleWelcomeEmail({
            email: job.data.email,
            userId: job.data.userId,
          });
        }
        break;
      case 'password-reset':
        if (job.data.resetToken) {
          this.handlePasswordReset({
            email: job.data.email,
            resetToken: job.data.resetToken,
          });
        }
        break;
      default:
        this.handleGenericNotification(job.name, job.data);
    }

    return Promise.resolve({ success: true });
  }

  private handleWelcomeEmail(data: { email: string; userId: string }) {
    this.logger.log(`Sending welcome email to ${data.email}`);
    // Implement email sending logic here
    // For now, just logging
  }

  private handlePasswordReset(data: { email: string; resetToken: string }) {
    this.logger.log(`Sending password reset email to ${data.email}`);
    // Implement password reset email logic here
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleGenericNotification(type: string, data: NotificationData) {
    this.logger.log(`Handling notification of type: ${type}`);
    // Implement generic notification handling
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    this.logger.error(
      `Job ${job.id} of type ${job.name} failed with error: ${error.message}`,
      error.stack,
    );
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    this.logger.log(`Job ${job.id} of type ${job.name} completed successfully`);
  }
}
