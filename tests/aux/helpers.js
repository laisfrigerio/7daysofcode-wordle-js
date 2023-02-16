const getGameBoardLetterBackgroundColorByRow = (index, row = 1) => {
    return global.document.querySelector(`.row-${row} .letter-${index}`).style.backgroundColor
}

const getGameBoardLetterBackgroundColor = (index) => {
    return global.document.querySelector(`.letter-${index}`).style.backgroundColor
}

const getPlayAgainButtonVisibility = () => {
    return global.document.querySelector(`.play-again .btn-play-again`).style.display
}

module.exports = {
    getGameBoardLetterBackgroundColor,
    getGameBoardLetterBackgroundColorByRow,
    getPlayAgainButtonVisibility
}