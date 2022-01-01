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
    let kai = await(await fetch('https://telegra.ph/file/4d2bca79fa5a4f2dd3d81.jpg')).buffer()
    let pp = await conn.getProfilePicture(who).catch(_ => 'https://telegra.ph/file/39bbded9693c9338069fd.jpg')
      await conn.reply(m.chat, caption, m, { thumbnail: kai, contextInfo: {
        externalAdReply: {
          mediaUrl: 'https://youtu.be/-tKVN2mAKRI',
          title: user.name,
          body: 'Haruno Bot',
          thumbnail: pp
        }
    }})
  
}
handler.help = ['my [@user]']
handler.tags = ['xp']
handler.command = /^(my|limit)$/i
module.exports = handler
