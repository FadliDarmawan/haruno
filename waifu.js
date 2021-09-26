let fetch = require('node-fetch')
let handler = async(m, { conn, args, usedPredix, command }) => {
    let res = await fetch('https://api.waifu.pics/sfw/waifu')
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.url) throw 'Error!'
    if (args[0] == '--help') await conn.send2Button(m.chat, `
Feature support
query: ${usedPredix + command}

Fitur ini adalah fitur untuk mendapatkan foto waifu secara random.
Penggunaan: *${usedPredix + command}*

Fitur ini menggunakan limit, upgrade menjadi user premium untuk menggunakan tanpa batasan limit.`.trim(), watermark, '🔍Search WAIFU', '.waifu', '⭐Premium', '.premium', m)
    if (!args[0]) await conn.sendButtonImg(m.chat, await(await fetch(json.url)).buffer(), 'WAIFU image', watermark, '🔍Search WAIFU', '.waifu', m)
}
handler.help = ['waifu']
handler.tags = ['internet']
handler.command = /^waifu$/i
module.export = handler