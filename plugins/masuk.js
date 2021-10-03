function handler(m) {
    m.reply('Konfirmasi ke owner untuk informasi lebih lanjut.')
    this.sendContact(m.chat, global.owner[0], this.getName(global.owner[0] + '@s.whatsapp.net'), m)
    this.sendContact(m.chat, '6288215569001@s.whatsapp.net', 'Zaki', m)
  }
  handler.command = /^(masuk)$/i
  
  module.exports = handler
  