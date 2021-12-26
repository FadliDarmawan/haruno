let handler = async (m, { command, usedPrefix, text }) => {
    let which = command.replace(/get/i, '')
    if (!text) throw `Harap masukkan query sebagai parameter!\n\nContoh: ${usedPrefix + command} tiananmen`
    let msgs = global.db.data.msgs
    if (!text in msgs) throw `'${text}' tidak terdaftar!`
    delete msgs[text]
    m.reply(`berhasil menghapus pesan dengan nama '${text}'`)
}
handler.help = ['msg'].map(v => 'del' + v + ' <teks>')
handler.tags = ['database']
handler.command = /^(-|del)(all|vn|msg|video|audio|img|stic?ker|gif)$/

module.exports = handler