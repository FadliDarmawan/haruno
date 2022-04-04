const { servers, yta, ytv } = require('../lib/y2mate')
const { igdl, pin } = require('../lib/scrape')
const fetch = require('node-fetch')
const xa = require('xfarr-api')
let yts = require('yt-search')
let util = require('util')
let handler = m => m

handler.all = async function (m, { isPrems }) {

    if (m.chat.endsWith('broadcast')) return
    if (db.data.users[m.sender].banned) return
    if (db.data.chats[m.chat].isBanned) return
    if (!db.data.chats[m.chat].download) return

    let url = m.text.split(/\n| /i)[0]

    if (/^.*vt.tiktok.com/i.test(m.text)) {
        xa.Tiktok(url)
        .then(data => { 
            conn.sendButtonVid(m.chat, data.medias[1].url, 'Tiktok downloader', watermark, 'Disable autodownload', '.disable download', m)
        })
    }

    if (/^.*(fb.watch|facebook.com)/i.test(m.text)) {
        xa.facebook(url)
        .then(data => {
            conn.sendButtonVid(m.chat, data.medias[1].url, 'Facebook downloader', watermark, 'Disable autodownload', '.disable download', m)
        })
    }

    if (/^.*instagram.com\/(p|reel|tv)/i.test(m.text)) {
        igdl(url).then(async res => {
            let igdl = JSON.stringify(res)
            let json = JSON.parse(igdl)
            await m.reply(wait)
            for (let { downloadUrl, type } of json) {
                this.sendFile(m.chat, downloadUrl, 'ig' + (type == 'image' ? '.jpg' : '.mp4'), watermark, m, 0, { thumbnail: await (await fetch(downloadUrl)).buffer() })
            }
        }).catch(_ => _)
    }

    if (/^.*(pinterest.com\/pin|pin.it)/i.test(m.text)) {
        pin(url).then(async res => {
            let pin = JSON.stringify(res)
            let json = JSON.parse(pin)
            if (!json.status) return m.reply(eror)
            await m.reply(wait)
            m.reply(util.format(json))
            await this.sendFile(m.chat, json.data.url, '', watermark, m)
        }).catch(_ => _)
    }

    if (/^https?:\/\/.*youtu.be/i.test(m.text)) {
        let results = await yts(url)
        let vid = results.all.find(video => video.seconds < 3600)
        if (!vid) return m.reply('Video/Audio Tidak ditemukan')
        let yt = false
        let usedServer = servers[0]
        for (let i in servers) {
            let server = servers[i]
            try {
                yt = await yta(vid.url, server)
                yt2 = await ytv(vid.url, server)
                usedServer = server
                break
            } catch (e) {
                m.reply(`Server ${server} error!${servers.length >= i + 1 ? '' : '\nmencoba server lain...'}`)
            }
        }
        if (yt === false) return m.reply(eror)
        if (yt2 === false) return m.reply(eror)
        let { dl_link, thumb, title, filesize, filesizeF } = yt
        await this.send2ButtonImg(m.chat, await (await fetch(thumb)).buffer(), `
Judul: ${title}
Filesize audio: ${filesizeF}
Filesize video: ${yt2.filesizeF}
`.trim(), watermark, 'Audio', `.yta ${vid.url}`, 'Video', `.yt ${vid.url}`, 'Disable autodwownload', '.disable download', m)
    }
}

handler.limit = false
module.exports = handler