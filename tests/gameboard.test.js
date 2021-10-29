const funcs = require('../src/index');
const Gameboard = funcs.Gameboard;
const newBoard = Gameboard();
test('place a ship', () => {
  expect(newBoard.placeShip('tugger', 3, [1, 1], 'x')).toMatchObject([
    { 'name': 'tugger', 'posArray' : [[1,1],[2,1],[3,1]]}
  ]);
});

test('place another ship', () => {
  expect(newBoard.placeShip('trawler', 5, [2, 3], 'y')).toMatchObject([
    { 'name': 'tugger', 'posArray' : [[1,1],[2,1],[3,1]]},
    { 'name': 'trawler', 'posArray' : [[2,3],[2,4],[2,5],[2,6],[2,7]]}
  ]);
});

test('reject ship if out of bounds', () => {
  expect(() => newBoard.placeShip('cruiser', 5, [7, 7, 'x'])).toThrow('Ship out of bounds')
});

test('fdgff', () => {
  expect(newBoard.receiveAttack([2,5])).toMatchObject([2,5])
});