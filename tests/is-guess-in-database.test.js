const app = require('../resources/scripts/app')

describe('Testing case guess is in database', () => {
    const wordList = ["agent",
                      "aging",
                      "agree",
                      "ahead",
                      "aides",
                      "aimed",
                      "agile",
                      "alarm",
                      "alert",
                      "bikes",
                      "blade",
                      "candy",
                      "house",
                      "sorry",
                      "worry"]

     test('should return false because allow is not in list', () => {
        expect(app.isGuessInDatabase('allow', wordList)).toBe(false)
    })

    test('should return true because agile is in list', () => {
        expect(app.isGuessInDatabase('agile', wordList)).toBe(true)
    })

    test('should return true because worry is in list', () => {
        expect(app.isGuessInDatabase('worry', wordList)).toBe(true)
    })

    test('should return true because agent is in list', () => {
        expect(app.isGuessInDatabase('agent', wordList)).toBe(true)
    })
})
