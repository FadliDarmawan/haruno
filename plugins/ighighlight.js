let fetch = require('node-fetch')
let moment = require('moment-timezone')
let handler = async(m, { conn, usedPrefix, args, command }) => {
    if(!args[0]) throw `Harap masukkan username Instagram yang ingin di download highlight.\n\nContoh: ${usedPrefix + command} nyancat.re`
    let res = await fetch(global.API('neoxr', '/api/igh', {q: args[0]}, 'apikey'))
    let hako = await res.json()
    let rows = []
    hako.data.forEach((v, i)=> {
        rows.push({
          title: v.title,
          description: `Silahkan pilih highlight yang ingin di download.`,
          rowId: `${usedPrefix}highlight ${args[0]} ${v.id}`
        })
      })
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
              "rows": rows,
            "title": "Highlights Downloader"
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