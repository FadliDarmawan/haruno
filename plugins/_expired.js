let handler = m => m
let image = 'https://r1---sn-cp1oxu-tp5e.googlevideo.com/videoplayback?expire=1631201120&ei=ANM5YbW1KKeq6QKzuIuIDQ&ip=35.202.34.43&id=o-ADYVYX_WvBMgS9yc6B2Lg3bCMub6MdgAX2g21NkgtAL4&itag=18&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&ns=oJtgiKQ2CSChAoRbKRcNnA8G&gir=yes&clen=15231007&ratebypass=yes&dur=360.977&lmt=1603111443440867&fexp=24001373,24007246&c=WEB&txp=5531422&n=k2x-JCLdK8af1gZSjN&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAI6tcaHA-bduxkKw7hn0INm_koMrTbc0PMngQITV8co1AiB0-9m2e0UmVrJDm_N-yYzcXBcHC8WxnSR6ZU0UKhCrTA%3D%3D&redirect_counter=1&rm=sn-qxoss7e&req_id=26b6026735f1a3ee&cms_redirect=yes&ipbypass=yes&mh=jr&mip=182.253.163.26&mm=31&mn=sn-cp1oxu-tp5e&ms=au&mt=1631179258&mv=m&mvi=1&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIgQEdx8_Mxi2zvxAsUw5LxB_yQfojaz6TucNqD3Jj7cGACIQDf_pN2HCZF9ePSz7zKgtZyY0DGIap_BIu5UQ3JSJGyeQ%3D%3D'
handler.before = async function (m) {

    if (m.isGroup && db.data.chats[m.chat].expired != 0) {
        if (new Date() * 1 >= db.data.chats[m.chat].expired) {
            this.sendFile(m.chat, await(await fetch(image)).buffer(), '', `waktu *${this.user.name}* di grup sudah habis, Sayonara`, null).then(() => {
                this.sendContact(m.chat, owner[0], this.getName(owner[0] + '@s.whatsapp.net')).then(() => {
                    this.groupLeave(m.chat).then(() => {
                        db.data.chats[m.chat].expired = 0
                    })
                })
            })
        }
    }
}

module.exports = handler