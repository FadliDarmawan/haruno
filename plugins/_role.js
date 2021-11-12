let handler = m => m

handler.before = function (m) {
    let user = global.db.data.users[m.sender]
    let role = (user.level <= 3) ? 'Hyaktaku V'
        : ((user.level >= 3) && (user.level <= 6)) ? 'Hyaktaku IV'
            : ((user.level >= 6) && (user.level <= 9)) ? 'Hyaktaku III'
                : ((user.level >= 9) && (user.level <= 12)) ? 'Hyaktaku II'
                    : ((user.level >= 12) && (user.level <= 15)) ? 'Hyaktaku I'
                        : ((user.level >= 15) && (user.level <= 18)) ? 'Koshigaka V'
                            : ((user.level >= 18) && (user.level <= 21)) ? 'Koshigaka IV'
                                : ((user.level >= 21) && (user.level <= 24)) ? 'Koshigaka III'
                                    : ((user.level >= 24) && (user.level <= 27)) ? 'Koshigaka II'
                                        : ((user.level >= 27) && (user.level <= 30)) ? 'Koshigaka I'
                                            : ((user.level >= 30) && (user.level <= 33)) ? 'Teikatsuka V'
                                                : ((user.level >= 33) && (user.level <= 36)) ? 'Teikatsuka IV'
                                                    : ((user.level >= 36) && (user.level <= 39)) ? 'Teikatsuka III'
                                                        : ((user.level >= 39) && (user.level <= 42)) ? 'Teikatsuka II'
                                                            : ((user.level >= 42) && (user.level <= 45)) ? 'Teikatsuka I'
                                                                : ((user.level >= 45) && (user.level <= 48)) ?  'Hikarigaka V'
                                                                    : ((user.level >= 48) && (user.level <= 51)) ? 'Hikarigaka IV'
                                                                        : ((user.level >= 51) && (user.level <= 54)) ? 'Hikarigaka III'
                                                                            : ((user.level >= 54) && (user.level <= 57)) ? 'Hikarigaka II'
                                                                                : ((user.level >= 57) && (user.level <= 60)) ? 'Hikarigaka I'
                                                                                    : ((user.level >= 60) && (user.level <= 63)) ? 'Tsukaitteka V'
                                                                                        : ((user.level >= 63) && (user.level <= 66)) ? 'Tsukaitteka IV'
                                                                                            : ((user.level >= 66) && (user.level <= 69)) ? 'Tsukaitteka III'
                                                                                                : ((user.level >= 69) && (user.level <= 71)) ? 'Tsukaitteka II'
                                                                                                    : ((user.level >= 71) && (user.level <= 74)) ? 'Tsukaitteka I'
                                                                                                        : ((user.level >= 74) && (user.level <= 77)) ? 'Kiagakka V'
                                                                                                            : ((user.level >= 77) && (user.level <= 80)) ? 'Kiagakka IV'
                                                                                                                : ((user.level >= 80) && (user.level <= 83)) ? 'Kiagakka III'
                                                                                                                    : ((user.level >= 83) && (user.level <= 86)) ? 'Kiagakka II'
                                                                                                                        : ((user.level >= 86) && (user.level <= 89)) ? 'Kiagakka I'
                                                                                                                            : ((user.level >= 89) && (user.level <= 91)) ? 'Hoshikara V'
                                                                                                                                : ((user.level >= 91) && (user.level <= 94)) ? 'Hoshikara IV'
                                                                                                                                    : ((user.level >= 94) && (user.level <= 97)) ? 'Hoshikara III'
                                                                                                                                        : ((user.level >= 97) && (user.level <= 100)) ? 'Hoshikara II'
                                                                                                                                            : 'Hoshikara I'
    user.role = role
    return true
}

module.exports = handler