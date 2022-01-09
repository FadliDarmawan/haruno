const nhentai = require('nhentai-node-api')
const request = require('request')
const topdf = require('image-to-pdf')
let fetch = require('node-fetch')
let fs = require('fs')

let handler = async(m, { conn, usedPrefix, command, args }) => {
	if(!args[0]) throw `Masukkan kode nya!\n\nContoh: ${usedPrefix + command} 257326`
	let count = 0
	let ResultPdf = []
	let doujin = await nhentai.getDoujin
	let title = doujin.title.default
	let native = doijin.title.native
	let details = doujin.details
	let array_page = doujin.pages
	let cover = doujin.cover
	let language = doujin.language
	let favorites = doujin.favourites
	let capton = `
Doujin Downloader
${title} ${native}
Language: ${language}
Parody: ${details.parodies}
Group: ${details.groups}
Artist: ${details.artists}
Tag: ${details.tags}
Category: ${details.categories}
Favorited: ${doujin.favorites}

Cara membuka Internet Positif menggunakan Chrome tanpa VPN
https://telegra.ph/Cara-membuka-Internet-Positif-menggunakan-Chrome-12-23
`.trim()
	await conn.send2ButtonLoc(m.chat, await(await fetch(cover)).buffer(), capton, watermark, 'Download PDF', `.${usedPrefix + command} ${args[0]} -d`, 'Read online', `.${usedPrefix + command} ${args[0]} -o`, m)
	if(args[1] === '-d') {
		m.reply('Sedang mengambil data.\nHarap tunggu sekitar 1~5 menit...')
		for (let index = 0; index < array_page.length; index++) {
			if (!fs.existsSync('./nhentai')) fs.mkdirSync('./nhentai')
			let image_name = './nhentai/' + title + index + '.jpg'
			await new Promise((resolve) => request(array_page[index]).pipe(fs.createWriteStream(image_name)).on('finish', resolve))
			console.log(array_page[index])
			ResultPdf.push(image_name)
			count++
		}
	await new Promise((resolve) =>
			topdf(ResultPdf, 'A4')
			.pipe(fs.createWriteStream('./nhentai/' + title + '.pdf'))
			.on('finish', resolve)
		)

		for (let index = 0; index < array_page.length; index++) {
			fs.unlinkSync('./nhentai/' + title + index + '.jpg')
		}
	m.reply('Sedang mengirim file PDF...')
	let thumbnail = await (await fetch(doujin.cover)).buffer()
	await conn.sendFile(m.chat, fs.readFileSync(`./nhentai/${title}.pdf`), `${title}.pdf`, '', m, false, { asDocument: true, thumbnail: thumbnail })
		.then(() => fs.unlinkSync(`./nhentai/${title}.pdf`))
	} else if (args[1] === '-o') {
		m.reply(`Silahkan buka link untuk membaca secara online.\nhttps://hiken.xyz/v/${args[0]}`)
	}
}

handler.command = /^nh(entai)|nh|doujin$/i
handler.help = ['nhentai <kode>']
handler.tags = ['downloader']
module.exports = handler