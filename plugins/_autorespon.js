let fs = require('fs')
let fetch = require('node-fetch')
let { sticker } = require('../lib/sticker')
let { MessageType } = require('@adiwajshing/baileys')
let handler = m => m

handler.all = async function (m, { isBlocked }) {

    if (isBlocked) return
    if (m.isBaileys) return
    if (m.chat.endsWith('broadcast')) return
    let setting = db.data.settings[this.user.jid]
    let name = conn.user.name

    // ketika ditag
    try {
        if (m.mentionedJid.includes(this.user.jid) && m.isGroup) {
            let image = ['', 'https://telegra.ph/file/a4032ee83c44bc712b085.png', 'https://telegra.ph/file/58e79875fa91a992726d7.png', 'https://telegra.ph/file/b7b7c9bcc8b97e2171f97.png', 'https://telegra.ph/file/e808c24abb86c7500f4b1.png', 'https://telegra.ph/file/0f455c0cbbd6aeeff283f.png', 'https://telegra.ph/file/a595a3bedd97355650a8a.png', 'https://telegra.ph/file/bfbc81cd603d893952def.png', 'https://telegra.ph/file/44f2d562660f5849677a6.png', 'https://telegra.ph/file/4fd06cd5b884e3a80ba7b.png', 'https://telegra.ph/file/e16c377c3655d6fd79954.png', 'https://telegra.ph/file/70440fb145823d4aaa80d.png', 'https://telegra.ph/file/762e538b6a3a9345661d9.png']
            let selectedimage = image[Math.floor(Math.random() * image.length)]
            stiker = await sticker(false, selectedimage, global.packname, globa.author)
            await this.sendMessage(m.chat, stiker, MessageType.sticker, {
                quoted: m
            })
        }
    } catch (e) {
        return
    }

    // ketika ada yang invite/kirim link grup di chat pribadi
    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Buka tautan ini')) && !m.isBaileys && !m.isGroup) {
        let pp = await(await fetch(image)).buffer()
        await this.reply(m.chat, `Undang ${conn.user.name} ke Group

*Trial Free*
Ketik *.join <link gc>* dan bot akan masuk ke group. setelah 12 jam trial bot akan keluar.
Note: 1 orang hanya bisa memasukkan bot ke group sebanyak 1 kali.

*1 Bulan/15.000*
Hubungi owner jika ingin berlangganan/bertanya/membayar
Pembayaran bisa melalui: Gopay, Dana, OVO, Pulsa (XL)

*Permanen/20.000*
Hubungi owner jika ingin berlangganan/bertanya/membayar
Note: tergantung slot

*Premium users/25.000* 
Menjadi users premium dan anda dapat menggunakan fitur dengan tanpa batasan (tanpa limit) dan beberapa akses fitur khusus user premium.

Users premium dapat memasukkan bot ke dalam group sebanyak 3 kali, bot akan otomatis keluar dari group setelah 1 bulan(30 hari).

Silahkan kontak/hubungi owner jika mau mulai menyewa/berlangganan/ada yang mau di tanyakan.
Pembayaran bisa melalui: Gopay, Dana, OVO, Pulsa (XL)

`, m, { contextInfo: {
    externalAdReply: {
        sourceUrl: 'https://youtu.be/-tKVN2mAKRI',
            title: 'Undang ke group',
            body: 'Haruno Bot',
            thumbnail: pp
            }
        }})
    }

    // salam
    let reg = /(ass?alam|اَلسَّلاَمُ عَلَيْكُمْ|السلام عليکم)/i
    let isSalam = reg.exec(m.text)
    if (isSalam && !m.fromMe) {
        m.reply(`وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ\n_wa\'alaikumussalam wr.wb._`)
    }

    // backup db
    if (setting.backup) {
        if (new Date() * 1 - setting.backupDB > 1000 * 60 * 60) {
            let d = new Date
            let date = d.toLocaleDateString('id', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
            await global.db.write()
            setting.backupDB = new Date() * 1
            this.reply(global.owner[0] + '@s.whatsapp.net', `Database: ${date}`, null)
            this.sendFile(global.owner[0] + '@s.whatsapp.net', fs.readFileSync('./database.json'), 'database.json', '', 0, 0, { mimetype: 'application/json' })
        }
    }

    // update status
    if (setting.statusUpdate) {
        if (new Date() * 1 - setting.status > 1000) {
            let _uptime = process.uptime() * 1000
            let uptime = clockString(_uptime)
            await this.setStatus(`Aktif selama ${uptime} | Mode: ${settings.self ? 'Private' : settings.group ? 'Hanya Grup' : 'Publik'} | Haruno by Fadli Darmawan`).catch(_ => _)
            setting.status = new Date() * 1
        }
    }
}

module.exports = handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}