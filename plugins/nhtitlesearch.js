const nhentai = require('nhentai-node-api')
let handler = async(m, { conn, usedPrefix, text, command }) => {
    if(!text) throw `Harap masukkan query yang ingin di search!\n\nContoh: ${usedPrefix + command} Introvert Beauty Gets Raped Over and Over by Her Homeroom Tearcher`
    let doujin = await nhentai.search(text, 'popular-week', 1)
    let { isBusiness } = conn.isOnWhatsApp(conn.user.jid)
      if (isBusiness) {
        let caption = doujin.map((v, i) => `No ${i + 1}\nKode: ${v.id}\nTitle: ${v.title}\nLanguage: ${v.language}\nUntuk mendownload: ${usedPrefix}nhentsi ${v.id}\n==============\n`).join('\n')
        m.reply('🔍 Search Doujin!\n\n' + caption)
    } else {
    let rows = []
    doujin.forEach((v, i)=> {
        rows.push({
          title: `${i + 1}. ${v.title}`,
          description: `Code: ${v.id}`,
          rowId: `${usedPrefix}nhentai ${v.id}`
        })
      })
    let name = conn.getName(m.sender)
    conn.relayWAMessage(conn.prepareMessageFromContent(m.chat, {
      "listMessage": {
        "title": `Hi, ${name}`,
        "description": `🔍 Search Doujin!\nSilahkan pilih list opsi untuk mendownload doujin.`,
        "footerText": "Silahkan tekan tombol \"Click Here\" untuk melihat list doujin",
        "buttonText": "Click Here",
        "listType": "SINGLE_SELECT",
        "sections": [
          {
            "rows": rows,
          "title": "Doujin Searcn"
      }
    ], "contextInfo": {
      "stanzaId": m.key.id,
      "participant": m.sender,
      "quotedMessage": m.message
    }
  }
}, {}), { waitForAck: true })
}
}
handler.command = /^nhs|nhsearch|nhcari$/i
handler.tags = ['internet']
handler.help = ['nhsearch <query>']
module.exports = handler

