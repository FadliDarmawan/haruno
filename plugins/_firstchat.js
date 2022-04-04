let moment = require('moment-timezone')
let fetch = require ('node-fetch')
let handler = m => m

handler.all = async function (m) {

    let user = global.db.data.users[m.sender]
    if (m.chat.endsWith('broadcast')) return
    if (m.fromMe) return
    if (m.isGroup) return
    if (!user.firstchat) return
    if (db.data.settings.groupOnly) return
    let name = conn.getName(m.sender)
    await conn.send2ButtonImg(m.chat, await(await fetch('https://telegra.ph/file/b32e52b09508f1737a760.jpg')).buffer(), `
*Hi ${name}, ${ucapan()}*
Perkenalkan aku adalah Haruno bot!

Kamu bisa menggunakan Haruno untuk membuat sticker, mendownload video youtube, facebook, tiktok, instagram, atau hanya sekedar bersenang senang! Fitur selengkapnya tentang Haruno bisa di lihat di *.menu*

Kami tidak akan melakukan spam broadcast ke users.

Jangan lupa patuhi rules, dan harap tidak menelpon, vc, spam, mengirimkan bug atau virtex ke nomor bot.
Jika ada bug atau hal yang ingin ditanyakan silahkan menghubungi owner.
Terimakasih!
`.trim(), watermark, 'Menu', '.?', 'Owner', '.owner')
    user.firstchat = false
}

module.exports = handler
function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH')
    res = "Selamat dinihari"
    if (time >= 4) { 
        res = "Ohayou!"
    }
    if (time > 10) {
        res = "Konnichiwa!"
    }
    if (time >= 15) {
        res = "Konnichiwa!"
    }
    if (time >= 18) {
        res = "Konbanwa!"
    }
    return res
}