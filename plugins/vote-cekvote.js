let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.vote = conn.vote ? conn.vote : {}
    if (!(id in conn.vote)) {
        await conn.sendButton(m.chat, `_*tidak ada voting digrup ini!*_`, watermark, 'MULAI VOTE', `${usedPrefix}mulaivote`, m)
        throw false
    }

    let [reason, upvote, devote] = conn.vote[id]
    let mentionedJid = [...upvote, ...devote]
    let caption = `
〔 Vote 〕

Vote: ${reason}

Upvote
Total: ${upvote.length}
${upvote.map(u => '@' + u.split('@')[0]).join('\n')}

Devote
Total: ${devote.length}
${devote.map(u => '@' + u.split('@')[0]).join('\n')}
    `.trim()
    await conn.send3Button(m.chat, caption, watermark, 'Upvote', `${usedPrefix}upvote`, 'Devote', `${usedPrefix}devote`, 'Hapus vote', `${usedPrefix}hapusvote`, m, { contextInfo: { mentionedJid } })
}
handler.help = ['cekvote']
handler.tags = ['vote']
handler.command = /^cekvote$/i
handler.group = true
module.exports = handler
