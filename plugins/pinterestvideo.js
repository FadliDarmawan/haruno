const { pin } = require('../lib/scrape')

let handler = async (m, { conn, args, usedPrefix, command }) => {

    if (!args[0]) throw `Harap masukkan URL Pinterest yang ingin di download!\n\nContoh: ${usedPrefix + command} https://id.pinterest.com/pin/267893877823775677/`
    if (!args[0].match(/https:\/\/.*pinterest.com\/pin|pin.it/gi)) throw `URL salah, url hanya untuk mendownload video pinterest!`

    pin(args[0]).then(async res => {
        let pin = JSON.stringify(res)
        let json = JSON.parse(pin)
        if (!json.status) throw `Tidak dapat diunduh`
        await m.reply(global.wait)
        await conn.sendFile(m.chat, json.data.url, '', watermark, m)
    })

}
handler.help = ['pinterestvideo'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^pint(erest)?v(ideo)?$/i

handler.limit = true

module.exports = handler