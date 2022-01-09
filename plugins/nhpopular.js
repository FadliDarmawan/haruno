const nhentai = require('nhentai-node-api')
let fetch = require('node-fetch')
let handler = async(m, { usedPrefix, args }) => {
    let doujin = await nhentai.getPopular()
    let text = doujin.map((v, i) => `⭐ Popular Doujin!\n\nNo ${i + 1}\nKode: ${v.id}\nTitle: ${v.title}\nLanguage: ${v.language}\nUntuk mendownload: ${usedPrefix + command} ${v.id}\n==============\n`).join('\n')
    m.reply(text)
}

handler.command = /^nhpopular$/i
handler.tags = ['internet']
handler.help = ['nhpopular']
module.exports = handler
