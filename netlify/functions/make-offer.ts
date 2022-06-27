import { Handler } from '@netlify/functions';
import { Telegraf } from 'telegraf';

const CHAT_ID = 795507995;

const app = new Telegraf(process.env.BOT_TOKEN);

type DataT = {
  fullname: string
}

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
};

const handler: Handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Successful preflight call.' })
    };
  }
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 400,
      body: 'You are not using a http POST method for this endpoint.',
      headers: {
        'Allow': 'POST'
      }
    };
  }
  const data: DataT = JSON.parse(event.body);

  let offer = `*Full name:* ${data.fullname}\n`;

  await app.telegram.sendMessage(
    CHAT_ID,
    offer.replace(/[-.+?^$[\](){}\\=]/g, '\\$&'),
    {
      parse_mode: 'MarkdownV2'
    });

  return {
    headers,
    statusCode: 200,
    body: JSON.stringify({ status: 'ok' })
  };
};

export { handler };
