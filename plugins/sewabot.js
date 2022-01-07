let fetch = require('node-fetch')
let moment = require('moment-timezone')
let handler = async(m, { conn, usedPrefix, args, command }) => {
    let name = db.data.users[m.sender].name
    if(!args[0]) {
        conn.relayWAMessage(conn.prepareMessageFromContent(m.chat, {
            "listMessage": {
              "title": `${ucapan()}, ${name}`.trim(),
              "description": "Berikut ini adalah daftar harga Haruno Bot.",
              "footerText": "Silahkan tekan tombol \"Click Here\" untuk melihat daftar harga Haruno Bot.\n\nJika ada pertanyaan atau semacamnya silahkan hubungi owner.",
              "buttonText": "Click Here",
              "listType": "SINGLE_SELECT",
              "sections": [
                {
                  "rows": [{
                    "title": `Pemilik Bot`,
                    "description": "Nomor Pemilik Bot (owner)",
                    "rowId": `${usedPrefix}creator`
                  }, {
                    "title": "Syarat Ketentuan dan Peraturan",
                    "description": "Harap membaca Peraturan demi kenyamanan kita bersama",
                    "rowId": `${usedPrefix}rules`
                  }, {
                    "title": "Group Official Harunobot",
                    "description": "Gabung untuk mendapatkan informasi mengenai bot atau sekedar meramaikan",
                    "rowId": `${usedPrefix}harunoff`
                  }],
                  "title": "Informasi Bot"
                }, {
                  "rows": [{
                    "title": `Free Trial 1 Hari`,
                    "description": "Masukkan bot secara gratis selama 1 Hari",
                    "rowId": `${usedPrefix}join`
                    }],
                  "title": "─────「 1 」"
                }, {
                  "rows": [{
                    "title": `Berlangganan 1 Bulan. Rp15.000`,
                    "description": "Masukkan bot secara berlangganan 1 bulan ke dalam group",
                    "rowId": `${usedPrefix + command} 1`
                  }],
                  "title": "─────「 2 」"
                }, {
                  "rows": [{
                    "title": `Berlangganan 2 Bulan. Rp20.000`,
                    "description": "Masukkan bot secara berlangganan 2 bulan ke dalam group",
                    "rowId": `${usedPrefix + command} 2`
                  }],
                  "title": "─────「 3 」"
                }, {
                    "rows": [{
                      "title": `Menjadi users premium! Rp25.000`,
                      "description": "Menggunakan fitur tanpa limitasi, membuka fitur premium, bonus limit dan exp tambahan!",
                      "rowId": `${usedPrefix + command} prem`
                  }],
                    "title": "─────「 Premium 」"
                }, {
                    "rows": [{
                      "title": `Permanent. Rp30.000`,
                      "description": "Masukkan bot ke dalam group tanpa batasann waktu!",
                      "rowId": `${usedPrefix + command} perm`
                  }],
                    "title": "─────「 Permanent 」"
                }
              ], "contextInfo": {
                "stanzaId": m.key.id,
                "participant": m.sender,
                "quotedMessage": m.message
              }
            }
          }, {}), { waitForAck: true })
    } else if (args[0] == 1) {
        await conn.sendButtonLoc(m.chat, await(await fetch(thumbfoto)).buffer(), `Memasukkan bot ke group selama 1 bulan *Rp15.000*\n\nPembayaran dapat melalui:\nGoPay: 628112958665\nDana: 628112958665\nOVO: 628112958665\nPulsa(XL): 6281943265086\n\nSilahkan hubungi owner untuk mengkonfirmasi atau bertanya.`, watermark, 'Owner', '.owner', m)
    } else if (args[0] == 2) {
        await conn.sendButtonLoc(m.chat, await(await fetch(thumbfoto)).buffer(), `Memasukkan bot ke group selama 2 bulan *Rp20.000*\n\nPembayaran dapat melalui:\nGoPay: 628112958665\nDana: 628112958665\nOVO: 628112958665\nPulsa(XL): 6281943265086\n\nSilahkan hubungi owner untuk mengkonfirmasi atau bertanya.`, watermark, 'Owner', '.owner', m)
    } else if (args[0] === 'prem') {
        await conn.sendButtonLoc(m.chat, await(await fetch(thumbfoto)).buffer(), `Menjadi user premium selama 3 bulan *Rp25.000*\n\nPembayaran dapat melalui:\nGoPay: 628112958665\nDana: 628112958665\nOVO: 628112958665\nPulsa(XL): 6281943265086\n\nSilahkan hubungi owner untuk mengkonfirmasi atau bertanya.`, watermark, 'Owner', '.owner', m)
    } else if (args[0] === 'perm') {
        await conn.sendButtonLoc(m.chat, await(await fetch(thumbfoto)).buffer(), `Memasukkan bot TANPA BATASAN WAKTU! *Rp30.000*\n\nPembayaran dapat melalui:\nGoPay: 628112958665\nDana: 628112958665\nOVO: 628112958665\nPulsa(XL): 6281943265086\n\nSilahkan hubungi owner untuk mengkonfirmasi atau bertanya.`, watermark, 'Owner', '.owner', m)
    }
}
handler.help = ['sewa']
handler.tags = ['main']
handler.command = /^sewa|sewabot$/i
module.exports = handler

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