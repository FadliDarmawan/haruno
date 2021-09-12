function handler(m) {
  this.sendContact(m.chat, global.owner[0], this.getName(global.owner[0] + '@s.whatsapp.net'), m)
  this.sendContact(m.chat, '6282215569001', 'Zaki', m)
}
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

module.exports = handler
