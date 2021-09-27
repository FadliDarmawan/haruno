let fetch = require('node-fetch')
let handler = async(m, { conn, text, usedPrefix, command }) => {
    if(!text) throw `Masukkan URL yang valid, contoh: ${usedPrefix + command}https://vt.tiktok.com/ZSwWCk5o/`
    m.reply(wait)
    let res = await fetch(global.API('lolhum', '/api/tiktok', { url: text }, 'apikey'))
    if (!res.ok) throw await res.text()
    if (!res.ok) m.reply(error)
    let json = await res.json()
    let wm = global.watermark
    let caption = `
Video Description
${json.result.titile}
${json.result.keywords}
${json.result.description}

Author Description
Username: ${json.result.author.username}
Nickname: ${json.result.author.nickname}
${wm}
`.trim()
    conn.sendFile(m.chat, `${json.result.link}`, 'Tiktok.mp4', caption, m)
}
handler.help = ['tiktok <url>']
handler.tags = ['downloader']
handler.command = /^tiktok$/i
module.exports = handler
// Haruno