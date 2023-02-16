const app = require('../resources/scripts/app')

describe('Checking if the letter existing in a word', () => {
    test('should return true because the letter is in the right guess', () => {
        expect(app.isLetterInRightGuess('a', 'allow')).toBe(true)
        expect(app.isLetterInRightGuess('h', 'ahead')).toBe(true)
        expect(app.isLetterInRightGuess('e', 'badge')).toBe(true)
        expect(app.isLetterInRightGuess('s', 'house')).toBe(true)
        expect(app.isLetterInRightGuess('y', 'sorry')).toBe(true)
    })

    test('should return false because the letter is not in the right guess', () => {
        expect(app.isLetterInRightGuess('i', 'ahead')).toBe(false)
        expect(app.isLetterInRightGuess('d', 'beach')).toBe(false)
        expect(app.isLetterInRightGuess('i', 'agent')).toBe(false)
        expect(app.isLetterInRightGuess('l', 'sorry')).toBe(false)
        expect(app.isLetterInRightGuess('a', 'below')).toBe(false)
    })
})
