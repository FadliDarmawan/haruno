let fetch = require('node-fetch')
const uploadFile = require('../lib/uploadFile')
let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Reply audio dengan caption #judul'
  let media = await q.download()
  let url = await uploadFile(media)
  let res = await fetch(global.API('zeks', '/api/searchmusic', { audio: url }, 'apikey'))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  let caption = `
Lagu Ditemukan!
Judul: ${json.data.title}
Artists: ${json.data.artist}
Genre: ${json.data.genre}
Album: ${json.data.album}
Realese Date: ${json.data.relese_date}
Note: Hasil dari api.zeks.xyz. Hasil bisa tidak akurat.
©Haruno
`.trim()
    conn.reply(m.chat, caption, m)
}
handler.tags = ['internet']
handler.help = ['judul <reply audio>']
handler.command = /^judul$/i
module.exports = handler