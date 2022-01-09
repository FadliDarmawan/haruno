const nhentai = require('nhentai-node-api')
let fetch = require('node-fetch')
let handler = async(m, { conn, usedPrefix, command }) => {
    let doujin = await nhentai.getLatest()
    let text = doujin.map((v, i) => `🆕 Latest Doujin!\n\nNo ${i + 1}\nKode: ${v.id}\nTitle: ${v.title}\nLanguage: ${v.language}\nUntuk mendownload: ${usedPrefix + command} ${v.id}\n==============\n`).join('\n')
    m.reply(text)
}
handler.command = /^nh(latest|terbaru|newest|new)$/i
handler.tags = ['internet']
handler.help = ['nhlatest']
module.exports = handler