var xa = require('xfarr-api')
let fetch = require('node-fetch')
let handler = async(m, { conn, usedPrefix, args, command }) => {
    if (!args[0]) throw `Harap masukkan URL Youtube!\n\n${usedPrefix + command} https://youtu.be/vRPCAAUBMms <360/720>\n360 untuk resolusi 360p dan 720 untuk resolusi 720p. secara default bot akan mengirimkan video dengan resolusi 720p. Fitur ini dapat digunakan untuk mendownload youtube shorts.`
    if (args[1] === '360') {
        m.reply(wait)
        let data = await xa.Youtube(args[0])
        await conn.sendFile(m.chat, data.medias[1].url, `${data.title}` + '.mp4', `Judul: ${data.title}\nDurasi: ${data.duration}\nResolusi: 360p\n\n${watermark}`.trim(), m)
    } else if (!args[1] || args[1] === '720') {
        m.reply(wait)
        let data = await xa.Youtube(args[0])
        await conn.sendFile(m.chat, data.medias[2].url, `${data.title}` + '.mp4', `Judul: ${data.title}\nDurasi: ${data.duration}\n\n${watermark}`.trim(), m)
    } 
}
handler.help = ['ytdl <URL>']
handler.command = /^ytdl$/i
module.exports = handler