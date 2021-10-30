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

test('record missed attacks', () => {
  newBoard.receiveAttack([3,1]);
  newBoard.receiveAttack([2,5]);
  newBoard.receiveAttack([9,9]);
  expect(newBoard.missedArray).toMatchObject([[9,9]])
});

test('record hits', () => {
  expect(newBoard.shipArray[1].hitCoords).toMatchObject([[2,5]]);
  expect(newBoard.shipArray[0].hitCoords).toMatchObject([[3,1]]);
});

test('sink a ship', () => {
  expect(newBoard.shipArray[0].isSunk()).toBe(false);
  newBoard.receiveAttack([1,1]);
  newBoard.receiveAttack([2,1]);
  expect(newBoard.shipArray[0].isSunk()).toBe(true);
});

test('sink all ships', () => {
  newBoard.receiveAttack([2,3]);
  newBoard.receiveAttack([2,4]);
  newBoard.receiveAttack([2,6]);
  newBoard.receiveAttack([2,7]);
  expect(newBoard.checkGameOver()).toBe(true);
});