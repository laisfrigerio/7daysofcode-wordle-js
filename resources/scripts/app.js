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
