import { Module } from '@nestjs/common';
import { SlackService } from 'nestjs-slack';
import { PublishUnidentifiedExceptionListener } from './listeners/publish-unidentified-exception.listener';
import { ConfigurableModuleClass } from './slack-helper.module-definition';

@Module({
  imports: [],
  controllers: [],
  providers: [PublishUnidentifiedExceptionListener, SlackService],
  exports: [PublishUnidentifiedExceptionListener],
})
export class SlackHelperModule extends ConfigurableModuleClass {}
