let fetch = require('node-fetch')
let confirm = {}
const fs = require('fs')
let bouken = JSON.parse(fs.readFileSync(`./src/bouken.json`))
let json = bouken[Math.floor(Math.random() * bouken.length)]
async function handler(m, { conn, args, isROwner }) {
    if (m.sender in confirm) throw 'Kamu masih dalam proses konfirmasi!'
    try {
        let user = global.db.data.users[m.sender]
        let foto = 'https://telegra.ph/file/ca645751bee63e563edda.jpg'
        if (user.health < 20) return await conn.sendButtonImg(m.chat, await(await fetch(foto)).arrayBuffer(),'Naikan health kamu.\nHealth tidak boleh kurang dari 20.', watermark, 'HEALTH', `${usedPrefix}kenko`, m)
        if (!(m.sender in confirm)) {
            confirm[m.sender] = {
                sender: m.sender,
                count,
                timeout: setTimeout(() => (m.reply('timed out'), delete confirm[m.sender]), 60000)
            }
            await conn.send2ButtonImg(m.chat, await(await fetch(json.image)).buffer(), `*${json.name} ${json.rate}*\nElement: ${json.element}\n\n*Hadiah*\nPrimogem: ${json.primogem}\nMora: ${json.mora}\nChara EXP: ${json.cxp}\nAdvanture EXP: ${json.axp}`, `©Haruno Bot - RPG`, 'SERANG⚔️', 'lanjut', 'CARI LAGI🔎', `${usedPrefix}advanture`, m)
        }
    } catch (e) {
        if (m.sender in confirm) {
            let { timeout } = confirm[m.sender]
            clearTimeout(timeout)
            delete confirm[m.sender]
            m.reply('Rejected')
        }
    }
}

handler.before = async m => {
    if (!(m.sender in confirm)) return 
    if (m.isBaileys) return 
    let { timeout, count } = confirm[m.sender]
    let user = global.db.data.users[m.sender]
    try {
        if (/^serang$/i.test(txt)) {
            let result = `${Math.floor(Math.random() * 10)} ${pickRandom(['0', '1'])}`
            if (result == 1) {
                let hatesa = 'https://telegra.ph/file/cad611016335cef7ac945.jpg'
                await conn.send2ButtonImg(m.chat, await(await fetch(hatesa)).buffer(), `*SELAMAT KAMU MENANG*\n\nHadiah mu\nPrimogem: ${json.primogem}\nMora: ${json.mora}\nChara EXP: ${json.cxp}\nAdvanture EXP: ${json.axp}`, '©Haruno Bot - RPG', 'DASHBOARD', '.dashboard', 'PROFILE', '.my', m)
                user.primogem += `${json.primogem}`
                user.mora += `${json.mora}`
                user.cxp += `${json.cxp}`
                user.axp += `${json.axp}`
                user.health -= 20
            } else {
                await conn.send2Button(m.chat, `Yahh.... kamu kalah melawan ${json.name}, -80 health\nSemoga beruntung lain waktu.\nTips: pastikan health mu banyak dan level mu lebih tinggi daripada musuh.`, '©Haruno Bot - RPG', 'COBA LAGI', '.advanture', 'HEALTH', '.kenko', m)
                user.health -= 80
            }
            clearTimeout(timeout)
            delete confirm[m.sender]
            return !0
        } else if (/^no?$/i.test(txt)) {
            clearTimeout(timeout)
            delete confirm[m.sender]
            m.reply('Rejected')
            return !0
        }

    } catch (e) {
        clearTimeout(timeout)
        delete confirm[m.sender]
        m.reply('Error saat melakukan RPG (Rejected)')
        return !0
    } finally {
        clearTimeout(timeout)
        delete confirm[m.sender]
        return !0
    }
}
handler.tags = ['game']
handler.help = ['advanture']
handler.command = /^advanture$/i
module.exports = handler