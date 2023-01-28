import type { Handler } from '@netlify/functions';
import { Telegraf } from 'telegraf';

const app = new Telegraf(process.env.BOT_TOKEN);

type Payload = {
  company: string;
  name: string;
  contact: string;
  salaryRange: string;
  desc: string;
};

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export const handler: Handler = async event => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({ message: 'Successful preflight call.' }),
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 400,
      body: 'You are not using a http POST method for this endpoint.',
      headers: {
        Allow: 'POST',
      },
    };
  }

  const payload = JSON.parse(event.body) as Payload;

  let offer = `*Company:* ${payload.company}\n`;
  offer += `*Name:* ${payload.name}\n`;
  offer += `*Contact:* ${payload.contact}\n`;
  offer += `*Salary Range:* ${payload.salaryRange}\n`;
  offer += `*Description:* ${payload.desc}`;

  await app.telegram.sendMessage(
    process.env.BOT_CHAT_ID,
    offer.replace(/[-.+?^$[\](){}\\=]/g, '\\$&'),
    {
      parse_mode: 'MarkdownV2',
    }
  );

  return {
    headers,
    statusCode: 200,
    body: JSON.stringify({ status: 'ok' }),
  };
};
