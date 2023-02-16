const app = require('../resources/scripts/app')

test('Testing remove last letter from a word', () => {
    expect(app.removeLastLetter('allow')).toBe('allo')
    expect(app.removeLastLetter('badg')).toBe('bad')
    expect(app.removeLastLetter('act')).toBe('ac')
    expect(app.removeLastLetter('ca')).toBe('c')
    expect(app.removeLastLetter('h')).toBe('')
    expect(app.removeLastLetter('')).toBe('')
})
