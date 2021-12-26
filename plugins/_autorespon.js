let fs = require('fs')
let fetch = require('node-fetch')
let handler = m => m

handler.all = async function (m, { isBlocked }) {

    if (isBlocked) return
    if (m.isBaileys) return
    if (m.chat.endsWith('broadcast')) return
    let setting = db.data.settings[this.user.jid]
    let { isBanned } = db.data.chats[m.chat]
    let { banned } = db.data.users[m.sender]
    let name = conn.user.name

    // ketika ditag
    try {
        if (m.mentionedJid.includes(this.user.jid) && m.isGroup) {
            await this.send2Button(m.chat,
                isBanned ? `${name} lagi tidur` : banned ? 'kamu dibanned' : `${name} disini`,
                watermark,
                isBanned ? 'Unban' : banned ? 'Pemilik Bot' : 'Menu',
                isBanned ? '.unban' : banned ? '.owner' : '.?',
                m.isGroup ? 'Ban' : isBanned ? 'Unban' : 'Donasi',
                m.isGroup ? '.ban' : isBanned ? '.unban' : '.donasi', m)
        }
    } catch (e) {
        return
    }

    // ketika ada yang invite/kirim link grup di chat pribadi
    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Buka tautan ini')) && !m.isBaileys && !m.isGroup) {
        await this.send3ButtonLoc(m.chat, await(await fetch(thumbfoto)).buffer(), `Undang ${conn.user.name} ke Group

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

`, watermark, 'Owner', '.creator', 'Sewa', '.sewa', 'Join', '.join', m)
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