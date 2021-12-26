module.exports = Object.assign(async function handler(m, { text, usedPrefix, command }) {
    global.db.data.sticker = global.db.data.sticker || {}
    if (!m.quoted) throw `Reply stiker dengan caption ${usedPrefix + command}`
    if (!m.quoted.fileSha256) throw 'SHA256 Hash Missing'
    if (!text) throw `Harap masukkan text!\n\nContoh: ${usedPrefix + command} .menu`
    let sticker = global.db.data.sticker
    let hash = m.quoted.fileSha256.toString('hex')
    if (sticker[hash] && sticker[hash].locked) throw 'kamu tidak memiliki izin untuk mengubah perintah stiker ini'
    sticker[hash] = {
        text,
        mentionedJid: m.mentionedJid,
        creator: m.sender,
        at: + new Date,
        locked: false,
    }
    m.reply(`Berhasil!`)
}, {
    help: ['cmd'].map(v => 'set' + v + ' <teks>'),
    tags: ['database'],
    command: ['setcmd']
})
