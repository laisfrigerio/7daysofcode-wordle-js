const app = require('../resources/scripts/app')

describe('Checking the guess is correct', () => {
    test('should return true because guess is equals to right guess', () => {
        expect(app.isCorrectGuess('allow', 'allow')).toBe(true)
        expect(app.isCorrectGuess('ahead', 'ahead')).toBe(true)
        expect(app.isCorrectGuess('badge', 'badge')).toBe(true)
        expect(app.isCorrectGuess('house', 'house')).toBe(true)
        expect(app.isCorrectGuess('sorry', 'sorry')).toBe(true)
        expect(app.isCorrectGuess('ALLOW', 'AlloW')).toBe(true)
        expect(app.isCorrectGuess('aLLOW', 'ALlOw')).toBe(true)
        expect(app.isCorrectGuess('ALLOW', 'allow')).toBe(true)
    })

    test('should return false because the guess is not equals to right guess', () => {
        expect(app.isCorrectGuess('house', 'ahead')).toBe(false)
        expect(app.isCorrectGuess('badge', 'beach')).toBe(false)
        expect(app.isCorrectGuess('actor', 'agent')).toBe(false)
        expect(app.isCorrectGuess('worry', 'sorry')).toBe(false)
        expect(app.isCorrectGuess('allow', 'below')).toBe(false)
        expect(app.isCorrectGuess('ALLOW', 'allou')).toBe(false)
        expect(app.isCorrectGuess('wORRY', 'woryy')).toBe(false)
    })
})
