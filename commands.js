const test_text = '[Test] ';

const commands = {
  '!ping': (message) => message.reply('pong'),
  '!tabla': getTable,
  '!ayuda': showHelp
};

function showHelp(message) {
  const commandList = Object.keys(commands).map(cmd => `${cmd}: ${commands[cmd].description || 'No description'}`).join('\n');
  message.reply(`Aquí están los comandos disponibles:\n${commandList}`);
}

function getTable(message, IS_PROD = false) {
  message.reply((IS_PROD ? '' : test_text) + 'aca debería mostrarse la tabla de clasificación');
}

module.exports = { commands, getTable }