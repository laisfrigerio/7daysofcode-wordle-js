const getGameBoardLetter = (index) => {
    return global.document.querySelector(`.letter-${index}`).style.backgroundColor
}

module.exports = {
    getGameBoardLetter
}