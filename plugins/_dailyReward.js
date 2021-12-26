let cron = require('node-cron')
let handler = m => m
handler.all = async function (m) {
    cron.schedule('0 4 * * * ', () => {
        conn.reply(owner[0] + '@s.whatsapp.net', 'Daily Reward Point direset. Daily reward di reset setiap jam 4 pagi WIB (Asia/Jakarta time-zone)')
        conn.reply(owner[1] + '@s.whatsapp.net', 'Daily Reward Point direset. Daily reward di reset setiap jam 4 pagi WIB (Asia/Jakarta time-zone)')
        let users = Object.entries(db.data.users).map(v => v[0])
        for (id of users) db.data.users[id].dailyReward = 0
        conn.reply(owner[0] + '@s.whatsapp.net', 'Daily Reward Point berhasil diriset.')
        conn.reply(owner[1] + '@s.whatsapp.net', 'Daily Reward Point berhasil diriset.')
    }, { 
        scheduled: true,
        timezone: "Asia/Jakarta"
    })
}

module.exports = handler