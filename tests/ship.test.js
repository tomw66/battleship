const Ship = require('../src/index');
const boat = Ship(3);

test('simple case', () => {
  expect(boat.isSunk()).toBe(false);
});

test('hit once', () => {
    boat.hit(5)
    expect(boat.isSunk()).toBe(false);
  });

  test('hit twice', () => {
    boat.hit(54)
    expect(boat.isSunk()).toBe(false);
  });

  test('hit thrice', () => {
    boat.hit(5232)
    expect(boat.isSunk()).toBe(true);
  });
