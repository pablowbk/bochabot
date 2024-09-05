const { Client, LocalAuth } = require('whatsapp-web.js');
const qrCode = require('qrcode-terminal');
const { getSheetData } = require('./sheets-api');
const { commands, getTable } = require('./commands');

const IS_PROD = process.env.ENV === 'prod';
const test_text = '[Test] ';

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', qr => {
  qrCode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message_create', async message => {
  const chat = await message.getChat();
  if (chat.name !== 'BochaBot') return;

  if (!IS_PROD && message.body.startsWith(test_text.trim())) {
    console.log('deberías obviar esto');
    return;
  } // debug TEST

  console.log('chat', chat);
  const command = message.body.trim().toLowerCase();

  if (commands[command]) {
    await commands[command](message, IS_PROD);
  } else {
    console.log({ command });
    await chat.sendMessage(
      (IS_PROD ? '' : test_text) +
        'No entiendo ese comando. Envía !ayuda para ver una lista de comandos disponibles.'
    );
  }
});

client.initialize();
