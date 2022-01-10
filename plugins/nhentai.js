const nhentai = require('nhentai-node-api')
const request = require('request')
const topdf = require('image-to-pdf')
let fetch = require('node-fetch')
let fs = require('fs')

let handler = async(m, { conn, usedPrefix, command, args }) => {
	if(!args[0]) throw `Masukkan kode nya!\n\nContoh: ${usedPrefix + command} 257326`
	let count = 0
	let ResultPdf = []
	let doujin = await nhentai.getDoujin(args[0])
	let title = doujin.title.default
	let native = doujin.title.native
	let details = doujin.details
	let array_page = doujin.pages
	let cover = doujin.cover
	let language = doujin.language
	let parodies = details.parodies.map(v => v.name).join(', ')
	let groups = details.groups.map(v => v.name).join(', ')
	let artists = details.artists.map(v => v.name).join(', ')
	let tag = details.tags.map(v => v.name).join(', ')
	let categories = details.categories.map(v => v.name).join(', ')
	let capton = `
Doujin Downloader
${title}
Language: ${language}
Parody: ${parodies}
Group: ${groups}
Artist: ${artists}
Tag: ${tag}
Category: ${categories}
Favorited: ${doujin.favourites}
`.trim()
	if(!args[1]) {
	await conn.send2ButtonImg(m.chat, await(await fetch(cover)).buffer(), capton, watermark, 'Download PDF', `${usedPrefix + command} ${args[0]} -d`, 'Read online', `${usedPrefix + command} ${args[0]} -o`, m)
	} else if(args[1] === '-d') {
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

handler.command = /^nhentai|doujin$/i
handler.help = ['nhentai <kode>']
handler.tags = ['downloader']
module.exports = handler