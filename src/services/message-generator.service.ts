import { KnownBlock } from '@slack/types';
import { GenerateExceptionMessageBO } from 'src/bo/generate-exception-message.bo';

export class MessageGeneratorService {
  /**
   * generates exception message
   */
  static generateExceptionMessage(
    data: GenerateExceptionMessageBO,
  ): KnownBlock[] {
    const blocks = [];

    blocks.push({
      type: 'header',
      text: {
        type: 'plain_text',
        text: `${data.appEnvironment.toUpperCase()} - 🚨 ${data.type.toUpperCase()} 🚨`,
        emoji: true,
      },
    });

    if (data.request.id) {
      const section = {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*REQUEST ID:* ${data.request.id}`,
        },
      };

      blocks.push(section);
    }

    if (data.request.method) {
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*REQUEST METHOD:* ${data.request.method}`,
        },
      });
    }

    if (data.request.url) {
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*REQUEST URL:* ${data.request.url}`,
        },
      });
    }

    if (data.request.body) {
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*REQUEST BODY:* ${data.request.body}`,
        },
      });
    }

    blocks.push({
      type: 'divider',
    });

    blocks.push(
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: `MESSAGE ℹ️ `,
          emoji: true,
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'plain_text',
            text: data.exception['message'] || data.exception,
            emoji: true,
          },
        ],
      },
      {
        type: 'divider',
      },
    );

    blocks.push(
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: 'STACKTRACE 📜',
          emoji: true,
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'plain_text',
            text: data.exception['stack']
              ? data.exception['stack']
              : 'No stacktrace',
            emoji: true,
          },
        ],
      },
      {
        type: 'divider',
      },
    );

    return blocks;
  }
}
