let handler = async(m, { conn }) => {
    let users = Object.entries(db.data.users).map(v => v[0])
    for (id of users) db.data.users[id].reward = 0
}
handler.owner = true
handler.command = /^event-reset$/i
module.exports = handler