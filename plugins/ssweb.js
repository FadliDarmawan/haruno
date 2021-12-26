let fetch = require('node-fetch')
let handler = async (m, { usedPrefix, conn, command, args }) => {
  let full = /f$/i.test(command)
  if (!args[0]) throw `Harap masukkan URL yang ingin di screenshot!\n\nContoh: ${usedPrefix + command} https://nekopoi.care`
  let url = /https?:\/\//.test(args[0]) ? args[0] : 'https://' + args[0]
  let ss = await (await fetch(global.API('nrtm', '/api/ssweb', { delay: 1000, url, full }))).buffer()
  conn.sendFile(m.chat, ss, 'screenshot.png', url, m, 0, { thumbnail: ss })
}
handler.help = ['ss', 'ssf'].map(v => v + ' <url>')
handler.tags = ['internet']
handler.command = /^ss(web)?f?$/i
module.exports = handler

