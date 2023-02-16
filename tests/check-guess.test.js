const { JSDOM } = require('jsdom')
const path = require('path')
const app = require('../resources/scripts/app')

const {
    NOTIFICATION_EMPTY_GUESS,
    NOTIFICATION_ENTER_KEY_PRESSED,
    NOTIFICATION_GAME_OVER_GUESS_RIGHT,
    NOTIFICATION_INCOMPLETE_GUESS,
    NOTIFICATION_WORD_NOT_IN_DATABASE,
    GREEN_COLOR_RGB
} = require('./aux/consts')

const { getGameBoardLetter } = require('./aux/helpers')

const { 
    mockToastify, 
    unMockToastify, 
    toastifyDefaultConfig,
    TOASTIFY_SUCCESS_COLOR
} = require('./mocks/toastify')

describe('Checking guess', () => {
    const database = ['agent', 'above', 'lunch', 'money', 'sorry', 'today', 'worry']

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

    test('should return a "Empty guess" message because currentGuess attribute is empty', () => {
        const game = {
            database,
            currentRow: 1,
            currentLetterPosition: 1,
            currentGuess: '',
            rightGuess: 'lunch'
        }

        expect(app.checkGuess(game)).toBe(NOTIFICATION_EMPTY_GUESS)
    })

    test('should return a "Incomplete guess" message because currentGuess attribute size is less than 5 letter', () => {
        const game = {
            database,
            currentRow: 1,
            currentLetterPosition: 4,
            currentGuess: 'abov',
            rightGuess: 'sorry'
        }

        expect(app.checkGuess(game)).toBe(NOTIFICATION_INCOMPLETE_GUESS)
    })

    test('should return a "Word not in database" message because currentGuess is not in database list', () => {
        const game = {
            database,
            currentRow: 1,
            currentLetterPosition: 6,
            currentGuess: 'house',
            rightGuess: 'sorry'
        }

        expect(app.checkGuess(game)).toBe(NOTIFICATION_WORD_NOT_IN_DATABASE)
    })

    test('should return a "Enter key pressed" when current guess is not correct', () => {
        const game = {
            database,
            currentRow: 1,
            currentLetterPosition: 6,
            currentGuess: 'above',
            rightGuess: 'sorry'
        }

        expect(app.checkGuess(game)).toBe(NOTIFICATION_ENTER_KEY_PRESSED)
        expect(game.currentRow).toBe(2)
        expect(game.currentLetterPosition).toBe(1)
        expect(game.currentGuess).toBe('')
    })

    test('when the guess match with right word', () => {
        const game = {
            database,
            currentRow: 1,
            currentLetterPosition: 6,
            currentGuess: 'sorry',
            rightGuess: 'sorry'
        }

        app.checkGuess(game)

        expect(game.currentGuess).toBe("sorry")
        expect(game.currentLetterPosition).toBe(6)
        expect(game.currentRow).toBe(1)

        expect(getGameBoardLetter(1)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetter(2)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetter(3)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetter(4)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetter(5)).toBe(GREEN_COLOR_RGB)

        expect(global.Toastify).toHaveBeenCalled()
        expect(global.Toastify).toHaveBeenCalledWith({ ...toastifyDefaultConfig, text: NOTIFICATION_GAME_OVER_GUESS_RIGHT, backgroundColor: TOASTIFY_SUCCESS_COLOR })
    })
})
