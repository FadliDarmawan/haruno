const uploadImage = require('../lib/uploadImage')
let fetch = require('node-fetch')

let handler = async (m) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let user = global.db.data.users[who]
    let caption = `
Limit: *${user.limit}*
EXP: *${user.exp}*
Level: *${user.level}*
Role: *${user.role}*
Daily Reward: *${user.dailyReward}*
Joincount: *${user.joincount}*
`.trim()
    let pp = 'https://telegra.ph/file/39bbded9693c9338069fd.jpg'
    try {
      pp = await uploadImage(await (await fetch(await this.getProfilePicture(who))).buffer())
    } catch (e) {
    } finally {
      await conn.reply(m.chat, caption, m, { contextInfo: {
        externalAdReply: {
          mediaUrl: 'https://youtu.be/-tKVN2mAKRI',
          title: user.name,
          body: 'Haruno Bot',
          thumbnail: await (await fetch(pp)).buffer()
        }
    }})
  }
}
handler.help = ['my [@user]']
handler.tags = ['xp']
handler.command = /^(my|limit)$/i
module.exports = handler
