const { getSheetData } = require('./sheets-api');

const test_text = '[Test] ';

const tableRange = 'Hoja 1!A1:C6'

const commands = {
  'tabla': {
    fn: getTable,
    label: 'Tabla',
    description: 'Muestra la tabla de posiciones.'
  },
  'ayuda': {
    fn: showHelp,
    label: 'Ayuda',
    description: 'Muestra los comandos disponibles.'
  },
};

function showHelp(message, IS_PROD = false) {
  const commandList = Object.keys(commands).map(cmd => `*${commands[cmd].label}*: ${commands[cmd].description || 'No description'}`).join('\n');
  message.reply((IS_PROD ? '' : test_text) + `Aquí están los comandos disponibles:\n\n${commandList}`);
}

async function getTable(message, IS_PROD = false) {
  try {

    const sheetData = await getSheetData(tableRange);
    const rows = sheetData.split('\n');
  
    // Asume que la primera fila es el encabezado
    const header = rows[0].split(' | ');
    const data = rows.slice(1);
  
    const escapedBackTicks = '\`\`\`';
  
    // Formatea el encabezado
    const headerLine = header.map(col => `*${col.trim()}*`).join(' | ');
  
    // Formatea los datos
    const dataLines = data.map(row => row.split(' | ').map(col => col.trim()).join(' | ')).join('\n');
  
    // Combina el encabezado y los datos
    const formattedMessage = (IS_PROD ? '' : '[Test] ') + `\n${escapedBackTicks}${headerLine}\n${dataLines}${escapedBackTicks}`;
  
    message.reply(formattedMessage);
  } catch (error) {
    console.error(error);
    message.reply((IS_PROD ? '' : test_text) + 'No se pudo obtener la tabla de posiciones. Avisar al profe.');
  }
}

module.exports = { commands, getTable }


// Machete de formato:
// const boldText = '*Texto en negrita*';
// const italicText = '_Texto en cursiva_';
// const strikethroughText = '~Texto tachado~';
// const monospaceText = '```Texto monoespaciado```';
