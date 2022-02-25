var xa = require('xfarr-api')
let fetch = require('node-fetch')
let handler = async(m, { conn, usedPrefix, args, command }) => {
    if (!args[0]) throw `YoutubeのURLを入力してください! 例：${usedPrefix + command} https://youtu.be/vRPCAAUBMms [360/720]`
    if (args[1] === '480') {
        m.reply(wait)
        let data = await xa.Youtube(args[0])
        await conn.sendFile(m.chat, data.medias[1].url, `${data.title}` + '.mp4', `タイトル: ${data.title}\n間隔: ${data.duration}\n品質: 360p\n\n注：この機能（ytmp4）はまだ開発中です。現在、日本語でのみご利用いただけます。リリースバージョンがインドネシア語に翻訳されるとき。`.trim(), m)
    } else if (!args[1] || args[1] === '720') {
        m.reply(wait)
        let data = await xa.Youtube(args[0])
        await conn.sendFile(m.chat, data.medias[2].url, `${data.title}` + '.mp4', `タイトル: ${data.title}\n間隔: ${data.duration}\n品質: 720p\n\n注：この機能（ytmp4）はまだ開発中です。現在、日本語でのみご利用いただけます。リリースバージョンがインドネシア語に翻訳されるとき。`.trim(), m)
    } 
}
handler.help = ['ytdl <URL>']
handler.command = /^ytdl$/i
module.exports = handler