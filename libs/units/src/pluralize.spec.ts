import { pluralize } from './pluralize'

test('pluralize', () => {
  expect(pluralize(0, 'test')).toBe('0 tests')
  expect(pluralize(1, 'test')).toBe('1 test')
  expect(pluralize(2, 'test')).toBe('2 tests')
  expect(pluralize(0, 'child', 'children')).toBe('0 children')
  expect(pluralize(1, 'child', 'children')).toBe('1 child')
  expect(pluralize(2, 'child', 'children')).toBe('2 children')
  expect(
    pluralize(0, 'child', {
      customZero: 'no children',
    })
  ).toBe('no children')
  expect(
    pluralize(3, 'child', {
      customZero: 'no children',
    })
  ).toBe('3 childs')
  expect(
    pluralize(3, 'child', {
      customZero: 'no children',
      plural: 'children',
    })
  ).toBe('3 children')
})
