const uploadImage = require('../lib/uploadImage')
let fs = require('fs')
let handler = async(m, { conn, text, usedPrefix, command }) => {
    const json = JSON.parse(fs.readFileSync('./src/toko.json'))
    let [t, n, d] = text.split`|`
    if (!t) throw `Ketik ${usedPrefix + command} <judul>|<nomor>|<desc>`
    if (!n) throw `Ketik ${usedPrefix + command} <judul>|<nomor>|<desc>`
    if (!d) throw `Ketik ${usedPrefix + command} <judul>|<nomor>|<desc>`
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `Reply foto dengan caption ${usedPrefix + command} <judul>|<nomor>|<desc>`
    let media = await q.download()
    let url = await uploadImage(media)
    json.push({name: t, desc: d, jual: n, img: url})
    fs.writeFileSync('./src/toko.json', JSON.stringify(json))
    m.reply('Ok, sudah tersimpan.')
}
handler.command = /tambah$/i
handler.tags = ['main']
handler.help = ['tambah <judul>|<nomor>|<desc>']
module.exports = handler