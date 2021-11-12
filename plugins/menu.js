let levelling = require('../lib/levelling')
let { MessageType } = require('@adiwajshing/baileys')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
const defaultMenu = {
  before: `
┌─〔 %me 〕
├ Hai, %name!
│
├ Tersisa *%limit Limit*
├ Role *%role*
├ Level *%level (%exp / %maxexp)* [%xp4levelup]
├ %totalexp XP secara Total
│ 
├ Tanggal: *%week %weton, %date*
├ Tanggal Islam: *%dateIslamic*
├ Waktu: *%time*
│
├ Uptime: *%uptime (%muptime)*
├ Database: %rtotalreg dari %totalreg
└────
%readmore`.trimStart(),
  header: '┌─〔 %category 〕',
  body: '├ %cmd %islimit %isPremium',
  footer: '└────\n',
  after: `
*%npmname@^%version*
${'```%npmdesc```'}
`,
}
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'game', 'xp', 'stiker', 'kerangajaib', 'quotes', 'admin', 'grup', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'database', 'islamic', 'audio', 'jadibot', 'info', 'tanpakategori', 'owner', 'weebs', 'nsfw']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': 'Utama',
    'game': 'Game',
    'xp': 'Exp & Limit',
    'sticker': 'Stiker',
    'kerang': 'Kerang Ajaib',
    'quotes': 'Quotes',
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`,
    'group': 'Grup',
    'premium': 'Premium',
    'internet': 'Internet',
    'anonymous': 'Anonymous Chat',
    'nulis': 'MagerNulis & Logo',
    'downloader': 'Downloader',
    'tools': 'Tools',
    'fun': 'Fun',
    'database': 'Database',
    'vote': 'Voting',
    'absen': 'Absen',
    'islamic': 'Islamic',
    'audio': 'Pengubah Suara',
    'jadibot': 'Jadi Bot',
    'info': 'Info',
    '': 'Tanpa Kategori',
    'weebs': 'Weebs',
    'nsfw': 'NSFW',
  }
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'admin') tags = {
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`
  }
  if (teks == 'grup') tags = {
    'group': 'Grup'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
  if (teks == 'islamic') tags = {
    'islamic': 'Islamic'
  }
  if (teks == 'audio') tags = {
    'audio': 'Pengubah Suara'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'tanpakategori') tags = {
    '': 'Tanpa Kategori'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }
  if (teks == 'weebs') tags = {
    'weebs': 'Weebs'
  }
  if (teks == 'nsfw') tags = {
    'nsfw': 'NSFW'
  }
  if (teks == 'edukasi') tags = {
    'edukasi': 'Edukasi'
  }




  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let gambar = await(await fetch(thumbfoto)).buffer()
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let gc1 = '628112958665-1625393837@g.us' //change the group JID
    let _gc1 = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(gc1)
    let tulisan = `
${ucapan()} ${name}. Have a great day！
`.trim()
    let kamisato = `Berikut adalah list menu Haruno Bot. klik pada "Click Here!" untuk melihat list menu.\n\nJoin juga grup official Haruno Bot!\nGrup 1: ${_gc1}\n\nGrup 2: https://chat.whatsapp.com/FIorsXNysk91fkdaIst2HH\n\nGrup 3: https://chat.whatsapp.com/LIX42RUhLi15MBXhfvrF6K\n\n${watermark}`
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
      return conn.relayWAMessage(conn.prepareMessageFromContent(m.chat, {
        "listMessage": {
          "title": tulisan,
          "description": kamisato,
          "buttonText": "Click Here!",
          "listType": "SINGLE_SELECT",
          "sections": [
            { 
              "title": "Informasi dan List Menu Harunobot",
              "rows": [
                {
                  "title": "📖 ┃ Rules",
                  "description": "Baca rules sebelum menggunakan bot ya.",
                  "rowId": ".snk"
                }, {
                  "title": "❇️ ┃ Sewa",
                  "description": "Cara menambahkan bot ke group.",
                  "rowId": ".sewa"
                }, {
                  "title": "🧑‍💻 ┃ Owner",
                  "description": "Nomer owner bot nya, Kalau mau tanya tanya.",
                  "rowId": ".owner"
                }, {
                  "title": "📢 ┃ ChangeLog",
                  "description": "Perubahan/Update pada Harunobot.",
                  "rowId": ".changelog"
                },
                {
                  "title": `🧾┃All Commands`,
                  "description": "Semua perintah pada bot.",
                  "rowId": ".? all"
                }, {
                  "title": "🏫 ┃ Edukasi",
                  "description": "Menu Edukasi",
                  "rowId": ".? edukasi"
                } ,{
                  "title": "🎮 ┃ Game",
                  "description": "Menu Game",
                  "rowId": ".? game"
                }, {
                  "title": "_*New*_ 🗺️ ┃ RPG Game",
                  "description": "Mainkan RPG Game",
                  "rowId": ".genshin"
                }, {
                  "title": "⛩️ ┃ Weebs Menu",
                  "description": "Menu Wibu Untuk Ras Terkuat",
                  "rowId": ".? weebs"
                }, {
                  "title": "🔞 ┃ NSFW Menu",
                  "description": "Menu NSFW",
                  "rowId": ".? nsfw"
                }, 
                {
                  "title": "🪙 ┃ XP",
                  "description": "Menu XP",
                  "rowId": ".? xp"

                }, {
                  "title": "🌠 ┃ Stiker",
                  "description": "Menu Stiker",
                  "rowId": ".? stiker"
                }, {
                  "title": "🐚 ┃ Kerang Ajaib",
                  "description": "Puja kerang ajaib...",
                  "rowId": ".? kerangajaib"
                }, {
                  "title": "💬 ┃ Quotes",
                  "description": "Menu Quotes",
                  "rowId": ".? quotes"
                }, {
                  "title": "🧧 ┃ Admin",
                  "description": "Menu Admin Group",
                  "rowId": ".? admin"
                }, {
                  "title": "👥 ┃ Grup",
                  "description": "Menu Group",
                  "rowId": ".? grup"
                }, {
                  "title": "💎 ┃ Premium",
                  "description": "Menu User Premium",
                  "rowId": ".? premium"
                }, {
                  "title": "🌐 ┃ Internet",
                  "description": "Menjelajahi Internet...",
                  "rowId": ".? internet"
                }, {
                  "title": "❓ ┃ Anonymous",
                  "description": "Mainkan Anonymous Chat",
                  "rowId": ".? anonymous"
                }, {
                  "title": "🖋️ ┃ Nulis & Logo",
                  "description": "Mari Menulis",
                  "rowId": ".? nulis"
                }, {
                  "title": "⬇️ ┃ Downloader",
                  "description": "Menu Downloader",
                  "rowId": ".? downloader"
                }, {
                  "title": "🔧 ┃ Tools",
                  "description": "Tch Manusia Hanyalah Alat",
                  "rowId": ".? tools"
                }, {
                  "title": "🎇 ┃ Fun",
                  "description": "Menu Fun",
                  "rowId": ".? fun"
                }, {
                  "title": "📂 ┃ Database",
                  "description": "Menu Database",
                  "rowId": ".? database"
                }, {
                  "title": "📝 ┃ Vote & Absen",
                  "description": "Menu Vote & Absen",
                  "rowId": ".? vote"
                }, {
                  "title": "🕋 ┃ Islamic",
                  "description": "Menu Islamic",
                  "rowId": ".? islamic"
                }, {
                  "title": "🎙️ ┃ Pengubah Suara",
                  "description": "Menu Pengubah Suara",
                  "rowId": ".? audio"
                }, {
                  "title": "🤖 ┃ Jadi Bot",
                  "description": "Menu Jadibot",
                  "rowId": ".? jadibot"
                }, {
                  "title": "ℹ️ ┃ Info",
                  "description": "Menu Informasi",
                  "rowId": ".? info"
                }, {
                  "title": "0️⃣ ┃ Tanpa Kategori",
                  "description": "Menu Tanpa Kategori",
                  "rowId": ".? tanpakategori"
                }, {
                  "title": "🧑‍💻 ┃ Owner",
                  "description": "Menu Khusus Owner",
                  "rowId": ".? owner"
                }
              ]
            }
          ], "contextInfo": {
            "stanzaId": m.key.id,
            "participant": m.sender,
            "quotedMessage": m.message
          }
        }
      }, {}), { waitForAck: true })
    }
    // gunakan ini jika kamu menggunakan whatsapp bisnis
    //   throw `
    // ┌〔 DAFTAR MENU 〕
    // ├ ${_p + command} all
    // ├ ${_p + command} game
    // ├ ${_p + command} xp
    // ├ ${_p + command} stiker
    // ├ ${_p + command} kerang
    // ├ ${_p + command} quotes
    // ├ ${_p + command} admin
    // ├ ${_p + command} group
    // ├ ${_p + command} premium
    // ├ ${_p + command} internet
    // ├ ${_p + command} anonymous
    // ├ ${_p + command} nulis
    // ├ ${_p + command} downloader
    // ├ ${_p + command} tools
    // ├ ${_p + command} fun
    // ├ ${_p + command} database
    // ├ ${_p + command} vote
    // ├ ${_p + command} quran
    // ├ ${_p + command} audio
    // ├ ${_p + command} jadibot
    // ├ ${_p + command} info
    // ├ ${_p + command} tanpa kategori
    // ├ ${_p + command} owner
    // └────  
    //     `.trim()
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Siap un7utuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    await conn.send2ButtonLoc(m.chat, await (await fetch(fla + teks)).buffer(), text.trim(), watermark, 'Pemilik Bot', '.owner', 'Donasi', '.donasi', m, { contextInfo:{externalAdReply: {title: 'Haruno', sourceUrl: sumberurl, body: deskripsiurl, thumbnail: gambar}}})
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(1)
const readMore = more.repeat(1)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "Selamat dinihari"
  if (time >= 4) {
    res = "Selamat pagi"
  }
  if (time > 10) {
    res = "Selamat siang"
  }
  if (time >= 15) {
    res = "Selamat sore"
  }
  if (time >= 18) {
    res = "Selamat malam"
  }
  return res
}