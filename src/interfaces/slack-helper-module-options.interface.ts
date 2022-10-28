import { SlackChannelConfig } from './slack-channel.interface';

export interface SlackHelperModuleOptions {
  appEnv: string;
  channels: SlackChannelConfig;
}
