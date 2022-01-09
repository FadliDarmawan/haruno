let levelling = require('../lib/levelling')
let fetch = require('node-fetch')

let handler = m => m

handler.before = async function (m) {
        let user = db.data.users[m.sender]
        let users = Object.entries(db.data.users).map(([key, value]) => {
                return { ...value, jid: key }
        })
        let pp = await(await fetch('https://telegra.ph/file/39bbded9693c9338069fd.jpg')).buffer()
        let kai = await(await fetch('https://telegra.ph/file/4d2bca79fa5a4f2dd3d81.jpg')).buffer()
        let who = m.sender
        let sortedLevel = users.map(toNumber('level')).sort(sort('level'))
        let usersLevel = sortedLevel.map(enumGetKey)
        let { min, xp, max } = levelling.xpRange(user.level, global.multiplier)
        try {
                pp = await ( await fetch(await this.getProfilePicture(who))).buffer()
        } catch (e) {
        } finally {

                if (!user.autolevelup) return !0
                let before = user.level * 1
                while (levelling.canLevelUp(user.level, user.exp, global.multiplier)) user.level++
                let text = `@${who.split`@`[0]} _*Level Up!*_\n_${before}_ -> _${user.level}_`.trim()
                this.reply(m.chat, text, m, { thumbnail: kai, contextInfo: {
                        mentionedJid: [who],
                        externalAdReply: {
                          mediaUrl: 'https://youtu.be/-tKVN2mAKRI',
                          title: 'Levelup!',
                          body: 'Haruno Bot',
                          thumbnail: pp
                        }
                }})
        }
}
module.exports = handler

function sort(property, ascending = true) {
        if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
        else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
        if (property) return (a, i, b) => {
                return { ...b[i], [property]: a[property] === undefined ? _default : a[property] }
        }
        else return a => a === undefined ? _default : a
}

function enumGetKey(a) {
        return a.jid
}

 // await this.sendButtonLoc(m.chat, data, `@${who.split`@`[0]} _*Level Up!*_\n_${before}_ -> _${user.level}_`.trim(), watermark, 'Profile', ',my', m, { contextInfo: { mentionedJid: [who]}})