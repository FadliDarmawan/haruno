let fs = require('fs')
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
        conn.send3Button(m.chat, `┌〔 Undang Bot ke Grup 〕
├ 3 Hari / GRATIS 
├ 7 Hari / Rp7.000
├ 30 Hari / Rp10.000
├ 2 Bulan / Rp15.000
└────

Silahkan ketik .sewa untuk mendapatkan informasi lebih lanjut.
`.trim(), watermark, 'Pemilik Bot', ',owner', 'Cara memasukkan bot', '.how add', 'Sewa', '.sewa',m)
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
            this.reply(global.owner[0] + '@s.whatsapp.net', `Database, Premium, Event: ${date}`, null)
            this.sendFile(global.owner[0] + '@s.whatsapp.net', fs.readFileSync('./database.json'), 'database.json', '', 0, 0, { mimetype: 'application/json' })
            this.sendFile(global.owner[0] + '@s.whatsapp.net', fs.readFileSync('./src/premium.json'), 'premium.json', '', 0, 0, { mimetype: 'application/json' })
            this.sendFile(global.owner[0] + '@s.whatsapp.net', fs.readFileSync('./src/event.json'), 'event.json', '', 0, 0, { mimetype: 'application/json' })
        }
    }

    // update status
    if (setting.statusupdate) {
        if (new Date() * 1 - setting.status > 1000) {
            let _uptime = process.uptime() * 1000
            let uptime = clockString(_uptime)
            await this.setStatus(`Aktif selama ${uptime} | Mode: ${global.opts['self'] ? 'Private' : setting.groupOnly ? 'Hanya Grup' : 'Publik'} | Haruno bot oleh Fadli`).catch(_ => _) 
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