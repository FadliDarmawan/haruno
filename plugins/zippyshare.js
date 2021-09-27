let fetch = require('node-fetch')
let handler = async(m, { conn, usedPrefix, command, text }) => {
    if (!text) throw `Masukkan link zippyshare yang valid, contoh: ${usedPrefix + command}https://www21.zippyshare.com/v/POMItvPI/file.html`
    let res = await fetch(global.API('lolhum', '/api/zippyshare', { url: text }, 'apikey'))
    if (!res.ok) throw await res.text()
    if (!res.ok) m.reply(error)
    let json = await res.json()
    let wm = global.watermark
    let caption = `
File Detail
Name: ${json.result.name_file}
Size: ${json.result.size}
Date: ${json.result.date}
`.trim()
    m.reply(caption)
    conn.sendFile(m.chat, `${json.result.download_url}`, `${name_file}`, '', m)
}
handler.help = ['zippyshare']
handler.tags = ['downloader']
handler.command = /^zippyshare$/i
module.exports = handler