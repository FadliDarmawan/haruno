let handler = async (m, { conn, args, isAdmin }) => {
  let group = args[0] ? args[0] : m.chat
  if (/^[0-9]{5,16}-[0-9]+@g\.us$/.test(args[0])) group = args[0]
  if (!/^[0-9]{5,16}-[0-9]+@g\.us$/.test(group)) throw 'Hanya bisa dibuka di grup'
  let groupMetadata = await conn.groupMetadata(group)
  if (!groupMetadata) throw 'groupMetadata is undefined'
  if (!'participants' in groupMetadata) throw 'participants is not defined'
  let me = groupMetadata.participants.find(user => user.jid === conn.user.jid)
  if (!me) throw 'Aku tidak ada di grup itu :/'
  if (me.isAdmin !== true) throw 'Aku bukan admin T_T'
  if (db.data.chats[group].privatelink) {
      if (!isAdmin) await m.reply('Perintah ini hanya untuk *Admin* grup')
      if (isAdmin) await m.reply ('https://chat.whatsapp.com/' + await conn.groupInviteCode(group))
  } else if (!db.data.chats[group].privatelink) await m.reply ('https://chat.whatsapp.com/' + await conn.groupInviteCode(group))
}
handler.help = ['linkgroup']
handler.tags = ['group']
handler.command = /^link(gro?up)?$/i
module.exports = handler
