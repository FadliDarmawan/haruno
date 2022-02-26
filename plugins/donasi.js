let fetch = require('node-fetch')
let handler = async (m, { conn }) => await conn.sendButtonLoc(m.chat, await (await fetch(thumbfoto)).buffer(), `
┌〔 Donasi • Emoney 〕
├ GoPay: 6281775251705
├ OVO: 6281339888334
├ Dana: 6283188095488
├ Pulsa (XL): 6281237161519
└────
`.trim(), watermark, 'Menu', '.menu', m)
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler
