const app = require('../resources/scripts/app')

describe('Checking next guess configuration', () => {
    const database = ['allow', 'actor', 'badge', 'beach', 'candy', 'house']

    test('should increment game attributes - first guess', () => {
        const game = {
            database,
            currentRow: 1,
            currentLetterPosition: 6,
            currentGuess: 'beach',
            rightGuess: 'badge'
        }

        app.nextGuess(game)

        expect(game.currentRow).toBe(2)
        expect(game.currentLetterPosition).toBe(1)
        expect(game.currentGuess).toBe('')
        expect(game.rightGuess).toBe('badge')
    })

    test('should increment game attributes - second guess', () => {
        const game = {
            database,
            currentRow: 2,
            currentLetterPosition: 6,
            currentGuess: 'actor',
            rightGuess: 'allow'
        }

        app.nextGuess(game)

        expect(game.currentRow).toBe(3)
        expect(game.currentLetterPosition).toBe(1)
        expect(game.currentGuess).toBe('')
        expect(game.rightGuess).toBe('allow')
    })

    test('should increment game attributes - third guess', () => {
        const game = {
            database,
            currentRow: 3,
            currentLetterPosition: 6,
            currentGuess: 'actor',
            rightGuess: 'candy'
        }

        app.nextGuess(game)

        expect(game.currentRow).toBe(4)
        expect(game.currentLetterPosition).toBe(1)
        expect(game.currentGuess).toBe('')
        expect(game.rightGuess).toBe('candy')
    })

    test('should increment game attributes - fourth guess', () => {
        const game = {
            database,
            currentRow: 4,
            currentLetterPosition: 6,
            currentGuess: 'badge',
            rightGuess: 'house'
        }

        app.nextGuess(game)

        expect(game.currentRow).toBe(5)
        expect(game.currentLetterPosition).toBe(1)
        expect(game.currentGuess).toBe('')
        expect(game.rightGuess).toBe('house')
    })

    test('should increment game attributes - fifth guess', () => {
        const game = {
            database,
            currentRow: 5,
            currentLetterPosition: 6,
            currentGuess: 'candy',
            rightGuess: 'beach'
        }

        app.nextGuess(game)

        expect(game.currentRow).toBe(6)
        expect(game.currentLetterPosition).toBe(1)
        expect(game.currentGuess).toBe('')
        expect(game.rightGuess).toBe('beach')
    })
})
