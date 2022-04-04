const xa = require('xfarr-api')
let handler = async(m, { conn, usedPrefix, args, command }) => {
  if (!args[0]) throw `Masukkan URL Facebook yang ingin di download!\n\nContoh: ${usedPrefix + command} https://www.facebook.com/100009307660961/videos/2850837675236460/`
  let result = await xa.Facebook(args[0])
  conn.sendFile(m.chat, result.medias[1].url, '', watermark, m)
}
handler.help = ['fb'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^f((b|acebook)(dl|download)?(er)?)$/i
module.exports = handler