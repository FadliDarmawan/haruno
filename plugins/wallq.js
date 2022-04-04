const scrapertools = require('scraper-tools')
const fetch = require('node-fetch')
let handler = async(m, { conn, usedPrefix, text, command }) => {
  try {
    if(!text) throw `Masukkan parameter wallpaper yang ingin dicari.\n\nContoh: ${usedPrefix + command} Bronya Zaychik Honkai`
    let result = await scrapertools.wallpaper.search(text)
    await conn.sendFile(m.chat, result.hasil[0].image, '', watermark, m)
    await conn.sendFile(m.chat, result.hasil[1].image, '', watermark, m)
    await conn.sendFile(m.chat, result.hasil[2].image, '', watermark, m)
  } catch (e) {
    console.log(e)
    throw error
  }  
}
handler.help = ['wallpaperq <query>']
handler.tags = ['internet']
handler.command = /^wall(paper)?q?$/i

module.exports = handler