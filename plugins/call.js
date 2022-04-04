let fs = require('fs')
let handler = async(m, { conn, usedPrefix, args, command }) => {
    if(!(args[0] || args[1])) throw `Untuk mendapatkan data nilai, silahkan masukkan format [NIK Password].\nContoh: ${usedPrefix + command} 7346 Password`
    let json = JSON.parse(fs.readFileSync('./src/nilai.json'))
        let result = json.filter(
            function(json){return json.NIK === args[0]}
        )
        console.log(result)
            if (args[1] === result[0].Password) {
                throw `${result[0].Link}`
            } else {
                throw `Password anda salah.`
            }
}
handler.command = /^nilai$/i
module.exports = handler