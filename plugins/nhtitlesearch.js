const nhentai = require('nhentai-node-api')
let fetch = require('node-fetch')
let handler = async(m, { conn, text, usedPrefix, command }) => {
    if(!text) throw `Harap masukkan query yang ingin di search!\n\nContoh: ${usedPrefix + command} Introvert Beauty Gets Raped Over and Over by Her Homeroom Tearcher`
    let doujin = await nhentai.search(text, 'popular-week', 1)
    let caption = doujin.map((v, i) => `No ${i + 1}\nKode: ${v.id}\nTitle: ${v.title}\nLanguage: ${v.language}\nUntuk mendownload: ${usedPrefix}nhentsi ${v.id}\n==============\n`).join('\n')
    m.reply('🔍 Search Doujin!\n\n' + caption)
}
handler.command = /^nhs|nhsearch|nhcari$/i
handler.tags = ['internet']
handler.help = ['nhsearch <query>']
module.exports = handler
