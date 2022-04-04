let { MessageType } = require('@adiwajshing/baileys')
let { sticker } = require('../lib/sticker')
let handler = m => m

let badwordRegex = /anj(k|g)|ajn?(g|k)|a?njin(g|k)|bajingan|b(a?n)?gsa?t|ko?nto?l|me?me?(k|q)|pe?pe?(k|q)|meki|titi(t|d)|pe?ler|tetek|toket|ngewe|go?blo?k|to?lo?l|idiot|(k|ng)e?nto?(t|d)|jembut|bego|dajj?al|janc(u|o)k|pantek|puki ?(mak)?|kimak|kampang|lonte|col(i|mek?)|pelacur|henceu?t|nigga|fuck|dick|bitch|tits|bastard|asshole/i // tambahin sendiri

handler.before = function (m, { isOwner, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return !0
    let chat = db.data.chats[m.chat]
    let isBadword = badwordRegex.exec(m.text)

    // this is image source for the sticker. you wanna add the image or delete something? change the let imgsource.
    let imagesource = ['https://telegra.ph/file/000a3dd59ba44fbd5dcc5.png', 'https://telegra.ph/file/5e6c349e909260d599f85.png']
    let selectedimage = imagesource[Math.floor(Math.random() * imagesource.length)]
    stiker = await sticker( false, selectedimage, packname, author)

    
    if (chat.badword && !chat.isBanned && isBadword) {
        await this.sendMessage(m.chat, sticker, MessageType.sticker, {
            quoted: m
        })
    }
    return !0
}
module.exports = handler