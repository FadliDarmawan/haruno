let fetch = require('node-fetch')
let handler = async(m, { conn, args }) => {
    let res = await fetch(global.API('neoxr', '/api/igh', {q: args[0], id: args[1]}, 'apikey'))
    let hako = await res.json()
    for (const { url } of hako.data)
    let img = await(await fetch(url)).buffer() 
    await conn.sendFile(m.chat, img,  'url',  watermark, m)
}
handler.command = /^highlight$/i
module.exports = handler