let fetch = require('node-fetch')

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let er = `
┌〔 Gacha 〕
├ waifu
├ neko
├ loli
├ elf
└────

example:
${usedPrefix + command} elf
credit: KhaelSan
    `.trim()

    switch (args[0].toLowerCase()) {
        case 'waifu':
        case 'neko':
        case 'loli':
        case 'elf':
		let res = await fetch(global.API('lolhum', '/api/random/' + args[0].toLowerCase(), {}, 'apikey'))
		m.reply(global.wait)
			if (!res.ok) throw await res.text()
			let img = await res.buffer()
			if (!img) throw img
				conn.sendButtonImg(m.chat, await(img), 'Nih ' + args[0].toLowerCase() + ' nya', watermark, '⏩Get Again', `${usedPrefix}gacha args[0].toLowerCase()`, m)
            break
        default:
            throw er
    }
}
handler.help = ['gacha'].map(v => v + ' <teks>')
handler.tags = ['gacha']
handler.command = /^gacha$/i

handler.limit = true

module.exports = handler
// credit: https://github.com/KhaelSan
