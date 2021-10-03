let fetch = require('node-fetch')
let moment = require('moment-timezone')
let handler = async(m, { conn, usedPrefix, args, command }) => {
    let name = conn.getName(m.sender)
    let tulisan = `
Halo ${name}, ${ucapan()} selamat datang di menu panduan Haruno Bot. di menu ini kalian bisa mendapatkan panduan soal bot whatsapp.
┌〔 List Panduan 〕
├ how
├ owner
├ add
├ berlangganan
├ bot
└────
Penggunaan: ${usedPrefix + command} list panduan
contoh: ${usedPrefix + command} how
`.trim()
    if (!args[0]) await conn.sendButtonLoc(m.chat, await(await fetch(image)).buffer(), tulisan, watermark, 'Menu', '.menu', m)
    let json = JSON.parse(JSON.stringify(global.panduan))
    let { search, deskripsi, judul } = json.find(v => v.search == args[0])
        return conn.send3ButtonLoc(m.chat, await(await fetch(image)).buffer(), `No. ${index} ${judul}
${deskripsi}

Query: ${search}
`.trim(), watermark, 'Owner', '.owner', 'Menu', '.?', 'Rules', '.rules', m)
}
handler.tags = ['main']
handler.help = ['panduan']
handler.command = /^(panduan|how)$/i
module.exports = handler
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
global.panduan = [
    {
        "index": "1",
        "search": "owner",
        "deskripsi": "Owner atau Pemilik Bot adalah orang yang membuat bot. OWNER BUKANLAH BOT. chat owner apabila ada kepentingan atau ada yang perlu di tanyakan soal bot whatsapp.",
        "judul": "Penjelasan OWNER/PEMILIK BOT"
    },
    {
        "index": "2",
        "search": "how",
        "deskripsi": "Cara menggunakan bot adalah dengan mengetikkan command bot. List command bot ada pada menu bot. jangan lupa, untuk mengakses command harus menggunakan prefix.\nPrefix Haruno bot adalah all prefix.\nContoh penggunaan prefix dan command yang benar: *.menu*",
        "judul": "Cara menggunakan bot dan prefix"
    },
    {
        "index": "3",
        "search": "add",
        "deskripsi": "Cara menambahkan bot ke dalam group. silahkan baca pada menu sewa dengan mengetikkan *.sewa*. Haruno bot memberlakukan trial gratis 3 hari. Setelah 3 hari maka bot akan keluar dari group. ada opsi 1 minggu, 1 bulan dan 2 bulan berlangganan.",
        "judul": "Cara menambahkan bot ke group",
    },
    {
        "index": "4",
        "search": "berlangganan",
        "deskripsi": "Layanan berlangganan Haruno Bot adalah dengan menyewa bot dalam jumlah waktu ke dalam group. Untukm list harga/layanan silahkan baca pada *.sewa*",
        "judul": "Berlangganan"
    },
    {
        "index": "5",
        "search": "bot",
        "deskripsi": "Bot adalah sebuah program komputer yang dijalankan di lingkungan. Bot Whatsapp adalah program komputer yang di-aplikasikan di whatsapp. Bot whatsapp diharapkan dapat membantu beberapa aktifitas maupun sekedar untuk senang senang.",
        "judul": "Apa itu bot whatsapp"
    }
]