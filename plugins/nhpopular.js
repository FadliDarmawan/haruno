const nhentai = require('nhentai-node-api')
let fetch = require('node-fetch')
let handler = async(m, { usedPrefix, args, command }) => {
    let doujin = await nhentai.getPopular()
    let text = doujin.map((v, i) => `No ${i + 1}\nKode: ${v.id}\nTitle: ${v.title}\nLanguage: ${v.language}\nUntuk mendownload: ${usedPrefix}nhentai ${v.id}\n==============\n`).join('\n')
    m.reply('⭐ Popular Doujin!\n\n' + text)
}

handler.command = /^nhpopular$/i
handler.tags = ['internet']
handler.help = ['nhpopular']
module.exports = handler
