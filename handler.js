let util = require('util')
let fetch = require('node-fetch')
let simple = require('./lib/simple')
const uploadImage = require('./lib/uploadImage')
let { MessageType } = require('@adiwajshing/baileys')

const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(resolve, ms))
module.exports = {
  async handler(chatUpdate) {
    if (global.db.data == null) await global.loadDatabase()
    // console.log(chatUpdate)
    if (!chatUpdate.hasNewMessage) return
    if (!chatUpdate.messages && !chatUpdate.count) return
    let m = chatUpdate.messages.all()[0]
    try {
      simple.smsg(this, m)
      switch (m.mtype) {
        case MessageType.image:
        case MessageType.video:
        case MessageType.audio:
          if (!m.key.fromMe) await delay(1000)
          if (!m.msg.url) await this.updateMediaMessage(m)
          break
      }
      m.exp = 0
      m.limit = false
      try {
        let user = global.db.data.users[m.sender]
        if (typeof user !== 'object') global.db.data.users[m.sender] = {}
        if (user) {
          if (!isNumber(user.exp)) user.exp = 0
          if (!isNumber(user.limit)) user.limit = 10
          if (!('registered' in user)) user.registered = false
          if (!isNumber(user.lastclaim)) user.lastclaim = 0
          if (!user.registered) {
            if (!('name' in user)) user.name = this.getName(m.sender)
            if (!isNumber(user.nim)) user.age = -1
            if (!isNumber(user.regTime)) user.regTime = -1
          }
          if (!isNumber(user.afk)) user.afk = -1
          if (!('afkReason' in user)) user.afkReason = ''
          if (!('autolevelup' in user)) user.autolevelup = false
          if (!('banned' in user)) user.banned = false
          if (!('level' in user)) user.level = 0
          if (!('premium' in user)) user.premium = false
          if (!isNumber(user.premiumTime)) user.premiumTime = 0
          if (!('role' in user)) user.role = ''
          if (!isNumber(user.joincount)) user.joincount = 0
          if (!isNumber(user.call)) user.call = 0
          if (!isNumber(user.pc)) user.pc = 0
          if (!isNumber(user.reward)) user.reward = 0
          if (!isNumber(user.warning)) user.warnimg = 0
          if (!isNumber(user.dailyReward)) user.dailyReward = 0
        } else global.db.data.users[m.sender] = {
          exp: 0,
          limit: 10,
          registered: false,
          lastclaim: 0, 
          name: this.getName(m.sender),
          age: -1,
          regTime: -1,
          afk: -1,
          afkReason: '',
          autolevelup: false,
          banned: false,
          level: 0,
          premium: false,
          premiumTime: 0,
          role: '',
          joincount: 0,
          call: 0,
          pc: 0,
          reward: 0,
          dailyReward: 0, 
          warning: 0,
        }

        let chat = global.db.data.chats[m.chat]
        if (typeof chat !== 'object') global.db.data.chats[m.chat] = {}
        if (chat) {
          if (!('isBanned' in chat)) chat.isBanned = false
          if (!('welcome' in chat)) chat.welcome = true
          if (!('detect' in chat)) chat.detect = true
          if (!('sWelcome' in chat)) chat.sWelcome = ''
          if (!('sBye' in chat)) chat.sBye = ''
          if (!('sPromote' in chat)) chat.sPromote = ''
          if (!('sDemote' in chat)) chat.sDemote = ''
          if (!('antiLink' in chat)) chat.antiLink = true
          if (!('autoread' in chat)) chat.autoread = false
          if (!('broadcast' in chat)) chat.broadcast = true
          if (!('badword' in chat)) chat.badword = false
          if (!('delete' in chat)) chat.delete = true
          if (!('desc' in chat)) chat.desc = true
          if (!('getmsg' in chat)) chat.getmsg = false
          if (!isNumber(chat.expired)) chat.expired = 0
          if (!('stiker' in chat)) chat.stiker = false
          if (!('viewonce' in chat)) chat.viewonce = true
          if (!('nsfw' in chat)) chat.nsfw = false
        } else global.db.data.chats[m.chat] = {
          isBanned: false,
          welcome: true,
          detect: true,
          sWelcome: '',
          sBye: '',
          sPromote: '',
          sDemote: '',
          antiLink: true,
          autoread: false,
          broadcast: true,
          delete: true,
          desc: true,
          getmsg: false,
          expired: 0,
          stiker: false,
          viewonce: true,
          nsfw: true,
          badword: false,
        }

        let settings = global.db.data.settings[this.user.jid]
        if (typeof settings !== 'object') global.db.data.settings[this.user.jid] = {}
        if (settings) {
          if (!'anon' in settings) settings.anon = true
          if (!'anticall' in settings) settings.anticall = true
          if (!'statusUpdate' in settings) settings.statusUpdate = false
          if (!isNumber(settings.status)) settings.status = 0
          if (!'antispam' in settings) settings.antispam = true
          if (!'antitroli' in settings) settings.antitroli = true
          if (!'group' in settings) settings.group = false
          if (!'jadibot' in settings) settings.jadibot = false
          if (!'private' in settings) settings.private = false
          if (!'restrict' in settings) settings.restrict = false
          if (!'self' in settings) settings.self = false
          if (!'backup' in settings) settings.backup = true
          if (!isNumber(settings.backupDB)) settings.backupDB = 0
          if (!'trial' in settings) settings.trial = false
        } else global.db.data.settings[this.user.jid] = {
          anon: true,
          anticall: true,
          antispam: true,
          antitroli: true,
          group: false,
          jadibot: false,
          private: false,
          restrict: false,
          self: false,
          backup: true,
          backupDB: 0,
          statusUpdate: false,
          status: 0,
          trial: false,
        }
      } catch (e) {
        console.error(e)
      }
      if (opts['nyimak']) return
      if (!m.fromMe && opts['self']) return
      if (typeof m.text !== 'string') m.text = ''
      for (let name in global.plugins) {
        let plugin = global.plugins[name]
        if (!plugin) continue
        if (plugin.disabled) continue
        if (!plugin.all) continue
        if (typeof plugin.all !== 'function') continue
        try {
          await plugin.all.call(this, m, chatUpdate)
        } catch (e) {
          if (typeof e === 'string') continue
          console.error(e)
        }
      }
      if (m.isBaileys) return
      if (m.chat.endsWith('broadcast')) return // Supaya tidak merespon di status
      let blockList = conn.blocklist.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)
      if (blockList.includes(m.sender)) return // Pengguna yang diblokir tidak bisa menggunakan bot
      m.exp += Math.ceil(Math.random() * 10)
      let hakoen = await fetch('https://raw.githubusercontent.com/FadliDarmawan/haruno-server/main/files/global.json')
      let hako = await hakoen.json()
      let usedPrefix
      let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]

      let isROwner = [global.conn.user.jid, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || hako.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
      let isOwner = isROwner || m.fromMe
      let isPrems = isROwner || db.data.users[m.sender].premium
      if (!isPrems && !m.isGroup && global.db.data.settings.groupOnly) return
      let groupMetadata = m.isGroup ? this.chats.get(m.chat).metadata || await this.groupMetadata(m.chat) : {} || {}
      let participants = m.isGroup ? groupMetadata.participants : [] || []
      let user = m.isGroup ? participants.find(u => u.jid == m.sender) : {} // User Data
      let bot = m.isGroup ? participants.find(u => u.jid == this.user.jid) : {} // Data Kamu (bot)
      let isAdmin = user.isAdmin || user.isSuperAdmin || false // Apakah user admin?
      let isBotAdmin = bot.isAdmin || bot.isSuperAdmin || false // Apakah kamu (bot) admin?
      let isBlocked = this.blocklist.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != this.user.jid).includes(m.sender) // Apakah user diblokir?
      for (let name in global.plugins) {
        let plugin = global.plugins[name]
        if (!plugin) continue
        if (plugin.disabled) continue
        if (!opts['restrict']) if (plugin.tags && plugin.tags.includes('admin')) continue
        const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
        let match = (_prefix instanceof RegExp ? // RegExp Mode?
          [[_prefix.exec(m.text), _prefix]] :
          Array.isArray(_prefix) ? // Array?
            _prefix.map(p => {
              let re = p instanceof RegExp ? // RegExp in Array?
                p :
                new RegExp(str2Regex(p))
              return [re.exec(m.text), re]
            }) :
            typeof _prefix === 'string' ? // String?
              [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
              [[[], new RegExp]]
        ).find(p => p[1])
        if (typeof plugin.before === 'function') if (await plugin.before.call(this, m, {
          match,
          conn: this,
          participants,
          groupMetadata,
          user,
          bot,
          isROwner,
          isOwner,
          isAdmin,
          isBotAdmin,
          isPrems,
          chatUpdate,
          isBlocked,
        })) continue
        if (typeof plugin !== 'function') continue
        if ((usedPrefix = (match[0] || '')[0])) {
          let noPrefix = m.text.replace(usedPrefix, '')
          let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
          args = args || []
          let _args = noPrefix.trim().split` `.slice(1)
          let text = _args.join` `
          command = (command || '').toLowerCase()
          let fail = plugin.fail || global.dfail // Ketika gagal
          let isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
            plugin.command.test(command) :
            Array.isArray(plugin.command) ? // Array?
              plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
                cmd.test(command) :
                cmd === command
              ) :
              typeof plugin.command === 'string' ? // String?
                plugin.command === command :
                false

          if (!isAccept) continue
          m.plugin = name
          if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
            let chat = global.db.data.chats[m.chat]
            let user = global.db.data.users[m.sender]
            if (!['unbanchat.js', 'profile.js'].includes(name) && chat && chat.isBanned && !isPrems) return // Kecuali ini, bisa digunakan
            if (!['unbanchat.js', 'profile.js'].includes(name) && user && user.banned) return
          }
          if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Keduanya Owner
            fail('owner', m, this)
            continue
          }
          if (plugin.rowner && !isROwner) { // Owner sebenarnya
            fail('rowner', m, this)
            continue
          }
          if (plugin.owner && !isOwner) { // Owner bot
            fail('owner', m, this)
            continue
          }
          if (plugin.premium && !isPrems) { // Premium
            fail('premium', m, this)
            continue
          }
          if (plugin.group && !m.isGroup) { // Hanya grup
            fail('group', m, this)
            continue
          } else if (plugin.botAdmin && !isBotAdmin) { // Kamu Admin
            fail('botAdmin', m, this)
            continue
          } else if (plugin.admin && !isAdmin) { // User Admin
            fail('admin', m, this)
            continue
          }
          if (plugin.private && m.isGroup) { // Hanya Private Chat
            fail('private', m, this)
            continue
          }
          if (plugin.register == true && _user.registered == false) { // Butuh daftar?
            fail('unreg', m, this)
            continue
          }
          if (plugin.nsfw && !global.db.data.settings.nsfw) { // Nsfw
            fail('nsfw', m, this)
            continue
          }

          m.isCommand = true
          let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17 // Pendapatkan XP per Command
          if (xp > 200) m.reply('Ngecit -_-') // Hehehe
          else m.exp += xp
          if (!isPrems && plugin.limit && global.db.data.users[m.sender].limit < plugin.limit * 1) {
            this.reply(m.chat, `Limit kamu habis, silahkan beli melalui *${usedPrefix}buy*`, m)
            continue // Limit habis
          }
          if (plugin.level > _user.level) {
            this.reply(m.chat, `diperlukan level ${plugin.level} untuk menggunakan perintah ini. Level kamu ${_user.level}`, m)
            continue // Jika levelnya belum tercapai
          }
          let extra = {
            match,
            usedPrefix,
            noPrefix,
            _args,
            args,
            command,
            text,
            conn: this,
            participants,
            groupMetadata,
            user,
            bot,
            isROwner,
            isOwner,
            isAdmin,
            isBotAdmin,
            isPrems,
            chatUpdate,
            isBlocked,
          }
          try {
            await plugin.call(this, m, extra)
            if (!isPrems) m.limit = m.limit || plugin.limit || false
          } catch (e) {
            // Terjadi kesalahan
            m.error = e
            console.error(e)
            if (e) {
              let text = util.format(e.message ? e.message : e)
              for (let key of Object.values(global.APIKeys))
                text = text.replace(new RegExp(key, 'g'), 'apikey')
              m.reply(text)
            }
          } finally {
            // m.reply(util.format(_user))
            if (typeof plugin.after === 'function') {
              try {
                await plugin.after.call(this, m, extra)
              } catch (e) {
                console.error(e)
              }
            }
            // if (m.limit) m.reply(+ m.limit + ' Limit terpakai') // Jadikan sebagai komentar jika kamu risih dengan pesan ini
          }
          break
        }
      }
    } finally {
      //console.log(global.db.data.users[m.sender])
      let user, stats = global.db.data.stats
      if (m) {
        if (m.sender && (user = global.db.data.users[m.sender])) {
          user.exp += m.exp
          user.limit -= m.limit * 1
        }

        let stat
        if (m.plugin) {
          let now = + new Date
          if (m.plugin in stats) {
            stat = stats[m.plugin]
            if (!isNumber(stat.total)) stat.total = 1
            if (!isNumber(stat.success)) stat.success = m.error != null ? 0 : 1
            if (!isNumber(stat.last)) stat.last = now
            if (!isNumber(stat.lastSuccess)) stat.lastSuccess = m.error != null ? 0 : now
          } else stat = stats[m.plugin] = {
            total: 1,
            success: m.error != null ? 0 : 1,
            last: now,
            lastSuccess: m.error != null ? 0 : now
          }
          stat.total += 1
          stat.last = now
          if (m.error == null) {
            stat.success += 1
            stat.lastSuccess = now
          }
        }
      }

      try {
        require('./lib/print')(m, this)
      } catch (e) {
        console.log(m, m.quoted, e)
      }
      if (opts['autoread']) await this.chatRead(m.chat).catch(() => { })
    }
  },
  async participantsUpdate({ jid, participants, action }) {
    let chat = global.db.data.chats[jid] || {}
    let text = ''
    switch (action) {
        case 'add':
        case 'remove':
          if (chat.welcome) {
            let groupMetadata = await this.groupMetadata(jid)
            for (let user of participants) {
              let pp = await(await fetch('https://telegra.ph/file/39bbded9693c9338069fd.jpg')).buffer()
              let kai = await(await fetch('https://telegra.ph/file/4d2bca79fa5a4f2dd3d81.jpg')).buffer()
              try {
                pp = await ( await fetch(await this.getProfilePicture(user))).buffer()
              } catch (e) {
              } finally {
              text = (action === 'add' ? (chat.sWelcome || this.welcome || conn.welcome || 'ようこそ Youkuso, @user!').replace('@subject', this.getName(jid)).replace('@desc', groupMetadata.desc) :
                  (chat.sBye || this.bye || conn.bye || '左様なら Sayounara, @user!')).replace(/@user/g, '@' + user.split`@`[0])
                let wel = `Welcome Message`
                let lea = `Group Participant Leave`
                this.reply(jid, text, 0, { thumbnail: kai, contextInfo: {
                mentionedJid: [user],
                externalAdReply: {
                  mediaUrl: 'https://youtu.be/-tKVN2mAKRI',
                  title: action === 'add' ? wel : lea,
                  body: 'Haruno Bot',
                  thumbnail: pp
                }
              }}) 
            }
          }
          }
          break
      case 'promote':
        text = (chat.sPromote || this.spromote || conn.spromote || '@user sekarang Admin')
      case 'demote':
        if (!text) text = (chat.sDemote || this.sdemote || conn.sdemote || '@user sekarang bukan Admin')
        text = text.replace('@user', '@' + participants[0].split`@`[0])
        if (chat.detect) this.sendMessage(jid, text, MessageType.extendedText, {
          contextInfo: {
            mentionedJid: this.parseMention(text)
          }
        })
        break
    }
  },
  async delete(m) {
    let chat = global.db.data.chats[m.key.remoteJid]
    if (chat.delete) return
    await this.sendButton(m.key.remoteJid, `
Terdeteksi @${m.participant.split`@`[0]} telah menghapus pesan
ketik *.on delete* untuk mematikan pesan ini
`.trim(), watermark, 'Matikan Antidelete', ',on delete', m.message)
    this.copyNForward(m.key.remoteJid, m.message).catch(e => console.log(e, m))
  },
  async onCall(json) {
    if (!db.data.settings[this.user.jid].anticall) return
    let jid = json[2][0][1]['from']
    let isOffer = json[2][0][2][0][0] == 'offer'
    let users = global.db.data.users
    let user = users[jid] || {}
    if (user.whitelist) return
    if (jid && isOffer) {
      const tag = this.generateMessageTag()
      const nodePayload = ['action', 'call', ['call', {
        'from': this.user.jid,
        'to': `${jid.split`@`[0]}@s.whatsapp.net`,
        'id': tag
      }, [['reject', {
        'call-id': json[2][0][2][0][1]['call-id'],
        'call-creator': `${jid.split`@`[0]}@s.whatsapp.net`,
        'count': '0'
      }, null]]]]
      this.sendJSON(nodePayload, tag)
      this.reply(jid, `Kamu dibanned karena menelpon nomor bot, Kontak owner untuk me-unban.\n\nOwner:\nwa.me/${owner[0]}\nwa.me/${owner[1]}\n\n${watermark}`, null).then(async() => {
        user.banned = true
        // await this.blockUser(jid, 'add') // silahkan di un-command jika ingin auto block, tapi katanya agak rawan ban
      })
    }
  },
  async GroupUpdate({ jid, desc, descId, descTime, descOwner, announce }) {
    if (!db.data.chats[jid].desc) return
    if (!desc) return
    let caption = `
    @${descOwner.split`@`[0]} telah mengubah deskripsi grup.
    ${desc}
        `.trim()
    this.sendButton(jid, caption, watermark, 'Matikan', ',off desc')

  }
}

global.dfail = (type, m, conn) => {
  let msg = {
    rowner: 'This command only can used by _*Owner!*_\nPerintah ini hanya dapat digunakan oleh _*Owner!*_',
    owner: 'This command only can used by _*Owner!*_\nPerintah ini hanya dapat digunakan oleh _*Owner!*_',
    premium: 'This command only can used by _*Premium Users.*_\nPerintah ini hanya dapat digunakan oleh _*User Premium.*_',
    group: 'This command only can used in Group.\nPerintah ini hanya dapat digunakan di Group.',
    private: 'This command only can used in Private Chat.\nPerintah ini hanya dapat digunakan di Chat Pribadi.',
    admin: 'This command only can used by *Group Admin.*\nPerintah ini hanya dapat digunakan oleh *Admin Group.*',
    botAdmin: 'Make the bot number as a group admin to use this command.\nJadikan bot sebagai admin untuk menggunakan perintah ini.',
    unreg: 'Silahkan daftar untuk menggunakan fitur ini dengan cara mengetik:\n\n*#daftar nama.umur*\n\nContoh: *#daftar Arif.19*',
    nsfw: 'NSFW doesnt active.\nNSFW tidak aktif.'
  }[type]
  if (msg) return m.reply(msg)
}

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Memperbarui 'handler.js'"))
  delete require.cache[file]
  if (global.reloadHandler) console.log(global.reloadHandler())
})
