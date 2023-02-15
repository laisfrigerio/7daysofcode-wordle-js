const app = require('../resources/scripts/app')

describe('Testing Enter key pressed', () => {
    test('should return true when key pressed is equals to Enter', () => {
        expect(app.isEnterKeyPressed('Enter')).toBe(true)
    })

    test('should return true when key pressed is not equals to Enter', () => {
        expect(app.isEnterKeyPressed('A')).toBe(false)
        expect(app.isEnterKeyPressed('*')).toBe(false)
        expect(app.isEnterKeyPressed('3')).toBe(false)
        expect(app.isEnterKeyPressed('Meta')).toBe(false)
        expect(app.isEnterKeyPressed('Backspace')).toBe(false)
        expect(app.isEnterKeyPressed('Delete')).toBe(false)
    })
})

describe('Testing Backspace/Delete key pressed', () => {
    test('should return true when key pressed is equals to Backspace', () => {
        expect(app.isBackspaceKeyPressed('Backspace')).toBe(true)
    })

    test('should return true when key pressed is equals to Delete', () => {
        expect(app.isBackspaceKeyPressed('Delete')).toBe(true)
    })

    test('should return true when key pressed is not equals to Backspace/Delete', () => {
        expect(app.isBackspaceKeyPressed('A')).toBe(false)
        expect(app.isBackspaceKeyPressed('*')).toBe(false)
        expect(app.isBackspaceKeyPressed('3')).toBe(false)
        expect(app.isBackspaceKeyPressed('Meta')).toBe(false)
        expect(app.isBackspaceKeyPressed('Enter')).toBe(false)
    })
})
