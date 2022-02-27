let fetch = require('node-fetch')
const zsExtract = require('zs-extract')
let handler = async(m, { conn, usedPrefix, args, command }) => {
    if (!args[0]) throw `Harap masukkan URL Zippyshare yang ingin di download!\n\nContoh: ${usedPrefix + command} https://www96.zippyshare.com/v/Sw73EZBH/file.html`
    let info = await zsExtract.extract(args[0])
    console.log(info)
    await conn.reply(m.chat, `Filename: ${info.filename}\nLink download: ${info.download}\n\nNote: Untuk mengirim dalam format document dan media masih belum tersedia.\n${watermark}`, m)
    // await conn.sendFile(m.chat, info.download, info.filename, watermark, m, false, { asDocument: true })
}
handler.help = ['zippyshare <url>']
handler.tags = ['downloader']
handler.command = /^(zs|zippyshare|zd)$/i
module.exports = handler
