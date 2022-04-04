let yts = require('yt-search')
let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Harap masukkan query yang ingin dicari!\n\nContoh: ${usedPrefix + command} video protes tiananmen square 1989`
  let results = await yts(text)
  let teks = results.all.map(v => {
    switch (v.type) {
      case 'video': return `
Judul: ${v.title}
Link: ${v.url}
Durasi: ${v.timestamp}
Diupload: ${v.ago}
Penonton: ${v.views}
      `.trim()
      case 'channel': return `
Nama: ${v.name}
Link: ${v.url}
Subscriber: ${v.subCountLabel} (${v.subCount})
Video: ${v.videoCount}
`.trim()
    }
  }).filter(v => v).join('\n────────────────────\n')
  m.reply(teks)
}
handler.help = ['', 'earch'].map(v => 'yts' + v + ' <pencarian>')
handler.tags = ['internet']
handler.command = /^yts(earch)?$/i
