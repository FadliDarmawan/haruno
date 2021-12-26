// NurNurz
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Harap masukan text!\n\nCotoh: ${usedPrefix + command} Haruno Bot`
  try {
    await conn.setStatus(text)
    m.reply('Berhasil!')
  } catch (e) {
    console.log(e)
    throw `Eror`
  }
}
handler.help = ['setbotbio <teks>']
handler.tags = ['owner']
handler.command = /^(setbotbio)$/i
handler.owner = true

module.exports = handler
