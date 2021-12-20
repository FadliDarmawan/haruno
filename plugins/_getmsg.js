let handler = m => m

handler.before = async function (m, { isROwner }) {
    let chat = db.data.chats[m.chat]
    if (m.chat.endsWith('broadcast') || !chat.getmsg || chat.isBanned || db.data.users[m.sender].banned || m.isBaileys) return
    let msgs = db.data.msgs
    if (!(m.text in msgs)) return
    if (msgs[m.text].locked) if (!isROwner) {
        m.reply('Dikunci!')
        throw 0
    }
    let _m = this.serializeM(JSON.parse(JSON.stringify(msgs[m.text]), (_, v) => {
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

module.exports = handler