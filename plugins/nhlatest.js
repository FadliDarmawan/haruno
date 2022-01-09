const nhentai = require('nhentai-node-api')
let fetch = require('node-fetch')
let handler = async(m, { conn, usedPrefix, command }) => {
    let doujin = await nhentai.getLatest()
    let text = doujin.map((v, i) => `No ${i + 1}\nKode: ${v.id}\nTitle: ${v.title}\nLanguage: ${v.language}\nUntuk mendownload: ${usedPrefix}nhentai ${v.id}\n==============\n`).join('\n')
    m.reply('🆕 Latest Doujin!' + '\n\n' +text)
}
handler.command = /^nhlatest|nhterbaru|nhnewest|nhnew$/i
handler.tags = ['internet']
handler.help = ['nhlatest']
module.exports = handler