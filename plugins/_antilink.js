let handler = m => m

let linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
handler.before = async function (m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys || m.fromMe) return
  let chat = db.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)

  if (chat.antilink && isGroupLink && !isAdmin && m.isGroup) {
    if (isBotAdmin) var thisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
    if (m.text.includes(thisGroup)) return
    await this.sendButton(m.chat, `*link grup terdeteksi!*${isBotAdmin ? '' : `\n\nbot bukan admin`}`, watermark, 'matikan fitur ini', '.0 antilink', m)
    if (db.data.settings[this.user.jid].restrict) {
      if (isBotAdmin) this.groupRemove(m.chat, [m.sender])
    }
  }
  return !0
}

module.exports = handler