let handler = m => m

handler.all = async function (m, { isBotAdmin }) {
    if (!db.data.settings[this.user.jid].antivirus) return // apakah antivirus aktif?
    // auto clear ketika terdapat pesan yang tidak dapat dilihat di wa desktop
    if (m.messageStubType === 68) {
        let log = {
            key: m.key,
            content: m.msg,
            sender: m.sender
        }
        await this.modifyChat(m.chat, 'clear', {
            includeStarred: false
        }).catch(console.log)
    }
}

module.exports = handler