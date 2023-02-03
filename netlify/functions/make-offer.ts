import { createHandler, createResponse, getTelegrafClient } from '../netlify.helpers';

type Payload = {
  company: string;
  name: string;
  contact: string;
  salaryRange: string;
  desc: string;
};

export const handler = createHandler<Payload>(
  { allowMethods: ['POST', 'OPTIONS'] },
  async ({ payload }) => {
    if (!payload) {
      return createResponse('Payload is required', {
        statusCode: 400,
        allowMethods: ['POST', 'OPTIONS'],
      });
    }

    const botChatId = process.env.BOT_CHAT_ID;

    if (!botChatId) {
      throw new Error('BOT_CHAT_ID environment variable should be set');
    }

    let offer = `*Company:* ${payload.company}\n`;
    offer += `*Name:* ${payload.name}\n`;
    offer += `*Contact:* ${payload.contact}\n`;
    offer += `*Salary Range:* ${payload.salaryRange}\n`;
    offer += `*Description:* ${payload.desc}`;

    const telegrafClient = getTelegrafClient();

    await telegrafClient.telegram.sendMessage(
      botChatId,
      offer.replace(/[-.+?^$[\](){}\\=]/g, '\\$&'),
      {
        parse_mode: 'MarkdownV2',
      }
    );

    return null;
  }
);
