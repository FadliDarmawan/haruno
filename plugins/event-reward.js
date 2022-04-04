let fetch = require('node-fetch')
let handler = async(m, { conn }) => {
    let pp = await(await fetch(image)).buffer()
    let user = db.data.users[m.sender]
    if (user.reward === 1) throw `Kamu sudah mengeclaim hadiah reward Haruno 2.5.0.`
    if (user.reward === 0) {
        await conn.reply(m.chat, `Terimakasih sudah menggunakan Haruno Bot, hingga sekarang Haruno Bot sudah berjalan selama 1 tahun lebih.\nBerikut hadiah mu:

Limit: 100
EXP: 20.000
`.trim(), m, { contextInfo: {
        externalAdReply: {
            sourceUrl: 'https://youtu.be/-tKVN2mAKRI',
            title: 'Event reward',
            body: 'Haruno Bot',
            thumbnail: pp
        }
    }}
    )
        user.reward += 1
        user.limit += 100
        user.exp += 20000
    }
}
handler.command = /^reward$/i
module.exports = handler