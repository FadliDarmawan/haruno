let fetch = require('node-fetch')
let moment = require('moment-timezone')
let handler = async(m, { conn, usedPrefix, args, command }) => {
    if(!args[0]) throw `Harap masukkan username Instagram yang ingin di download highlight`
    let res = await fetch(global.API('neoxr', '/api/igh', {q: args[0]}, 'apikey'))
    let hako = await res.json()
    let teks = hako.data.map((v, i) => `{“title”: ${v.title}, “description”: "Pilih untuk mendownload.", “rowId”: ${usedPrefix}ighed ${args[0]} ${v.id}}`).join(', ')
    let name = conn.getName(m.sender)
    conn.relayWAMessage(conn.prepareMessageFromContent(m.chat, {
        "listMessage": {
          "title": `${ucapan()}, ${name}`.trim(),
          "description": `Silahkan pilih highlight dari akun *${args[0]}* untuk di download.`,
          "footerText": "Silahkan tekan tombol \"Click Here\" untuk melihat list highlight.",
          "buttonText": "Click Here",
          "listType": "SINGLE_SELECT",
          "sections": [
            {
              "rows": [`${teks}`],
            "title": "Informasi Bot"
        }
    ], "contextInfo": {
        "stanzaId": m.key.id,
        "participant": m.sender,
        "quotedMessage": m.message
      }
    }
  }, {}), { waitForAck: true })
}
handler.help = ['ighighlight <username>']
handler.tags = ['downloader']
handler.command = /^igh|ighighlight$/i
module.exports = handler

function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH')
    res = "Selamat dinihari"
    if (time >= 4) {
      res = "Selamat pagi"
    }
    if (time > 10) {
      res = "Selamat siang"
    }
    if (time >= 15) {
      res = "Selamat sore"
    }
    if (time >= 18) {
      res = "Selamat malam"
    }
    return res
  }