const app = require('../resources/scripts/app')

describe('Loading database json file', () => {
    test('should return an array with 2 itens', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ words: ['house', 'candy'] }),
            })
        )

        expect(await app.loadWords()).toEqual(['house', 'candy'])
    })

    test('should return an empty array', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ words: [] }),
            })
        )

        expect(await app.loadWords()).toEqual([])
    })

    test('should return an empty array when something unexpected happens..', async () => {
        global.fetch = jest.fn(() =>
            Promise.reject(new Error('something unexpected happens...'))
        )

        expect(await app.loadWords()).toEqual([])
    })
})
