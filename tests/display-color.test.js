const { JSDOM } = require('jsdom')
const path = require('path')
const app = require('../resources/scripts/app')

const {
    GREEN_COLOR_RGB,
    YELLOW_COLOR_RGB,
    GRAY_COLOR_RGB
} = require('./aux/consts')

const { getGameBoardLetter } = require('./aux/helpers')

describe('Testing display color...', () => {
    const database = ['agent', 'above', 'allow', 'lunch', 'money', 'sorry', 'today', 'worry']

    const gameInitialConfig = {
        database,
        currentRow: 1,
        currentLetterPosition: 1,
        currentGuess: '',
        rightGuess: 'allow'
    }

    beforeEach(async () => {
        const dom = await JSDOM.fromFile(path.resolve(__dirname, '..', 'index.html'))
        global.document = dom.window.document
        global.window = dom.window
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    test('when current guess and right guess are equals', () => {
        const game = { ...gameInitialConfig, currentGuess: 'allow' }

        app.displayColor(game)
        
        expect(getGameBoardLetter(1)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetter(2)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetter(3)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetter(4)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetter(5)).toBe(GREEN_COLOR_RGB)
    })

    test('when comparing sorry with worry', () => {
        const game = { ...gameInitialConfig, currentGuess: 'sorry', rightGuess: 'worry' }
        
        app.displayColor(game)
        
        expect(getGameBoardLetter(1)).toBe(GRAY_COLOR_RGB)
        expect(getGameBoardLetter(2)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetter(3)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetter(4)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetter(5)).toBe(GREEN_COLOR_RGB)
    })

    test('when comparing basic with beans', () => {
        const game = { ...gameInitialConfig, currentGuess: 'basic', rightGuess: 'beans' }
        
        app.displayColor(game)
        
        expect(getGameBoardLetter(1)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetter(2)).toBe(YELLOW_COLOR_RGB)
        expect(getGameBoardLetter(3)).toBe(YELLOW_COLOR_RGB)
        expect(getGameBoardLetter(4)).toBe(GRAY_COLOR_RGB)
        expect(getGameBoardLetter(5)).toBe(GRAY_COLOR_RGB)
    })
})
