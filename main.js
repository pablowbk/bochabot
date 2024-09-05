const { Client, LocalAuth } = require('whatsapp-web.js');
const qrCode = require('qrcode-terminal');
const { commands } = require('./commands');

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
    console.log(`Executing command: ${command}`);
    await commands[command].fn(message, IS_PROD, client);
  } else {
    console.log({ command });
    await message.reply(
      (IS_PROD ? '' : test_text) +
      'No entiendo ese comando.\nEnvía *AYUDA* para ver una lista de comandos disponibles.'
    );
  }
});

client.initialize();
