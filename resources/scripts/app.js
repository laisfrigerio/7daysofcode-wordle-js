const MAX_LETTE_PER_ROW = 5
const MAX_ATTEMPTS = 6

const KEY_BACKSPACE = 'Backspace'
const KEY_ENTER = 'Enter'
const KEY_DELETE = 'Delete'

const GRAY_COLOR_HEXADECIMAL = '#585858'
const YELLOW_COLOR_HEXADECIMAL = '#B59F3B'
const GREEN_COLOR_HEXADECIMAL = '#538D4E'

const TOASTIFY_SUCCESS_COLOR = '#538D4E'
const TOASTIFY_ERROR_COLOR = '#BA4747'
const TOASTIFY_WARNING_COLOR = '#B59F3B'

const NOTIFICATION_DISPLAY_LETTER_SUCCESSFULLY = 'Showing letter with success'
const NOTIFICATION_BACKSPACE_KEY_PRESSED = 'Backspace key pressed'
const NOTIFICATION_BACKSPACE_WHEN_EMPTY_GUESS = 'Could not erase when is an empty guess'
const NOTIFICATION_ENTER_KEY_PRESSED = 'Enter key pressed'
const NOTIFICATION_EMPTY_GUESS = 'Empty guess'
const NOTIFICATION_INCOMPLETE_GUESS = 'Incomplete guess'
const NOTIFICATION_INVALID_PRESSED_KEY = 'Invalid Pressed Key'
const NOTIFICATION_REACH_MAX_ATTEMPTS = 'Reach Max Attempts'
const NOTIFICATION_REACH_MAX_LETTERS_PER_ROW = 'Reach Max letter per row'
const NOTIFICATION_WORD_NOT_IN_DATABASE = 'Word not in database'
const NOTIFICATION_GAME_OVER_GUESS_RIGHT = 'You guessed right! Game over!'

const gameInitialConfig = {
    database: [],
    currentRow: 1,
    currentLetterPosition: 1,
    currentGuess: '',
    rightGuess: ''
}

const toastifyDefaultConfig = {
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      boxShadow: "1px 3px 10px 0px #585858"
    }
}

const getOneRandomWord = (wordsList) => {
    const countWords = wordsList.length
    const shuffleIndex = Math.floor(Math.random() * countWords)
    return wordsList[shuffleIndex].toLowerCase()
}

const showNotification = ({ backgroundColor, message }) => {
    Toastify({ ...toastifyDefaultConfig, text: message, backgroundColor }).showToast()
}

const showPlayAgainButton = () => {
    const buttonPlayAgain = document.querySelector('.play-again .btn-play-again')
    buttonPlayAgain.style.display = 'block'
}

const hidePlayAgainButton = () => {
    const buttonPlayAgain = document.querySelector('.btn-play-again')
    buttonPlayAgain.style.display = 'none'
}

const resetInitialGame = (game) => {
    game.rightGuess = getOneRandomWord(game.database)
    game.currentRow = 1
    game.currentLetterPosition = 1
    game.currentGuess = ''
}

const resetBoardGameLetter = () => {
    document.querySelectorAll('.board-game .row .letter').forEach((element) => {
        element.textContent = ''
        element.style.backgroundColor = ''
    })
}

const resetKeyboardLetter = () => {
    document.querySelectorAll('.keyboard .row .letter').forEach((element) => {
        element.style.backgroundColor = ''
    })
}

const getGameBoardLetter = (currentRow, currentLetterPosition) => {
    return document.querySelector(`.board-game .row-${currentRow} .letter-${currentLetterPosition}`)
}

const isBackspaceKeyPressed = (pressedKey) => {
    return [KEY_BACKSPACE, KEY_DELETE].includes(pressedKey)
}

const isEnterKeyPressed = (pressedKey) => {
    return pressedKey === KEY_ENTER
}

const isOneAlphabeticLetter = (pressedKey) => {
    return pressedKey.length === 1 && /[A-Za-z]/.test(pressedKey)
}

const isValidKeyPressed = (pressedKey) => {
    return isEnterKeyPressed(pressedKey) 
            || isBackspaceKeyPressed(pressedKey)
            || isOneAlphabeticLetter(pressedKey)
}

const isGuessInDatabase = (guess, database) => {
    return database.includes(guess.toLowerCase())
}

const isCurrentGuessEmpty = (currentGuess) => {
    return currentGuess === ''
}

const isCorrectGuess = (currentGuess, rightGuess) => {
    return rightGuess.toLowerCase() === currentGuess.toLowerCase()
}

const isLetterInRightGuess = (letter, rightGuess) => {
    const letterPosition = rightGuess.indexOf(letter)
    return letterPosition > -1
}

const isLettersEqualsInSamePosition = (position, currentGuess, rightGuess) => {
    return currentGuess[position] === rightGuess[position]
}

const reachMaxLetterPerRow = (currentLetterPosition) => {
    return currentLetterPosition > MAX_LETTE_PER_ROW
}

const reachMaxAttempts = (currentRow) => {
    return currentRow > MAX_ATTEMPTS
}

const applyColor = (element, color) => {
    element.style.backgroundColor = color
}

const displayColor = (game) => {
    const { currentGuess, currentRow, rightGuess } = game

    const row = document.querySelector(`.row-${currentRow}`)

    for (let position = 0; position < currentGuess.length; position++) {
        const box = row.querySelector(`.letter-${position+1}`)
        const letter = currentGuess[position]

        const letterBox = document.querySelector(`.letter-${letter}`)

        if (!isLetterInRightGuess(letter, rightGuess)) {
            applyColor(box, GRAY_COLOR_HEXADECIMAL)
            applyColor(letterBox, GRAY_COLOR_HEXADECIMAL)
            continue
        }

        if (isLettersEqualsInSamePosition(position, currentGuess, rightGuess)) {
            applyColor(box, GREEN_COLOR_HEXADECIMAL)
            applyColor(letterBox, GREEN_COLOR_HEXADECIMAL)
            continue
        }

        applyColor(box, YELLOW_COLOR_HEXADECIMAL)
        applyColor(letterBox, YELLOW_COLOR_HEXADECIMAL)
    }
}

const removeLastLetter = (currentGuess) => {
    return currentGuess.slice(0, currentGuess.length - 1)
}

const removeLetterFromBoard = (game) => {
    const { currentGuess, currentRow, currentLetterPosition } = game

    game.currentGuess = removeLastLetter(currentGuess)
    game.currentLetterPosition--

    const element = getGameBoardLetter(currentRow, currentLetterPosition - 1)
    element.textContent = ''

    return NOTIFICATION_BACKSPACE_KEY_PRESSED
}

const displayLetterOnTheBoard = (game, pressedKey) => {
    const { currentRow, currentLetterPosition } = game

    const element = getGameBoardLetter(currentRow, currentLetterPosition)
    element.textContent = pressedKey

    game.currentGuess += pressedKey
    game.currentLetterPosition++

    return NOTIFICATION_DISPLAY_LETTER_SUCCESSFULLY
}

const nextGuess = (game) => {
    game.currentRow++
    game.currentGuess = ''
    game.currentLetterPosition = 1

    if (reachMaxAttempts(game.currentRow)) {
        showPlayAgainButton()
    }

    return NOTIFICATION_ENTER_KEY_PRESSED
}

const checkGuess = (game) => {
    const { database, currentLetterPosition, currentGuess, rightGuess } = game

    if (isCurrentGuessEmpty(currentGuess)) {
        return showNotification({ message: NOTIFICATION_EMPTY_GUESS, backgroundColor: TOASTIFY_ERROR_COLOR })
    }

    if (!reachMaxLetterPerRow(currentLetterPosition)) {
        return showNotification({ message: NOTIFICATION_INCOMPLETE_GUESS, backgroundColor: TOASTIFY_WARNING_COLOR })
    }

    if (!isGuessInDatabase(currentGuess, database)) {
        return showNotification({ message: NOTIFICATION_WORD_NOT_IN_DATABASE, backgroundColor: TOASTIFY_WARNING_COLOR })
    }

    if (isCorrectGuess(currentGuess, rightGuess)) {
        displayColor(game)
        showPlayAgainButton()
        return showNotification({ message: NOTIFICATION_GAME_OVER_GUESS_RIGHT, backgroundColor: TOASTIFY_SUCCESS_COLOR })
    }

    displayColor(game)

    return nextGuess(game)
}

const onKeyPressed = (pressedKey, game) => {
    const { currentLetterPosition, currentGuess, currentRow } = game

    if (reachMaxAttempts(currentRow)) {
        return showNotification({ message: NOTIFICATION_REACH_MAX_ATTEMPTS, backgroundColor: TOASTIFY_ERROR_COLOR })
    }

    if (!isValidKeyPressed(pressedKey)) {
        return showNotification({ message: NOTIFICATION_INVALID_PRESSED_KEY, backgroundColor: TOASTIFY_ERROR_COLOR })
    }

    if (isBackspaceKeyPressed(pressedKey) && !isCurrentGuessEmpty(currentGuess)) {
        return removeLetterFromBoard(game)
    }

    if (isBackspaceKeyPressed(pressedKey) && isCurrentGuessEmpty(currentGuess)) {
        return showNotification({ message: NOTIFICATION_BACKSPACE_WHEN_EMPTY_GUESS, backgroundColor: TOASTIFY_WARNING_COLOR })
    }

    if (isEnterKeyPressed(pressedKey)) {
        return checkGuess(game)
    }

    if (reachMaxLetterPerRow(currentLetterPosition)) {
        return showNotification({ message: NOTIFICATION_REACH_MAX_LETTERS_PER_ROW, backgroundColor: TOASTIFY_ERROR_COLOR })
    }

    return displayLetterOnTheBoard(game, pressedKey)
}

const onEnterButtonPressed = (game) => {
    document.querySelector('.action.enter')
            .addEventListener('click', () => onKeyPressed('Enter', game))
}

const onEraseButtonPressed = (game) => {
    document.querySelector('.action.erase')
            .addEventListener('click', (event) => {
                event.stopPropagation()
                onKeyPressed('Backspace', game)
            })
}

const onLetterButtonPressed = (game) => {
    document.querySelectorAll('.letter').forEach((element) => {
        element.addEventListener('click', (event) => {
            onKeyPressed(event.target.value, game)
            element.blur()
        })
    })
}

const onPlayAgainButtonPressed = (game) => {
    const buttonPlayAgain = document.querySelector('.btn-play-again')

    buttonPlayAgain.addEventListener('click', () => {
        resetInitialGame(game)
        resetBoardGameLetter()
        resetKeyboardLetter()
        hidePlayAgainButton()
    })
}

const onKeydown = (game) => {
    document.addEventListener('keydown', (event) => onKeyPressed(event.key, game))
}

const loadWords = async () => {
    return fetch('./resources/assets/json/database.json')
                    .then((response) => response.json())
                    .then(({ words }) => words)
                    .catch(() => [])
}

const isTestEnviroment = () => {
    return typeof process !== 'undefined'
            && process.env.NODE_ENV === 'test'
}

const start = () => {
    if (isTestEnviroment()) {
        module.exports = {
            checkGuess,
            nextGuess,
            displayColor,
            displayLetterOnTheBoard,
            removeLetterFromBoard,
            removeLastLetter,
            getOneRandomWord,
            isBackspaceKeyPressed,
            isCorrectGuess,
            isCurrentGuessEmpty,
            isGuessInDatabase,
            isEnterKeyPressed,
            isLettersEqualsInSamePosition,
            isLetterInRightGuess,
            isValidKeyPressed,
            isTestEnviroment,
            loadWords,
            onKeyPressed,
            reachMaxAttempts,
            reachMaxLetterPerRow,
            showPlayAgainButton,
            hidePlayAgainButton,
            resetInitialGame,
            resetBoardGameLetter,
            resetKeyboardLetter
        }

        return
    }

    window.onload = async () => {
        const database = await loadWords()
        const rightGuess = getOneRandomWord(database)

        const game = { ...gameInitialConfig, database, rightGuess }
        console.log(database)
        console.log('get one random word: ', rightGuess)

        onKeydown(game)
        onLetterButtonPressed(game)
        onEnterButtonPressed(game)
        onEraseButtonPressed(game)
        onPlayAgainButtonPressed(game)
    }
}

start()
