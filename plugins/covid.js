let fetch = require('node-fetch')
let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Harap masukkan parameter negara!\n\nContoh: ${usedPrefix + command} Indonesia`
  let res = await fetch(global.API('https://covid19.mathdro.id', '/api/countries/' + (text)))
  if (!res.ok) throw await `${res.status} ${res.statusText}`
  let json = await res.json()
  if (json.confirmed) m.reply(`
Negara: ${text}
Terkonfirmasi: ${json.confirmed.value}
Sembuh: ${json.recovered.value}
Meninggal: ${json.deaths.value}
Terakhir Update: ${json.lastUpdate}
`.trim())
  else throw json
}
handler.help = ['covid'].map(v => v + ' <negara>')
handler.tags = ['internet']
handler.command = /^(corona|covid|covid19)$/i
//susu
module.exports = handler
