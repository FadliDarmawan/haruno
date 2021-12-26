let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    let user = db.data.users[who]
    if (!who) throw `Tag atau mention seseorang!\n\nContoh: ${usedPrefix + command} @${m.sender.split`@`[0]} 7`
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) throw `Masukkan parameter untuk hari!\n\nContoh: ${usedPrefix + command} @${m.sender.split`@`[0]} 7`
    if (isNaN(txt)) return m.reply(`Hanya bisa angka!\n\nContoh:\n${usedPrefix + command} @${m.sender.split`@`[0]} 7`)
    var jumlahHari = 86400000 * txt
    var now = new Date() * 1
    if (now < user.premiumTime) user.premiumTime += jumlahHari
    else user.premiumTime = now + jumlahHari
    user.premium = true
    m.reply(`Berhasil menambahkan *${user.name}* menjadi pengguna premium selama ${txt} hari.\n\nMasa premium akan habis dalam: ${conn.msToDate(user.premiumTime - now)}`)
}
handler.help = ['addprem [@user] <amount of days>']
handler.tags = ['owner']
handler.command = /^(add|tambah|\+)p(rem)?$/i

handler.rowner = true

module.exports = handler