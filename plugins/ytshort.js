const xa = require('xfarr-api')
const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)?youtube(?:\-nocookie|)\.com\/(?:shorts\/)?(?:watch\?.*(?:|\&)v=|embed\/|v\/)?|youtu\.be\/)([-_0-9A-Za-z]{11})/
let handler = async(m, { conn, usedPrefix, args, command }) => {
    if (!args[0]) throw `Masukkan URL ytshort yang ingin di download!\n\nContoh: ${usedPrefix+ command} https://youtube.com/shorts/MHZe4akQVHI?feature=share`
    let [_, code] = args[0].match(ytIdRegex) || []
    if (!code) throw `URL salah! Fitur ini khusus untuk menndownload youtube shorts.\n\nContoh: ${usedPrefix + command} https://youtube.com/shorts/MHZe4akQVHI?feature=share`
    xa.Youtube(args[0])
    .then(data => {
        conn.sendFile(m.chat, data.medias[2].url, 'yts.mp4', watermark, m)
    })
}
handler.help = ['ytshort <url>']
handler.tags = ['downloader']
handler.command = /^ytshort|youtubeshort$/i
module.exports = handler