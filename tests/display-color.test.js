const { JSDOM } = require('jsdom')
const path = require('path')
const app = require('../resources/scripts/app')

const {
    GREEN_COLOR_RGB,
    YELLOW_COLOR_RGB,
    GRAY_COLOR_RGB
} = require('./aux/consts')

const { getGameBoardLetterBackgroundColor } = require('./aux/helpers')

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
        
        expect(getGameBoardLetterBackgroundColor(1)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor(2)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor(3)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor(4)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor(5)).toBe(GREEN_COLOR_RGB)

        expect(getGameBoardLetterBackgroundColor('a')).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor('l')).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor('o')).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor('w')).toBe(GREEN_COLOR_RGB)
    })

    test('when comparing sorry with worry', () => {
        const game = { ...gameInitialConfig, currentGuess: 'sorry', rightGuess: 'worry' }
        
        app.displayColor(game)
        
        expect(getGameBoardLetterBackgroundColor(1)).toBe(GRAY_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor(2)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor(3)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor(4)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor(5)).toBe(GREEN_COLOR_RGB)

        expect(getGameBoardLetterBackgroundColor('s')).toBe(GRAY_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor('o')).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor('r')).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor('y')).toBe(GREEN_COLOR_RGB)
    })

    test('when comparing basic with beans', () => {
        const game = { ...gameInitialConfig, currentGuess: 'basic', rightGuess: 'beans' }
        
        app.displayColor(game)
        
        expect(getGameBoardLetterBackgroundColor(1)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor(2)).toBe(YELLOW_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor(3)).toBe(YELLOW_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor(4)).toBe(GRAY_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor(5)).toBe(GRAY_COLOR_RGB)

        expect(getGameBoardLetterBackgroundColor('b')).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor('a')).toBe(YELLOW_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor('s')).toBe(YELLOW_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor('i')).toBe(GRAY_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor('c')).toBe(GRAY_COLOR_RGB)
    })
})
