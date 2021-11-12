const free = 500
const prem = 5000
const canvacord = require('canvacord')
let handler = async (m, { conn, usedPrefix, isPrems }) => {
  let who = m.sender
  let pp = 'https://telegra.ph/file/219b9234473dc07938f46.jpg'
  let discriminator = who.substring(9,13)
  try {
    await conn.getProfilePicture(who)
  } catch (e) {
  } finally {
  if (db.data.users[m.sender].level < 1) return await conn.sendButton(m.chat, 'naikan level kamu', watermark, 'Level Up', `${usedPrefix}levelup`, m)
  let time = db.data.users[m.sender].lastclaim + 86400000
  if (new Date - db.data.users[m.sender].lastclaim < 86400000) throw `Kamu sudah mengklaim klaim harian hari ini\ntunggu selama ${msToTime(time - new Date())} lagi`
  db.data.users[m.sender].exp += isPrems ? prem * db.data.users[m.sender].level : free * db.data.users[m.sender].level
  let user = db.data.users[m.sender]
  let users = Object.entries(global.db.data.users).map(([key, value]) => {
    return { ...value, jid: key }
  })
  let sortedLevel = users.map(toNumber('level')).sort(sort('level'))
  let usersLevel = sortedLevel.map(enumGetKey)
    let { min, xp, max } = levelling.xpRange(user.level, global.multiplier)
    if (!levelling.canLevelUp(user.level, user.exp, global.multiplier)) {
      let rank = await new canvacord.Rank()
        .setRank(usersLevel.indexOf(m.sender) + 1)
        .setAvatar(pp)
        .setLevel(user.level)
        .setCurrentXP(user.exp - min)
        .setRequiredXP(xp)
        .setProgressBar("#f2aa4c", "COLOR")
        .setUsername(conn.getName(who))
        .setDiscriminator(discriminator)
      rank.build()
        .then(async data => {
          await conn.sendButtonImg(m.chat, data, `+${isPrems ? prem * db.data.users[m.sender].level : free * db.data.users[m.sender].level} XP\nsemakin tinggi level, semakin tinggi juga XP yang didapat`.trim(), watermark, 'Menu', `${usedPrefix}menu`, m, { thumbnail: data, height: 282, width: 934 })
        })
    }
}
  m.reply(`+${isPrems ? prem * db.data.users[m.sender].level : free * db.data.users[m.sender].level} XP\n\nsemakin tinggi level, semakin tinggi juga XP yang didapat`)
  db.data.users[m.sender].lastclaim = new Date * 1
}
handler.help = ['daily', 'claim']
handler.tags = ['xp']
handler.command = /^(daily|claim)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0

module.exports = handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " jam " + minutes + " menit"
}