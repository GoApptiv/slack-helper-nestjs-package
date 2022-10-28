import { UnidentifiedExceptionRaisedEvent } from '@goapptiv/exception-handler-nestjs';
import { RestResponseErrorCode } from '@goapptiv/rest-response-nestjs';
import { Event } from '@goapptiv/exception-handler-nestjs/dist/constants/event.enum';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MessageGeneratorService } from 'src/services/message-generator.service';
import { GenerateExceptionMessageBO } from 'src/bo/generate-exception-message.bo';
import { MODULE_OPTIONS_TOKEN } from 'src/slack-helper.module-definition';
import { SlackHelperModuleOptions } from 'src/interfaces/slack-helper-module-options.interface';
import { SlackService } from 'nestjs-slack';
import { SlackHelperModule } from 'src/slack-helper.module';

@Injectable()
export class PublishUnidentifiedExceptionListener {
  private logger = new Logger(SlackHelperModule.name);
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: SlackHelperModuleOptions,
    private readonly slackService: SlackService,
  ) {}

  /**
   * process unidentified raised exception
   */
  @OnEvent(Event.UNIDENTIFIED_EXCEPTION, { async: true })
  async handleEvent(event: UnidentifiedExceptionRaisedEvent) {
    this.logger.log(`unidentified exception raised, publishing to slack`);

    const { appEnv, channels } = this.options;

    const data: GenerateExceptionMessageBO = {
      appEnvironment: appEnv,
      type: RestResponseErrorCode.E500_UNIDENTIFIED_INTERNAL_SERVER_ERROR,
      exception: event.exception,
      request: {
        id: event.req['id'],
        method: event.req.method,
        url: event.req.url,
      },
    };

    const message = MessageGeneratorService.generateExceptionMessage(data);

    await this.slackService.postMessage({
      channel: channels.exceptions,
      blocks: message,
    });

    this.logger.log(`exception published to slack`);
  }
}
