let fs = require('fs')
global.owner = ['628112958665', '6288215569001','628998512588', '6283175998566', '6285693602003', '6283153189868'] // Letakan nomor kamu disini
global.mods = [''] // Moderator?
global.prems = JSON.parse(fs.readFileSync('./src/premium.json')) // Pengguna premium tidak memerlukan limit
global.APIs = { // API Prefix
  // nama: 'https://website'
  hardianto: 'https://hardianto-chan.herokuapp.com',
  jonaz: 'https://jonaz-api-v2.herokuapp.com',
  neoxr: 'https://neoxr-api.herokuapp.com',
  nrtm: 'https://nurutomo.herokuapp.com',
  pencarikode: 'https://pencarikode.xyz',
  xteam: 'https://api.xteam.xyz',
  zahir: 'https://zahirr-web.herokuapp.com',
  zekais: 'http://zekais-api.herokuapp.com',
  zeks: 'https://api.zeks.xyz',
  vhtear: 'https://api.vhtear.com',
  lolhum: 'https://api.lolhuman.xyz',
  fxc7: 'https://fxc7-api.herokuapp.com',
  aqul: 'https://api.justaqul.xyz'

}
global.APIKeys = { // APIKey nya disini
  // 'https://website': 'apikey'
  'https://hardianto-chan.herokuapp.com': 'hardianto',
  'https://neoxr-api.herokuapp.com': 'yntkts',
  'https://pencarikode.xyz': 'APIKEY',
  'https://api.xteam.xyz': 'HIRO',
  'https://zahirr-web.herokuapp.com': 'zahirgans',
  'https://api.zeks.xyz': 'FVe0JFCdME58YSKmhoDWdRtyuJt',
  'https://api.lolhuman.xyz': '929b48b9aa5a91abed8526cd',
  'https://api.vhtear.com': 'sayahafiz',
  'https://fxc7-api.herokuapp.com': 'uN8rsK4g',
  'https://api.justaqul.xyz': '5kbUqdG00OXelFYx',
  'http://zekais-api.herokuapp.com': 'grqgD6pU'
}

// Sticker WM
global.packname = 'Haruno'
global.author = 'Fadli'

global.wait = '「 ⏱️ 」Harap tunggu...'
global.eror = '「❗」Server ERROR!'
global.fla = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text='
global.watermark = '© Haruno' //change the watermark 
global.image = 'https://telegra.ph/file/63560c3d19d6bcce228f5.jpg' //change the image
global.thumbfoto = 'https://telegra.ph/file/39bbded9693c9338069fd.jpg'

global.multiplier = 59 // Semakin tinggi, semakin sulit naik level

let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})