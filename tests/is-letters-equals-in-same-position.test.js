const app = require('../resources/scripts/app')

describe('Checking if the letter existing in a word', () => {
    test('should return true because the letters matchs in the same position', () => {
        expect(app.isLettersEqualsInSamePosition(0, 'above', 'agent')).toBe(true)
        expect(app.isLettersEqualsInSamePosition(1, 'adept', 'adopt')).toBe(true)
        expect(app.isLettersEqualsInSamePosition(2, 'arrow', 'sorry')).toBe(true)
        expect(app.isLettersEqualsInSamePosition(3, 'sorry', 'worry')).toBe(true)
        expect(app.isLettersEqualsInSamePosition(4, 'actor', 'actor')).toBe(true)
    })

    test('should return false because the letters doesn\'t match in the same position', () => {
        expect(app.isLettersEqualsInSamePosition(0, 'badge', 'agent')).toBe(false)
        expect(app.isLettersEqualsInSamePosition(1, 'ahead', 'await')).toBe(false)
        expect(app.isLettersEqualsInSamePosition(2, 'candy', 'house')).toBe(false)
        expect(app.isLettersEqualsInSamePosition(3, 'lunch', 'above')).toBe(false)
        expect(app.isLettersEqualsInSamePosition(4, 'bills', 'blade')).toBe(false)
    })
})
