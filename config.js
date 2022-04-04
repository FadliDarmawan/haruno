let fs = require('fs')
global.owner = ['628112958665', '6288215569001','628998512588', '6283175998566', '6285693602003'] // Letakan nomor kamu disini
global.APIs = { // API Prefix
  // nama: 'https://website'
  jonaz: 'https://jonaz-api-v2.herokuapp.com',
  neoxr: 'https://api.neoxr.eu.org/',
  nrtm: 'https://nurutomo.herokuapp.com',
  pencarikode: 'https://pencarikode.xyz',
  xteam: 'https://api.xteam.xyz',
  zahir: 'https://zahirr-web.herokuapp.com',
  zekais: 'http://zekais-api.herokuapp.com',
  zeks: 'https://api.zeks.me',
  vhtear: 'https://api.vhtear.com',
  lolhum: 'https://api.lolhuman.xyz',
  bx: 'https://bx-hunter.herokuapp.com',
  zenz: 'https://zenzapi.xyz'
}
global.APIKeys = { // APIKey nya disini
  // 'https://website': 'apikey'
  'https://api.neoxr.eu.org/': 'yntkts',
  'https://pencarikode.xyz': 'APIKEY',
  'https://api.xteam.xyz': 'HIRO',
  'https://zahirr-web.herokuapp.com': 'zahirgans',
  'https://api.zeks.me': 'apivinz',
  'https://api.lolhuman.xyz': '929b48b9aa5a91abed8526cd',
  'https://api.vhtear.com': 'sayahafiz',
  'http://zekais-api.herokuapp.com': 'grqgD6pU',
  'https://bx-hunter.herokuapp.com': 'Ikyy69',
  'https://zenzapi.xyz': '110cd11dc6'
}

// Sticker WM
global.packname = 'Haruno'
global.author = 'Fadli'

global.wait = '「 ⏱️ 」Harap tunggu...'
global.eror = '「❗」Server ERROR!'
global.internal = 'https://telegra.ph/file/e50f241a4e33aac014ec7.jpg'
global.eksternal = 'https://telegra.ph/file/c7073a9a5a95faafcc913.jpg'
global.haruno = 'https://telegra.ph/file/9dfa8c74ff6ab5e8d0a8f.jpg'
global.watermark = '© Haruno'
global.thumbfoto = 'https://telegra.ph/file/2249d5c5fa9785d2682aa.jpg' 
global.image = 'https://teitslegra.ph/file/a2644cbdc76476f66bd17.jpg'

global.multiplier = 59 // Semakin tinggi, semakin sulit naik level

let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})