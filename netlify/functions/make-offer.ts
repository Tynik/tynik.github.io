import { Handler } from '@netlify/functions';
import { Telegraf } from 'telegraf';

const app = new Telegraf(process.env.BOT_TOKEN);

type DataT = {
  company: string;
  name: string;
  contact: string;
  salaryRange: string;
  desc: string;
};

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

const handler: Handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
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
  const data = JSON.parse(event.body) as DataT;

  let offer = `*Company:* ${data.company}\n`;
  offer += `*Name:* ${data.name}\n`;
  offer += `*Contact:* ${data.contact}\n`;
  offer += `*Salary Range:* ${data.salaryRange}\n`;
  offer += `*Description:* ${data.desc}`;

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

export { handler };
