let handler = async (m, { conn, command, usedPrefix, text, isROwner }) => {
    let which = command.replace(/get/i, '')
    if (!text) throw `Harap masukkan query sebagai parameter!\n\nContoh: ${usedPrefix + command} tiananmen`
    let msgs = global.db.data.msgs
    if (!(text in msgs)) return await conn.sendButton(m.chat, `'${text}' tidak terdaftar!`, watermark, 'daftar semua pesan', '.listall', m)
    if (msgs[text].locked) if (!isROwner) {
        m.reply('Dikunci!')
        throw 0
    }
    let _m = conn.serializeM(JSON.parse(JSON.stringify(msgs[text]), (_, v) => {
        if (
            v !== null &&
            typeof v === 'object' &&
            'type' in v &&
            v.type === 'Buffer' &&
            'data' in v &&
            Array.isArray(v.data)) {
            return Buffer.from(v.data)
        }
        return v
    }))
    await _m.copyNForward(m.chat, false)
}
handler.help = ['vn', 'msg', 'video', 'gif', 'audio', 'img', 'sticker'].map(v => 'get' + v + ' <teks>')
handler.tags = ['database']
handler.command = /^get(all|vn|msg|video|audio|img|stic?ker|gif)$/

module.exports = handler