import { Logger } from '@nestjs/common';
import { SlackChannelConfig } from './slack-channel.interface';

export interface SlackHelperModuleOptions {
  appEnv: string;
  channels: SlackChannelConfig;
  logger?: Partial<Logger>;
}
