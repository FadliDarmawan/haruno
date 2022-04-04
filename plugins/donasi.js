let fetch = require('node-fetch')
let handler = async (m, { conn }) => {
let pp = await(await fetch(image)).buffer()
await conn.reply(m.chat, `
┌〔 Donasi • Emoney 〕
├ GoPay: 628112958665
├ OVO: 628112958665
├ Dana: 628112958665
├ Pulsa (XL): 6281943265086
└────
`.trim(), m, { contextInfo: {
    externalAdReply: {
      sourceUrl: 'https://youtu.be/-tKVN2mAKRI',
      title: 'Donasi',
      body: 'Haruno Bot',
      thumbnail: pp
    }
}})
}
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler