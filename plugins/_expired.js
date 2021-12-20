let handler = m => m

handler.before = async function (m) {
    let chat = db.data.chats[m.chat]
    if (m.isGroup && chat.groupTime != 0) {
        if (new Date() * 1 >= chat.groupTime) {
            let name = conn.getName(m.chat)
            await conn.sendButtonLoc(m.chat, await(await fetch(thumbfoto)).buffer(), `Waktu bot di ${name} sudah habis. Sudah saatnya ${conn.user.name} keluar dari group. Terimakasih`, watermark, 'Sayounara', '.')
            await conn.reply(global.owner[0] + '@s.whatsapp.net', `${conn.user.name} keluar dari ${name} ${m.chat}`)
            this.groupLeave(m.chat)
            chat.expired = 0
            this.modifyChat(m.chat, 'delete').catch(_ => _)
        }
    }
}

module.exports = handler