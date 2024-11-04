import { gettTriangle } from './Myutil'

describe('test', () => {
  beforeEach(() => {
    console.log(new Date().toLocaleString())
  })

  test('正常', () => {
    expect(gettTriangle(10, 2)).toBe(10)
  })
})
