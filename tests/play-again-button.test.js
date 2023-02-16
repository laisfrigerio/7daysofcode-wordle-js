const  { JSDOM } = require('jsdom')
const path = require('path')
const app = require('../resources/scripts/app')

const { 
    mockToastify, 
    unMockToastify
} = require('./mocks/toastify')

const {
    KEY_ENTER,
    GREEN_COLOR_RGB
} = require('./aux/consts')

const initialGame = {
    database: ['allow', 'agree', 'candy', 'sorry'],
    currentRow: 1,
    currentLetterPosition: 5,
    currentGuess: 'agree',
    rightGuess: 'allow'
}

const getLetterTextContent = (row, index) => {
    return global.document.querySelector(`.row-${row} .letter-${index}`).textContent
}

const getBoxBackgroundColor = (row, index) => {
    return global.document.querySelector(`.row-${row} .letter-${index}`).style.backgroundColor
}

const getPlayAgainButtonVisibility = () => {
    return global.document.querySelector(`.play-again .btn-play-again`).style.display
}

describe('testing play again button', () => {
    beforeEach(async () => {
        const dom = await JSDOM.fromFile(path.resolve(__dirname, '..', 'index.html'))
        global.document = dom.window.document
        global.window = dom.window
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    test('should apply block as visibility', () => {
        expect(getPlayAgainButtonVisibility()).toBe('')
        app.showPlayAgainButton()
        expect(getPlayAgainButtonVisibility()).toBe('block')
    })

    test('should apply none as visibility', () => {
        expect(getPlayAgainButtonVisibility()).toBe('')
        app.hidePlayAgainButton()
        expect(getPlayAgainButtonVisibility()).toBe('none')
    })
})

describe('testing reset initial game', () => {
    beforeEach(async () => {
        const dom = await JSDOM.fromFile(path.resolve(__dirname, '..', 'index.html'))
        global.document = dom.window.document
        global.window = dom.window
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    test('should reset initial game variable', () => {
        const game = { ...initialGame }
        jest.spyOn(global.Math, 'random').mockReturnValue(0.7);
        app.resetInitialGame(game)
        expect(game.rightGuess).toBe('candy')
        expect(game.currentGuess).toBe('')
        expect(game.currentRow).toBe(1)
        expect(game.currentLetterPosition).toBe(1)
    })
})

describe('testing reset board game', () => {
    beforeEach(async () => {
        const dom = await JSDOM.fromFile(path.resolve(__dirname, '..', 'index.html'))
        global.document = dom.window.document
        global.window = dom.window
        global.Toastify = mockToastify()
    })

    afterEach(() => {
        jest.restoreAllMocks()
        unMockToastify()
    })

    test('reseting board game, after the guess match with right word', () => {
        const game = { ...initialGame, currentLetterPosition: 1, currentGuess: ''}

        expect(getPlayAgainButtonVisibility()).toBe('')

        app.onKeyPressed('a', game)
        expect(getLetterTextContent(1, 1)).toBe('a')

        app.onKeyPressed('l', game)
        expect(getLetterTextContent(1, 2)).toBe('l')

        app.onKeyPressed('l', game)
        expect(getLetterTextContent(1, 3)).toBe('l')

        app.onKeyPressed('o', game)
        expect(getLetterTextContent(1, 4)).toBe('o')

        app.onKeyPressed('w', game)
        expect(getLetterTextContent(1, 5)).toBe('w')

        expect(getBoxBackgroundColor(1, 1)).toBe('')
        expect(getBoxBackgroundColor(1, 2)).toBe('')
        expect(getBoxBackgroundColor(1, 3)).toBe('')
        expect(getBoxBackgroundColor(1, 4)).toBe('')
        expect(getBoxBackgroundColor(1, 5)).toBe('')

        app.onKeyPressed(KEY_ENTER, game)
        expect(getBoxBackgroundColor(1, 1)).toBe(GREEN_COLOR_RGB)
        expect(getBoxBackgroundColor(1, 2)).toBe(GREEN_COLOR_RGB)
        expect(getBoxBackgroundColor(1, 3)).toBe(GREEN_COLOR_RGB)
        expect(getBoxBackgroundColor(1, 4)).toBe(GREEN_COLOR_RGB)
        expect(getBoxBackgroundColor(1, 5)).toBe(GREEN_COLOR_RGB)

        app.resetBoardGameLetter()

        expect(getLetterTextContent(1, 1)).toBe('')
        expect(getLetterTextContent(1, 2)).toBe('')
        expect(getLetterTextContent(1, 3)).toBe('')
        expect(getLetterTextContent(1, 4)).toBe('')
        expect(getLetterTextContent(1, 5)).toBe('')

        expect(getBoxBackgroundColor(1, 1)).toBe('')
        expect(getBoxBackgroundColor(1, 2)).toBe('')
        expect(getBoxBackgroundColor(1, 3)).toBe('')
        expect(getBoxBackgroundColor(1, 4)).toBe('')
        expect(getBoxBackgroundColor(1, 5)).toBe('')
    })

    test('reseting keyboard game, after the guess match with right word', () => {
        const game = { ...initialGame, currentLetterPosition: 1, currentGuess: ''}

        expect(getPlayAgainButtonVisibility()).toBe('')

        app.onKeyPressed('a', game)
        expect(getLetterTextContent(1, 1)).toBe('a')

        app.onKeyPressed('l', game)
        expect(getLetterTextContent(1, 2)).toBe('l')

        app.onKeyPressed('l', game)
        expect(getLetterTextContent(1, 3)).toBe('l')

        app.onKeyPressed('o', game)
        expect(getLetterTextContent(1, 4)).toBe('o')

        app.onKeyPressed('w', game)
        expect(getLetterTextContent(1, 5)).toBe('w')

        expect(getBoxBackgroundColor(1, 1)).toBe('')
        expect(getBoxBackgroundColor(1, 2)).toBe('')
        expect(getBoxBackgroundColor(1, 3)).toBe('')
        expect(getBoxBackgroundColor(1, 4)).toBe('')
        expect(getBoxBackgroundColor(1, 5)).toBe('')

        app.onKeyPressed(KEY_ENTER, game)
        expect(getBoxBackgroundColor(1, 1)).toBe(GREEN_COLOR_RGB)
        expect(getBoxBackgroundColor(1, 2)).toBe(GREEN_COLOR_RGB)
        expect(getBoxBackgroundColor(1, 3)).toBe(GREEN_COLOR_RGB)
        expect(getBoxBackgroundColor(1, 4)).toBe(GREEN_COLOR_RGB)
        expect(getBoxBackgroundColor(1, 5)).toBe(GREEN_COLOR_RGB)

        expect(getBoxBackgroundColor(2, 'a')).toBe(GREEN_COLOR_RGB)
        expect(getBoxBackgroundColor(2, 'l')).toBe(GREEN_COLOR_RGB)
        expect(getBoxBackgroundColor(2, 'l')).toBe(GREEN_COLOR_RGB)
        expect(getBoxBackgroundColor(1, 'o')).toBe(GREEN_COLOR_RGB)
        expect(getBoxBackgroundColor(1, 'w')).toBe(GREEN_COLOR_RGB)

        app.resetBoardGameLetter()
        app.resetKeyboardLetter()

        expect(getLetterTextContent(1, 1)).toBe('')
        expect(getLetterTextContent(1, 2)).toBe('')
        expect(getLetterTextContent(1, 3)).toBe('')
        expect(getLetterTextContent(1, 4)).toBe('')
        expect(getLetterTextContent(1, 5)).toBe('')

        expect(getBoxBackgroundColor(1, 1)).toBe('')
        expect(getBoxBackgroundColor(1, 2)).toBe('')
        expect(getBoxBackgroundColor(1, 3)).toBe('')
        expect(getBoxBackgroundColor(1, 4)).toBe('')
        expect(getBoxBackgroundColor(1, 5)).toBe('')

        expect(getBoxBackgroundColor(2, 'a')).toBe('')
        expect(getBoxBackgroundColor(2, 'l')).toBe('')
        expect(getBoxBackgroundColor(2, 'l')).toBe('')
        expect(getBoxBackgroundColor(1, 'o')).toBe('')
        expect(getBoxBackgroundColor(1, 'w')).toBe('')
    })
})
