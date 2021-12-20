let moment = require('moment-timezone')
let fetch = require ('node-fetch')
let handler = m => m

handler.all = async function (m) {

    if (m.chat.endsWith('broadcast')) return
    if (m.fromMe) return
    if (m.isGroup) return
    if (db.data.settings.groupOnly) return
    let user = global.db.data.users[m.sender]
    let name = conn.user.name
    if (new Date - user.pc < 86400000) return // setiap 24 jam sekali
    conn.relayWAMessage(conn.prepareMessageFromContent(m.chat, {
        "listMessage":  {
            "title": `Hai, ${conn.getName(m.sender)} ${ucapan()}`,
            "description": "Saya adalah Haruno Bot salah satu Bot Whatsapp.",
            "footerText": "Silakan tekan tombol \"Click Here\" untuk melihat list command Haruno Bot.\n\nHarap untuk tidak menelpon ke nomor ini, tidak minta save ke nomor ini, dan tidak spam dalam penggunaan. Terimakasih.",
            "buttonText": "Click Here",
            "listType": "SINGLE_SELECT",
            "sections": [
                {
                    "rows": [{
                        "title": `Menu`,
                        "description": "Daftar list menu/command pada Haruno Bot.",
                        "rowId": ".menu"
                    }],
                    "title": "Menu Haruno Bot"
                }, {
                    "rows": [{
                        "title": `Rules`,
                        "description": "Syarat Ketentuan, Peraturan, Kebijakan Privasi.",
                        "rowId": ".rules"
                    }, {
                        "title": `Join`,
                        "description": "Masukkan bot ke dalam group.",
                        "rowId": ".join"
                    }, {
                        "title": `Sewa`,
                        "description": "Menampilkan list harga sewa Haruno Bot.",
                        "rowId": ".sewa"
                    }, {
                        "title": `Botstat`,
                        "description": "Menampilkan status bot sekarang.",
                        "rowId": ".botstat"
                    }, {
                        "title": `Owner Bot`,
                        "description": "Kotak owner dari Haruno Bot. *Chat jika penting, minta save kemungkinan tidak di balas.*",
                        "rowId": ".owner"
                    }],
                    "title": "Informasi Bot"
                }, {
                    "rows": [{
                        "title": `Sticker`,
                        "description": "Untuk membuat sticker.",
                        "rowId": ".sticker"
                    }, {
                        "title": `Tiktok`,
                        "description": "Download video dari Tiktok.",
                        "rowId": ".join"
                    }, {
                        "title": `Play`,
                        "description": "Untuk mendownload/memutar video/audio dari youtube.",
                        "rowId": ".play"
                    }],
                    "title": "Beberapa Most-use command"
                }
            ] 
        }
     }, {}), {waitForAck: true})
    user.pc = new Date * 1
}

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