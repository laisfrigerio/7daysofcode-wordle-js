const app = require('../resources/scripts/app')

describe('Testing reaching max attempts', () => {
    test('should return true because current row is greater than 6', () => {
        expect(app.reachMaxAttempts(7)).toBe(true)
    })

    test('should return false because current row is equals to limit (6)', () => {
        expect(app.reachMaxAttempts(6)).toBe(false)
    })

    test('should return false because current row is less than the limit (6)', () => {
        expect(app.reachMaxAttempts(5)).toBe(false)
        expect(app.reachMaxAttempts(3)).toBe(false)
        expect(app.reachMaxAttempts(0)).toBe(false)
        expect(app.reachMaxAttempts(-2)).toBe(false)
    })
})

describe('Testing reaching max letter per row', () => {
    test('should return true because current letter position is greater than 5', () => {
        expect(app.reachMaxLetterPerRow(6)).toBe(true)
    })

    test('should return false because current letter position is equals to limit (5)', () => {
        expect(app.reachMaxLetterPerRow(5)).toBe(false)
    })

    test('should return false because current letter position is less than the limit (5)', () => {
        expect(app.reachMaxLetterPerRow(4)).toBe(false)
        expect(app.reachMaxLetterPerRow(3)).toBe(false)
        expect(app.reachMaxLetterPerRow(0)).toBe(false)
        expect(app.reachMaxLetterPerRow(-2)).toBe(false)
    })
})
