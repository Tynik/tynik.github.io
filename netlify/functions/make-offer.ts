import type { Handler } from '@netlify/functions';

import { createResponse, getTelegrafClient } from '../netlify.helpers';

type Payload = {
  company: string;
  name: string;
  contact: string;
  salaryRange: string;
  desc: string;
};

export const handler: Handler = async event => {
  if (event.httpMethod === 'OPTIONS') {
    return createResponse({ message: 'Successful preflight call.' });
  }

  if (event.httpMethod !== 'POST') {
    return createResponse('You are not using a http POST method for this endpoint.', {
      statusCode: 400,
      allowMethods: ['POST', 'OPTIONS'],
    });
  }

  const botChatId = process.env.BOT_CHAT_ID;

  if (!botChatId) {
    throw new Error('BOT_CHAT_ID environment variable should be set');
  }

  const payload = JSON.parse(event.body) as Payload;

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

  return createResponse(
    { status: 'ok' },
    {
      allowMethods: ['POST', 'OPTIONS'],
    }
  );
};
