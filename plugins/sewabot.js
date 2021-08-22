let fetch = require('node-fetch')
let { MessageType } = require('@adiwajshing/baileys')
let handler = async(m, { conn }) => {
    let kamisato = `┌ 「 Sewa 」
│ ✅Dapatkan fitur khusus premium.
│ ✅Masukkan bot ke group anda.
│
│ © Haruno
└────
Pembayaran:
Saweria: https://saweria.co/FadliStudio (+5.000)
Pulsa (XL): 6281943265086 (+5.000)
GoPay: 628112958665
Dana: 628112958665
OVO: 628112958665
    
「Syarat dan Ketentuan」
1. Bot akan keluar jika sudah waktu nya keluar
2. Jangan di kick
3. Mematuhi syarat dan ketentuan bot pada #rules
4. Di larang mengirimkan sesuatu yang mengganggu, contoh: virtex, berbagai macam bug.
5. Di larang spam dalam penggunaan
    `.trim()
    const button = {
        buttonText: 'List Harga',
        description: kamisato,
        sections:  [{title: "Silahkan di pilih", rows: [
        {title: 'Premium', description: "Rp20.000\nDapatkan fitur premium.", rowId:".premium"},
        {title: 'Permanen', description: "Rp15.000\nSewa bot tanpa batasan waktu.", rowId:".permanen"},
        {title: '1 Bulan', description: "Rp10.000\nSewa bot selama 1 bulan.", rowId:".masuk"},
        {title: '1 Minggu', description: "Rp7.000\nSewa bot selama 1 minggu.", rowId:".masuk"},
        {title: 'Trial', description: "GRATIS\nBot gratis 3 Hari.", rowId:".masuk"},
        {title: 'OWNER', description: "Chat owner nya.", rowId:".owner"},
       ] }],
        listType: 1
       }
    conn.sendMessage(m.chat, button, MessageType.listMessage)
}
handler.tags = ['main']
handler.command = /^(sewa)$/i
handler.help = ['sewa']
module.exports = handler
//Haruno Bot
