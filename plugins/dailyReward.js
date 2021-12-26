let fetch = require('node-fetch')
let handler = async(m, { conn, usedPrefix, args, command }) => {
    let name = conn.getName(m.sender)
    let user = db.data.users[m.sender]
    if (user.dailyReward < 10)throw `Daily Reward Point mu masih kurang, point mu sekarang ${user.dailyReward}/10. Dibutuhkan 10 point untuk mendapatkan hadiah.\n\nCara mendapatkan point: bermain semua game pada Haruno Bot kecuaali Family100.`
    if (user.dailyReward === 10) {
        await conn.sendButtonLoc(m.chat, await(await fetch(thumbfoto)).buffer(),`Terimakasih sudah menyelesaikan daily reward. Berikut hadiah mu:

10 Limit
10000 EXP

Daily Reward akan di riset setiap jam 4 pagi setiap hari WIB.`.trim(), watermark, 'Profile', '.my')
    user.dailyReward = 0
    user.limit += 10
    user.exp += 1000
    }
}
handler.command = /^(dailyreward)$/i
handler.tags = ['game']
handler.help = ['dailyreward']
module.exports = handler