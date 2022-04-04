let { spawn } = require('child_process');
let handler = async (m, { conn }) => {
  if (!process.send) throw 'Dont: node main.js\nDo: node index.js'
  if (global.conn.user.jid == conn.user.jid) {
    await m.reply('Sedang merestart bot...')
    await global.db.write()
    process.send('reset')
  } else throw 'Error. Tempat run tidak mendukung fitur debounce.'
}
handler.help = ['debounce' + (process.send ? '' : ' (Tidak Bekerja)')]
handler.tags = ['host']
handler.command = /^debounce$/i
handler.owner = true
module.exports = handler

