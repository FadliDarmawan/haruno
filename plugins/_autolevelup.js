let handler = m => m

let levelling = require('../lib/levelling')
let fetch = require('node-fetch')
handler.before = async function (m) {
        let user = db.data.users[m.sender]
        let users = Object.entries(db.data.users).map(([key, value]) => {
                return { ...value, jid: key }
        })
        let who = m.sender
        let discriminator = who.substring(9, 13)
        let sortedLevel = users.map(toNumber('level')).sort(sort('level'))
        let usersLevel = sortedLevel.map(enumGetKey)
        let { min, xp, max } = levelling.xpRange(user.level, global.multiplier)
        if (!user.autolevelup) return !0
        let before = user.level * 1
        while (levelling.canLevelUp(user.level, user.exp, global.multiplier)) user.level++

        if (before !== user.level) {
                let rank = await (await fetch(thumbfoto)).buffer()
                        .then(async data => {
                                await this.sendButtonLoc(m.chat, data, `@${who.split`@`[0]} _*Level Up!*_\n_${before}_ -> _${user.level}_`.trim(), watermark, 'Profile', ',my', m, { contextInfo: { mentionedJid: [who]}})
                })
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