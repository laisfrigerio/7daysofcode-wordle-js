const app = require('../resources/scripts/app')

describe('Checking if is a test enviroment', () => {
    const currentProcessEnv = process

    beforeEach(() => {
        jest.resetModules()
        process = undefined
    })

    afterEach(() => {
        process = currentProcessEnv
    })

    test('should return false when proccess.env is undefined ', () => {
        expect(app.isTestEnviroment()).toBe(false)
    })

    test('should return false when proccess.env.NODE_ENV is different than test ', () => {
        process = { env: { NODE_ENV: 'dev'}}
        expect(app.isTestEnviroment()).toBe(false)
    })

    test('should return true when proccess.env.NODE_ENV is different test ', () => {
        process = currentProcessEnv
        expect(app.isTestEnviroment()).toBe(true)
    })
})
