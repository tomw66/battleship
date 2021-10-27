const funcs = require('../src/index');
const Gameboard = funcs.Gameboard;
const newBoard = Gameboard();
test('simple case', () => {
  expect(newBoard.placeShip('tugger', 3, [1, 1], 'x')).toStrictEqual([{ 'name': 'tugger', 'posArray' : [[1,1],[2,1],[3,1]]}]);
});