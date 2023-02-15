const app = require('../resources/scripts/app')

describe('Checking current guess is an empty string', () => {
    test('should return true because the argument is empty string', () => {
        expect(app.isCurrentGuessEmpty('')).toBe(true)
    })

    test('should return false because the argument is not empty string', () => {
        expect(app.isCurrentGuessEmpty('house')).toBe(false)
        expect(app.isCurrentGuessEmpty('h')).toBe(false)
        expect(app.isCurrentGuessEmpty('ho')).toBe(false)
    })
})
