const MAX_LETTE_PER_ROW = 5
const MAX_ATTEMPTS = 6

const KEY_BACKSPACE = 'Backspace'
const KEY_ENTER = 'Enter'
const KEY_DELETE = 'Delete'

const GRAY_COLOR_HEXADECIMAL = '#585858'
const YELLOW_COLOR_HEXADECIMAL = '#B59F3B'
const GREEN_COLOR_HEXADECIMAL = '#538D4E'

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

const gameInitialConfig = {
    database: [],
    currentRow: 1,
    currentLetterPosition: 1,
    currentGuess: '',
    rightGuess: ''
}

const getOneRandomWord = (wordsList) => {
    const countWords = wordsList.length
    const shuffleIndex = Math.floor(Math.random() * countWords)
    return wordsList[shuffleIndex]
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
    return rightGuess === currentGuess
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

        if (!isLetterInRightGuess(letter, rightGuess)) {
            applyColor(box, GRAY_COLOR_HEXADECIMAL)
            continue
        }

        if (isLettersEqualsInSamePosition(position, currentGuess, rightGuess)) {
            applyColor(box, GREEN_COLOR_HEXADECIMAL)
            continue
        }

        applyColor(box, YELLOW_COLOR_HEXADECIMAL)
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

    return NOTIFICATION_ENTER_KEY_PRESSED
}

const checkGuess = (game) => {
    const { database, currentLetterPosition, currentGuess } = game

    if (isCurrentGuessEmpty(currentGuess)) {
        return NOTIFICATION_EMPTY_GUESS
    }

    if (!reachMaxLetterPerRow(currentLetterPosition)) {
        return NOTIFICATION_INCOMPLETE_GUESS
    }

    if (!isGuessInDatabase(currentGuess, database)) {
        return NOTIFICATION_WORD_NOT_IN_DATABASE
    }

    return nextGuess(game)
}

const onKeyPressed = (pressedKey, game) => {
    const { currentLetterPosition, currentGuess, currentRow } = game

    if (reachMaxAttempts(currentRow)) {
        return NOTIFICATION_REACH_MAX_ATTEMPTS
    }

    if (!isValidKeyPressed(pressedKey)) {
        return NOTIFICATION_INVALID_PRESSED_KEY
    }

    if (isBackspaceKeyPressed(pressedKey) && !isCurrentGuessEmpty(currentGuess)) {
        return removeLetterFromBoard(game)
    }

    if (isBackspaceKeyPressed(pressedKey) && isCurrentGuessEmpty(currentGuess)) {
        return NOTIFICATION_BACKSPACE_WHEN_EMPTY_GUESS
    }

    if (isEnterKeyPressed(pressedKey)) {
        return checkGuess(game)
    }

    if (reachMaxLetterPerRow(currentLetterPosition)) {
        return NOTIFICATION_REACH_MAX_LETTERS_PER_ROW
    }

    return displayLetterOnTheBoard(game, pressedKey)
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
            reachMaxLetterPerRow
        }

        return
    }

    window.onload = async () => {
        const database = await loadWords()

        const game = { ...gameInitialConfig, database }
        console.log(database)
        console.log('get one random word: ', getOneRandomWord(database))

        document.addEventListener('keydown', (event) => onKeyPressed(event.key, game))
    }
}

start()
