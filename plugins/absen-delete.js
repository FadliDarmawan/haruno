let handler = async (m, { conn, usedPrefix, isAdmin, isOwner }) => {
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
    }
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) return await conn.sendButton(m.chat, `Tidak ada absen berlangsung. Ingin memulai absen?`, watermark, 'Mulai absen', `${usedPrefix}+absen`, m)
    delete conn.absen[id]
    m.reply(`Berhasil menghapus sesi absen.`)
}
handler.help = ['hapusabsen']
handler.tags = ['absen']
handler.command = /^(-|delete|hapus)absen$/i

module.exports = handler