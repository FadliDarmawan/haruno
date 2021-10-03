let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i

let handler = async (m, { conn, text, usedPrefix, args }) => {
    let user = db.data.users[m.sender]
    if (joincount === 3 ) throw 'Anda sudah melebihi batas maksimal memasukkan bot sebagai user premium.'
    user.joincount += 1
    m.reply(`Joincount mu: ${user.joincount}/3`)
    if (!args[0]) throw 'Masukkan link group'
    if (!args[1]) throw 'Masukkan jumlah hari'
    let [_, code] = args[0].match(linkRegex) || []
    if (!code) throw 'Link Salah'
    let res = await conn.acceptInvite(code)
    m.reply(`Berhasil join grup ${res.gid}`).then(() => {
        var jumlahHari = 86400000 * `${args[1]}`
        var now = new Date() * 1
        if (now < global.db.data.chats[res.gid].expired) global.db.data.chats[res.gid].expired += jumlahHari
        else global.db.data.chats[res.gid].expired = now + jumlahHari
    })
    conn.send3Button(res.gid, `
*${conn.user.name}* adalah bot whatsapp yang dibangun dengan Nodejs, *${conn.user.name}* diundang oleh @${m.sender.split`@`[0]}
    
ketik *${usedPrefix}menu* untuk melihat daftar perintah`.trim(), watermark, 'Menu', `${usedPrefix}?`, 'Panduan', '.panduan', 'Owner', '.owner', 0, { contextInfo: { mentionedJid: [m.sender] } })
}
handler.help = ['join <chat.whatsapp.com> <jumlah hari>']
handler.tags = ['premium']

handler.command = /^join$/i
handler.premium = true
module.exports = handler
