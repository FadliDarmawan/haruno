const roles = {
    /*
    'Role Name': <Minimal Level To Obtain this Role>
    */
    'Hyaktaku V': 0,
    'Hyaktaku IV': 5,
    'Hyaktaku III': 10,
    'Hyaktaku II': 15,
    'Hyaktaku I': 20,
    'Koshigakka V': 25,
    'Koshigakka IV': 30,
    'Koshigakka III': 35,
    'Koshigakka II': 40,
    'Koshigakka I': 45,
    'Teikatsuka V': 50,
    'Teikatsuka IV': 55,
    'Teikatsuka III': 60,
    'Teikatsuka II': 65,
    'Teikatsuka I': 70,
    'Hikarigakka V': 75,
    'Hikarigakka IV': 80,
    'Hikarigakka III': 85,
    'Hikarigakka II': 90,
    'Hikarigakka I': 95,
    'Tenno V': 100,
    'Tenno IV': 105,
    'Tenno III': 110,
    'Tenno II': 115,
    'Tenno I': 120,
    'Kiagakka V': 125,
    'Kiagakka IV': 130,
    'Kiagakka III': 135,
    'Kiagakka II': 140,
    'Kiagakka I': 145,
    'Hoshikara V': 150,
    'Hoshikara IV': 155,
    'Hoshikara III': 160,
    'Hoshikara II': 165,
    'Hoshikara I': 170,
    'Sepuh': 175,
    'Kami-sama': 180
}

module.exports = {
    before(m) {
        let user = db.data.users[m.sender]
        let level = user.level
        let role = (Object.entries(roles).sort((a, b) => b[1] - a[1]).find(([, minLevel]) => level >= minLevel) || Object.entries(roles)[0])[0]
        user.role = role
        return !0
    }
}