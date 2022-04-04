const { MessageType } = require('@adiwajshing/baileys')
const { sticker } = require('../lib/sticker')
const uploadFile = require('../lib/uploadFile')
const uploadImage = require('../lib/uploadImage')
let { webp2png } = require('../lib/webp2mp4')
let handler = async (m, { conn, text }) => {
  let stiker = false
  try {
    let [packname, ...author] = text.split`|`
    author = (author || []).join`|`
    let q = m.quoted ? m.quoted : m
    let mime = m.quoted.mimetype || ''
    if (/webp/.test(mime)) {
      let img = await q.download()
      let out = await webp2png(img)
      if (!img) throw `Reply sticker dengan caption ${usedPrefix + command} <packname>|<author>\n\nContoh: ${usedPrefix + command} Haruno|Fadli`
      stiker = await sticker(0, out, packname || '', author || '')
    } else if (/image/.test(mime)) {
      let img = await q.download()
      let link = await uploadImage(img)
      if (!img) throw `Reply gambar dengan caption ${usedPrefix + command} <packname>|<author>\n\nContoh: ${usedPrefix + command} Haruno|Fadli`
      stiker = await sticker(0, link, packname || '', author || '')
    } else if (/video/.test(mime)) {
      if ((q.msg || q).seconds > 11) throw 'Durasi maksumal sgif 10 detik!'
      let img = await q.download()
      let link = await uploadFile(img)
      if (!img) throw `Reply video dengan caption ${usedPrefix + command} <packname>|<author>\n\nContoh: ${usedPrefix + command} Haruno|Fadli`
      stiker = await sticker(0, link, packname || '', author || '')
    }
  } finally {
    if (stiker) await conn.sendMessage(m.chat, stiker, MessageType.sticker, {
      quoted: m
    })
    else throw `Reply sticker dengan caption ${usedPrefix + command} <packname>|<author>\n\nContoh: ${usedPrefix + command} Haruno|Fadli`
  }
}
handler.help = ['wm <packname>|<author>']
handler.tags = ['sticker']
handler.command = /^wm$/i

handler.limit = true

module.exports = handler