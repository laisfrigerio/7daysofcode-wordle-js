const app = require('../resources/scripts/app')

const NOTIFICATION_EMPTY_GUESS = 'Empty guess'
const NOTIFICATION_ENTER_KEY_PRESSED = 'Enter key pressed'
const NOTIFICATION_INCOMPLETE_GUESS = 'Incomplete guess'
const NOTIFICATION_WORD_NOT_IN_DATABASE = 'Word not in database'

describe('Checking guess', () => {
    const database = ['agent', 'above', 'lunch', 'money', 'sorry', 'today', 'worry']

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
})
