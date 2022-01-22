const nhentai = require('nhentai-node-api')
let moment = require('moment-timezone')
let fetch = require('node-fetch')
let handler = async(m, { conn, usedPrefix, text, command }) => {
    if(!text) throw `Harap masukkan query yang ingin di search!\n\nContoh: ${usedPrefix + command} Introvert Beauty Gets Raped Over and Over by Her Homeroom Tearcher`
    let doujin = await nhentai.search(text, 'popular-week', 1)
    let rows = []
    let img = await(await fetch('https://telegra.ph/file/62b64de68cac87d1207a3.jpg')).buffer()
    doujin.forEach((v, i)=> {
        rows.push({
          title: `${i + 1}. ${v.title}`,
          description: `Code: ${v.id}`,
          rowId: `${usedPrefix}nhentai ${v.id}`
        })
      })
    let name = conn.getName(m.sender)
    const ftoko = {
      key: {
          participant: '0@s.whatsapp.net'
      },
      message: {
          orderMessage: {
              itemCount: 2132879,
              itemCoun: 404,
              surface: 404,
              message: `© ${conn.user.name}`,
              orderTitle: 'Haruno',
              thumbnail: img,
              sellerJid: '0@s.whatsapp.net'
          }
      }
  }
    conn.relayWAMessage(conn.prepareMessageFromContent(m.chat, {
        "listMessage": {
          "title": `${ucapan()}, ${name}`.trim(),
          "description": `Silahkan pilih list opsi untuk mendownload doujin.`,
          "footerText": "Silahkan tekan tombol \"Click Here\" untuk melihat list doujin",
          "buttonText": "Click Here",
          "listType": "SINGLE_SELECT",
          "sections": [
            {
              "rows": rows,
            "title": "Doujin Searcn"
        }
    ], "contextInfo": {
        "stanzaId": m.key.id,
        "participant": m.sender,
        "quotedMessage": ftoko
      }
    }
  }, {}), { waitForAck: true })
}
handler.command = /^nhs|nhsearch|nhcari$/i
handler.tags = ['internet']
handler.help = ['nhsearch <query>']
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