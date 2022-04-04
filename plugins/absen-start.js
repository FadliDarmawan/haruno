let handler = async (m, { conn, usedPrefix, text, isAdmin, isOwner }) => {
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
    }
    conn.absen = conn.absen ? conn.absen : {}
    let id = m.chat
    if (id in conn.absen) return await conn.sendButton(m.chat, `Masih ada absen di chat ini. Ingin hapus absen?`, watermark, 'Hapus absen', `${usedPrefix}-absen`, conn.absen[id][0])
    conn.absen[id] = [
        await conn.sendButton(m.chat, `Absen dimulai.`, watermark, 'Absen', `${usedPrefix}absen`, m),
        [],
        text
    ]
}
handler.help = ['mulaiabsen <teks>']
handler.tags = ['absen']
handler.command = /^(\+|start|mulai)absen$/i

module.exports = handler