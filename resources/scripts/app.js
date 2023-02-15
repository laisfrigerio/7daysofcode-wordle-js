const KEY_BACKSPACE = 'Backspace'
const KEY_ENTER = 'Enter'
const KEY_DELETE = 'Delete'

const isEnterKeyPressed = (pressedKey) => {
    return pressedKey === KEY_ENTER
}

const isBackspaceKeyPressed = (pressedKey) => {
    return [KEY_BACKSPACE, KEY_DELETE].includes(pressedKey)
}

const isOneAlphabeticLetter = (pressedKey) => {
    return pressedKey.length === 1 && /[A-Za-z]/.test(pressedKey)
}

const isValidKeyPressed = (pressedKey) => {
    return isEnterKeyPressed(pressedKey) 
            || isBackspaceKeyPressed(pressedKey)
            || isOneAlphabeticLetter(pressedKey)
}

const getOneRandomWord = (wordsList) => {
    const countWords = wordsList.length
    const shuffleIndex = Math.floor(Math.random() * countWords)
    return wordsList[shuffleIndex]
}

const isTestEnviroment = () => {
    return typeof process !== 'undefined'
            && process.env.NODE_ENV === 'test'
}

const loadWords = async () => {
    return fetch('./resources/assets/json/database.json')
                    .then((response) => response.json())
                    .then(({ words }) => words)
                    .catch(() => [])
}

const start = () => {
    if (isTestEnviroment()) {
        module.exports = {
            getOneRandomWord,
            isBackspaceKeyPressed,
            isEnterKeyPressed,
            isValidKeyPressed,
            isTestEnviroment,
            loadWords
        }

        return
    }

    window.onload = async () => {
        const database = await loadWords()
        console.log(database)
        console.log('get one random word: ', getOneRandomWord(database))
    }
}

start()
