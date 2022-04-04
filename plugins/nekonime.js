let fetch = require('node-fetch')
let handler = async(m, { conn }) => {
    let res = 'https://nekos.life/api/neko'
    if(!res.ok) await conn.sendButtonImg(m.chat, await(await fetch(internal)).buffer(), 'Sorry for the error. Report it?', watermark, 'Report', '.report cuddle.js', m)
    await conn.sendFile(m.chat, res.neko, '', watermark, m)
}
handler.command = /^nekonime$/i
handler.tags = ['anime']
handler.help = ['nekonime']
module.exports = handler