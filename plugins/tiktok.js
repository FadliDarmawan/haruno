const xa = require('xfarr-api')
let fetch = require('node-fetch')
let handler = async(m, { conn, usedPrefix, args, command }) => {
    if(!args[0]) throw `Harap masukkan URL sebagai parameter!\n\nContoh: ${usedPrefix + command} https://vt.tiktok.com/ZSe5pocWX/`
    xa.Tiktok(args[0])
    .then(async data => { 
        await conn.sendFile(m.chat, data.medias[2].url, 'tiktok.mp3', null, m)
        await conn.sendFile(m.chat, data.medias[1].url, 'tiktok.mp4', watermark, m) 
    })
}
handler.command = /^(tiktok|tk|tkdl|td)$/i
handler.tags = ['downloader']
handler.help = ['tiktok <url>']
module.exports = handler