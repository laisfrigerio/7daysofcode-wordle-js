const { JSDOM } = require('jsdom')
const path = require('path')
const app = require('../resources/scripts/app')

const {
    NOTIFICATION_EMPTY_GUESS,
    NOTIFICATION_ENTER_KEY_PRESSED,
    NOTIFICATION_GAME_OVER_GUESS_RIGHT,
    NOTIFICATION_INCOMPLETE_GUESS,
    NOTIFICATION_WORD_NOT_IN_DATABASE,
    KEY_ENTER,
    GREEN_COLOR_RGB,
    GRAY_COLOR_RGB,
    YELLOW_COLOR_RGB
} = require('./aux/consts')

const { 
    getGameBoardLetterBackgroundColor,
    getGameBoardLetterBackgroundColorByRow,
    getPlayAgainButtonVisibility
} = require('./aux/helpers')

const { 
    mockToastify, 
    unMockToastify, 
    toastifyDefaultConfig,
    TOASTIFY_SUCCESS_COLOR,
    TOASTIFY_ERROR_COLOR,
    TOASTIFY_WARNING_COLOR
} = require('./mocks/toastify')

describe('Checking guess', () => {
    const database = ['agent', 'above', 'lunch', 'money', 'sorry', 'today', 'worry', 'arrow']

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

    test('should show a notification with "Empty guess" message because currentGuess attribute is empty', () => {
        const game = {
            database,
            currentRow: 1,
            currentLetterPosition: 1,
            currentGuess: '',
            rightGuess: 'lunch'
        }

        app.checkGuess(game)
        expect(global.Toastify).toHaveBeenCalled()
        expect(global.Toastify).toHaveBeenCalledWith({ ...toastifyDefaultConfig, text: NOTIFICATION_EMPTY_GUESS, backgroundColor: TOASTIFY_ERROR_COLOR })
    })

    test('should show notification with a "Incomplete guess" message because currentGuess attribute size is less than 5 letter', () => {
        const game = {
            database,
            currentRow: 1,
            currentLetterPosition: 4,
            currentGuess: 'abov',
            rightGuess: 'sorry'
        }

        app.checkGuess(game)
        expect(global.Toastify).toHaveBeenCalled()
        expect(global.Toastify).toHaveBeenCalledWith({ ...toastifyDefaultConfig, text: NOTIFICATION_INCOMPLETE_GUESS, backgroundColor: TOASTIFY_WARNING_COLOR })
    })

    test('should return a "Word not in database" message because currentGuess is not in database list', () => {
        const game = {
            database,
            currentRow: 1,
            currentLetterPosition: 6,
            currentGuess: 'house',
            rightGuess: 'sorry'
        }

        app.checkGuess(game)
        expect(global.Toastify).toHaveBeenCalled()
        expect(global.Toastify).toHaveBeenCalledWith({ ...toastifyDefaultConfig, text: NOTIFICATION_WORD_NOT_IN_DATABASE, backgroundColor: TOASTIFY_WARNING_COLOR })
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

        expect(getPlayAgainButtonVisibility()).toBe('')

        app.checkGuess(game)

        expect(game.currentGuess).toBe("sorry")
        expect(game.currentLetterPosition).toBe(6)
        expect(game.currentRow).toBe(1)

        expect(getGameBoardLetterBackgroundColor(1)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor(2)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor(3)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor(4)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor(5)).toBe(GREEN_COLOR_RGB)

        expect(getGameBoardLetterBackgroundColor('s')).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor('o')).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor('r')).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor('y')).toBe(GREEN_COLOR_RGB)

        expect(global.Toastify).toHaveBeenCalled()
        expect(global.Toastify).toHaveBeenCalledWith({ ...toastifyDefaultConfig, text: NOTIFICATION_GAME_OVER_GUESS_RIGHT, backgroundColor: TOASTIFY_SUCCESS_COLOR })

        expect(getPlayAgainButtonVisibility()).toBe('block')
    })

    test('comparing worry with sorry when second guess', () => {
        const game = {
            database,
            currentRow: 2,
            currentLetterPosition: 6,
            currentGuess: 'worry',
            rightGuess: 'sorry'
        }

        expect(getPlayAgainButtonVisibility()).toBe('')

        expect(app.onKeyPressed(KEY_ENTER, game)).toBe(NOTIFICATION_ENTER_KEY_PRESSED)
        expect(game.currentGuess).toBe("")
        expect(game.currentLetterPosition).toBe(1)
        expect(game.currentRow).toBe(3)

        expect(getGameBoardLetterBackgroundColorByRow(1, 2)).toBe(GRAY_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColorByRow(2, 2)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColorByRow(3, 2)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColorByRow(4, 2)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColorByRow(5, 2)).toBe(GREEN_COLOR_RGB)

        expect(getGameBoardLetterBackgroundColor('w')).toBe(GRAY_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor('o')).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor('r')).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor('y')).toBe(GREEN_COLOR_RGB)

        expect(getPlayAgainButtonVisibility()).toBe('')
    })

    test('comparing arrow with sorry when last guess', () => {
        const game = {
            database,
            currentRow: 6,
            currentLetterPosition: 6,
            currentGuess: 'arrow',
            rightGuess: 'sorry'
        }

        expect(getPlayAgainButtonVisibility()).toBe('')

        expect(app.onKeyPressed(KEY_ENTER, game)).toBe(NOTIFICATION_ENTER_KEY_PRESSED)
        expect(game.currentGuess).toBe("")
        expect(game.currentLetterPosition).toBe(1)
        expect(game.currentRow).toBe(7)

        expect(getGameBoardLetterBackgroundColorByRow(1, 6)).toBe(GRAY_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColorByRow(2, 6)).toBe(YELLOW_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColorByRow(3, 6)).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColorByRow(4, 6)).toBe(YELLOW_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColorByRow(5, 6)).toBe(GRAY_COLOR_RGB)

        expect(getGameBoardLetterBackgroundColor('a')).toBe(GRAY_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor('r')).toBe(GREEN_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor('o')).toBe(YELLOW_COLOR_RGB)
        expect(getGameBoardLetterBackgroundColor('w')).toBe(GRAY_COLOR_RGB)
        expect(getPlayAgainButtonVisibility()).toBe('block')
    })
})
