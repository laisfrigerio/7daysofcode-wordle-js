const { JSDOM } = require('jsdom')
const path = require('path')
const app = require('../resources/scripts/app')

const {
    NOTIFICATION_DISPLAY_LETTER_SUCCESSFULLY,
    NOTIFICATION_BACKSPACE_KEY_PRESSED,
    NOTIFICATION_BACKSPACE_WHEN_EMPTY_GUESS,
    NOTIFICATION_EMPTY_GUESS,
    NOTIFICATION_ENTER_KEY_PRESSED,
    NOTIFICATION_INCOMPLETE_GUESS,
    NOTIFICATION_INVALID_PRESSED_KEY,
    NOTIFICATION_REACH_MAX_ATTEMPTS,
    NOTIFICATION_REACH_MAX_LETTERS_PER_ROW,
    NOTIFICATION_WORD_NOT_IN_DATABASE,
    NOTIFICATION_GAME_OVER_GUESS_RIGHT,
    GREEN_COLOR_RGB,
    KEY_BACKSPACE,
    KEY_ENTER,
    KEY_DELETE,
} = require('./aux/consts')

const { getGameBoardLetter } = require('./aux/helpers')

describe('Testing on key pressed', () => {
    const database = ['agent', 'above', 'allow', 'lunch', 'money', 'sorry', 'today', 'worry']

    const gameInitialConfig = {
        database,
        currentRow: 1,
        currentLetterPosition: 1,
        currentGuess: '',
        rightGuess: ''
    }

    beforeEach(async () => {
        const dom = await JSDOM.fromFile(path.resolve(__dirname, '..', 'index.html'))
        global.document = dom.window.document
        global.window = dom.window
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    test('should return that reach the max letter per row', () => {
        expect(app.onKeyPressed('A', { ...gameInitialConfig, currentRow: 7 })).toBe(NOTIFICATION_REACH_MAX_ATTEMPTS)
    })

    test('simulating when an invalid key is pressed', () => {
        expect(app.onKeyPressed('4', gameInitialConfig)).toBe(NOTIFICATION_INVALID_PRESSED_KEY)
        expect(app.onKeyPressed(0, gameInitialConfig)).toBe(NOTIFICATION_INVALID_PRESSED_KEY)
        expect(app.onKeyPressed(9, gameInitialConfig)).toBe(NOTIFICATION_INVALID_PRESSED_KEY)
        expect(app.onKeyPressed('&', gameInitialConfig)).toBe(NOTIFICATION_INVALID_PRESSED_KEY)
        expect(app.onKeyPressed(']', gameInitialConfig)).toBe(NOTIFICATION_INVALID_PRESSED_KEY)
        expect(app.onKeyPressed('Meta', gameInitialConfig)).toBe(NOTIFICATION_INVALID_PRESSED_KEY)
        expect(app.onKeyPressed('é', gameInitialConfig)).toBe(NOTIFICATION_INVALID_PRESSED_KEY)
        expect(app.onKeyPressed(';', gameInitialConfig)).toBe(NOTIFICATION_INVALID_PRESSED_KEY)
    })

    describe('simulating when Backspace key was pressed', () => {
        test('should return that backspace key was pressed with empty guess', () => {
            const game = { ...gameInitialConfig }
            expect(app.onKeyPressed(KEY_BACKSPACE, game)).toBe(NOTIFICATION_BACKSPACE_WHEN_EMPTY_GUESS)
            expect(game.currentGuess).toBe('')
            expect(game.currentLetterPosition).toBe(1)
        })

        describe('testing when the initial game configuration has only one character', () => {
            const game = { ...gameInitialConfig, currentLetterPosition: 2, currentGuess: 'A'}

            test('should return that backspace key was pressed when current guess has one letter', () => {
                expect(app.onKeyPressed(KEY_BACKSPACE, game)).toBe(NOTIFICATION_BACKSPACE_KEY_PRESSED)
                expect(game.currentGuess).toBe('')
                expect(game.currentLetterPosition).toBe(1)
            })

            test('should return that backspace was pressed when current guess is an empty string', () => {
                expect(app.onKeyPressed(KEY_BACKSPACE, game)).toBe(NOTIFICATION_BACKSPACE_WHEN_EMPTY_GUESS)
                expect(game.currentGuess).toBe('')
                expect(game.currentLetterPosition).toBe(1)
            })
        })

        describe('testing when the game configuration has current guess with five letters', () => {
            const game = { ...gameInitialConfig, currentLetterPosition: 6, currentGuess: 'allow'}

            test('should return that backspace key was pressed when current guess with 5 letters', () => {
                expect(app.onKeyPressed(KEY_BACKSPACE, game)).toBe(NOTIFICATION_BACKSPACE_KEY_PRESSED)
                expect(game.currentGuess).toBe('allo')
                expect(game.currentLetterPosition).toBe(5)
                expect(game.currentRow).toBe(1)
            })
        })
    })

    describe('simulating when Delete key was pressed', () => {
        test('should return that delete key was pressed with empty guess', () => {
            const game = { ...gameInitialConfig }
            expect(app.onKeyPressed(KEY_DELETE, game)).toBe(NOTIFICATION_BACKSPACE_WHEN_EMPTY_GUESS)
            expect(game.currentGuess).toBe('')
            expect(game.currentLetterPosition).toBe(1)
        })

        describe('testing when the initial game configuration has only one character', () => {
            const game = { ...gameInitialConfig, currentLetterPosition: 2, currentGuess: 'A'}

            test('should return that delete key was pressed when current guess has one letter', () => {
                expect(app.onKeyPressed(KEY_DELETE, game)).toBe(NOTIFICATION_BACKSPACE_KEY_PRESSED)
                expect(game.currentGuess).toBe('')
                expect(game.currentLetterPosition).toBe(1)
            })

            test('should return that delete was pressed when current guess is an empty string', () => {
                expect(app.onKeyPressed(KEY_DELETE, game)).toBe(NOTIFICATION_BACKSPACE_WHEN_EMPTY_GUESS)
                expect(game.currentGuess).toBe('')
                expect(game.currentLetterPosition).toBe(1)
            })
        })

        describe('testing when the game configuration has current guess with five letters', () => {
            const game = { ...gameInitialConfig, currentLetterPosition: 6, currentGuess: 'allow'}

            test('should return that delete key was pressed when current guess with 5 letters', () => {
                expect(app.onKeyPressed(KEY_DELETE, game)).toBe(NOTIFICATION_BACKSPACE_KEY_PRESSED)
                expect(game.currentGuess).toBe('allo')
                expect(game.currentLetterPosition).toBe(5)
                expect(game.currentRow).toBe(1)
            })
        })
    })

    describe('when Enter key was pressed', () => {
        test('when empty guess', () => {
            const game = { ...gameInitialConfig }
            expect(app.onKeyPressed(KEY_ENTER, game)).toBe(NOTIFICATION_EMPTY_GUESS)
        })

        test('when guess with one letter', () => {
            const game = { ...gameInitialConfig, currentLetterPosition: 2, currentGuess: 'a'}
            expect(app.onKeyPressed(KEY_ENTER, game)).toBe(NOTIFICATION_INCOMPLETE_GUESS)
        })

        test('when guess is not in database', () => {
            const game = { ...gameInitialConfig, currentLetterPosition: 6, currentGuess: 'arcad'}
            expect(app.onKeyPressed(KEY_ENTER, game)).toBe(NOTIFICATION_WORD_NOT_IN_DATABASE)
        })

        test('when a valid guess', () => {
            const game = { ...gameInitialConfig, currentLetterPosition: 6, currentGuess: 'allow'}
            expect(app.onKeyPressed(KEY_ENTER, game)).toBe(NOTIFICATION_ENTER_KEY_PRESSED)
            expect(game.currentGuess).toBe('')
            expect(game.currentLetterPosition).toBe(1)
            expect(game.currentRow).toBe(2)
        })

        test('when the guess match with right guess', () => {
            global.alert = jest.fn(() => NOTIFICATION_GAME_OVER_GUESS_RIGHT)

            const game = { ...gameInitialConfig, currentLetterPosition: 6, currentGuess: 'allow', rightGuess: 'allow'}
            expect(app.onKeyPressed(KEY_ENTER, game)).toBe(NOTIFICATION_GAME_OVER_GUESS_RIGHT)
            expect(game.currentGuess).toBe('allow')
            expect(game.currentLetterPosition).toBe(6)
            expect(game.currentRow).toBe(1)

            expect(getGameBoardLetter(1)).toBe(GREEN_COLOR_RGB)
            expect(getGameBoardLetter(2)).toBe(GREEN_COLOR_RGB)
            expect(getGameBoardLetter(3)).toBe(GREEN_COLOR_RGB)
            expect(getGameBoardLetter(4)).toBe(GREEN_COLOR_RGB)
            expect(getGameBoardLetter(5)).toBe(GREEN_COLOR_RGB)
        })
    })

    describe('Checking max letters per row', () => {
        test('Could not return max letter per row when we are trying to backspace/delete', () => {
            const game = { ...gameInitialConfig, currentLetterPosition: 6, currentGuess: 'allow'}
            expect(app.onKeyPressed(KEY_BACKSPACE, game)).not.toBe(NOTIFICATION_REACH_MAX_LETTERS_PER_ROW)
            expect(app.onKeyPressed(KEY_DELETE, game)).not.toBe(NOTIFICATION_REACH_MAX_LETTERS_PER_ROW)
        })

        test('Could not return max letter per row when we are trying to enter', () => {
            const game = { ...gameInitialConfig, currentLetterPosition: 6, currentGuess: 'allow'}
            expect(app.onKeyPressed(KEY_ENTER, game)).not.toBe(NOTIFICATION_REACH_MAX_LETTERS_PER_ROW)
        })

        test('should return that reach the max attempts', () => {
            const game = { ...gameInitialConfig, currentLetterPosition: 6, currentGuess: 'allow' }
            expect(app.onKeyPressed('A', game)).toBe(NOTIFICATION_REACH_MAX_LETTERS_PER_ROW)
            expect(game.currentGuess).toBe('allow')
            expect(game.currentLetterPosition).toBe(6)
            expect(game.currentRow).toBe(1)
        })
    })

    describe('Simulating typing of valid letter', () => {
        test('When game object is initialized', () => {
            const game = { ...gameInitialConfig }
            expect(game.currentGuess).toBe('')
            expect(game.currentLetterPosition).toBe(1)
            expect(game.currentRow).toBe(1)
        })

        test('Typing the first letter', () => {
            const game = { ...gameInitialConfig }
            expect(app.onKeyPressed('a', game)).toBe(NOTIFICATION_DISPLAY_LETTER_SUCCESSFULLY)
            expect(game.currentGuess).toBe('a')
            expect(game.currentLetterPosition).toBe(2)
            expect(game.currentRow).toBe(1)
        })

        test('Typing the second letter', () => {
            const game = { ...gameInitialConfig, currentGuess: 'a', currentLetterPosition: 2 }
            expect(app.onKeyPressed('l', game)).toBe(NOTIFICATION_DISPLAY_LETTER_SUCCESSFULLY)
            expect(game.currentGuess).toBe('al')
            expect(game.currentLetterPosition).toBe(3)
            expect(game.currentRow).toBe(1)
        })

        test('Typing the third letter', () => {
            const game = { ...gameInitialConfig, currentGuess: 'al', currentLetterPosition: 3 }
            expect(app.onKeyPressed('l', game)).toBe(NOTIFICATION_DISPLAY_LETTER_SUCCESSFULLY)
            expect(game.currentGuess).toBe('all')
            expect(game.currentLetterPosition).toBe(4)
            expect(game.currentRow).toBe(1)
        })

        test('Typing the fourth letter', () => {
            const game = { ...gameInitialConfig, currentGuess: 'all', currentLetterPosition: 4 }
            expect(app.onKeyPressed('o', game)).toBe(NOTIFICATION_DISPLAY_LETTER_SUCCESSFULLY)
            expect(game.currentGuess).toBe('allo')
            expect(game.currentLetterPosition).toBe(5)
            expect(game.currentRow).toBe(1)
        })

        test('Typing the fifth letter', () => {
            const game = { ...gameInitialConfig, currentGuess: 'allo', currentLetterPosition: 5 }
            expect(app.onKeyPressed('w', game)).toBe(NOTIFICATION_DISPLAY_LETTER_SUCCESSFULLY)
            expect(game.currentGuess).toBe('allow')
            expect(game.currentLetterPosition).toBe(6)
            expect(game.currentRow).toBe(1)
        })
    })
})
