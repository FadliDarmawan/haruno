let fetch = require('node-fetch')
let handler = async(m, { conn, args, usedPrefix, command }) => {
    let img = image
    if (!args[0]) conn.sendFile(m.chat, image, '', `Harap masukkan tujuan dan nama file\nContoh: ${ usedPrefix + command } plugins/join.js`, m)
    require('fs').writeFileSync(`./${args[0]}`, m.quoted.text)
    conn.sendButtonImg(m.chat, await(await fetch(img)).buffer(), `Berhasil menyimpan sebagai ${args[0]}`, watermark, 'Menu', '.?', m)
}
handler.command = /^write$/i
handler.owner = true
module.exports = handler
