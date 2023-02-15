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

describe('Testing Valid key pressed', () => {
    test('should return true when key pressed is valid one (Backspace, Delete, Enter, A-Z, a-z)', () => {
        expect(app.isValidKeyPressed('Backspace')).toBe(true)
        expect(app.isValidKeyPressed('Delete')).toBe(true)
        expect(app.isValidKeyPressed('Enter')).toBe(true)
        expect(app.isValidKeyPressed('A')).toBe(true)
        expect(app.isValidKeyPressed('H')).toBe(true)
        expect(app.isValidKeyPressed('Z')).toBe(true)
        expect(app.isValidKeyPressed('c')).toBe(true)
        expect(app.isValidKeyPressed('o')).toBe(true)
        expect(app.isValidKeyPressed('x')).toBe(true)
    })

    test('should return false when key pressed is not part of valid options (Backspace, Delete, Enter, A-Z, a-z)', () => {
        expect(app.isValidKeyPressed('Meta')).toBe(false)
        expect(app.isValidKeyPressed('1')).toBe(false)
        expect(app.isValidKeyPressed(2)).toBe(false)
        expect(app.isValidKeyPressed('&')).toBe(false)
        expect(app.isValidKeyPressed('*')).toBe(false)
        expect(app.isValidKeyPressed(6)).toBe(false)
        expect(app.isValidKeyPressed('4')).toBe(false)
        expect(app.isValidKeyPressed('/')).toBe(false)
        expect(app.isValidKeyPressed('Shift')).toBe(false)
    })
})
