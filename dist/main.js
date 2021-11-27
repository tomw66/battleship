/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module) => {

const Ship = (name, length) => {
    let hitCoords = [];
    const hit = (pos) => {
        hitCoords.push(pos);
    };
    const isSunk = () => {
        return (hitCoords.length === length)
    };
    return {name, length, hitCoords, hit, isSunk};
};

const Gameboard = () => {
    const shipArray = [];
    const occupiedArray = [];
    const missedArray = [];
    const sunkArray = [];
    const placeShip = (name, length, startCoord, orientation) => {
        const createPositionArray = () => {
            const positionArray = [];
            let dimension;
            const coord = (or, x, y) => {
                if(or ==='x') {return [x, y[1]]}
                else if(or === 'y') {return [y[0], x]}
            };
            orientation === 'x' ? (dimension = startCoord[0]) : (dimension = startCoord[1])
            for(let i = dimension; i < (dimension + length); i++) {
                if(i > 9) {throw new Error('Ship out of bounds')};
                let newCoord = coord(orientation, i, startCoord);
                if(checkOccupied(newCoord) !== undefined) {throw new Error('Already occupied')};
                positionArray.push(newCoord);
            }
            shipArray.push(Ship(name, length));
            return positionArray;
        };
        const updateOccupiedArray = () => {
            let posArray = createPositionArray();
            occupiedArray.push({name, posArray})
            return occupiedArray;
        };
        return updateOccupiedArray();
    };
    const randomPlace = () => {
        let starts = [];
        let ors = [];
        const randomCoord = () => {
            const x = Math.floor(Math.random()*10);
            const y = Math.floor(Math.random()*10);
            return [x, y];
        }
        const randomOr = () => {
            let choices = ['x', 'y']
            return choices[Math.floor(Math.random() * 2)]
        }
        for(let i = 0; i < 5; i++) {
            starts[i] = randomCoord();
            ors[i] = randomOr();
        }
        return {starts, ors}
    };
    const placeAllShips = (manual, inputStartArray, inputOrArray) => {
        const shipClasses = ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer'];
        const sizes = [5, 4, 3, 3, 2];
        let startArray;
        let orArray;
        let currentOccupiedArray = []; //This may be adjusted when UI is implemented
        if(manual) {
            startArray = inputStartArray;
            orArray = inputOrArray;
        }
        else if (!manual) {
            startArray = randomPlace.randomCoord();
            orArray = randomPlace.randomOr();
        }
        for(let i = 0; i < sizes.length; i++) {
            try {
                currentOccupiedArray[i] = placeShip(shipClasses[i], sizes[i], startArray[i], orArray[i]);
            }
            catch(error) {
                console.log(error);
                i--
            }
        }
        return currentOccupiedArray[4];
    };
    const checkGameOver = () => {
        if(sunkArray.length === shipArray.length) {
            return true;
        }
    };
    const hitShip = (i, coords) => {
        shipArray[i].hit(coords);
        if(shipArray[i].isSunk()) {
            sunkArray.push(shipArray[i]);
            checkGameOver();
        }
    };
    const checkOccupied = (coords) => {
        for(let i = 0; i < occupiedArray.length; i++) {
            let posString = JSON.stringify(occupiedArray[i].posArray);
            if(posString.includes(JSON.stringify(coords))){
                return i;
            }
        }
    };
    const receiveAttack = (coords) => {
        let miss = true;
        let target = checkOccupied(coords);
        if(target !== undefined) {
            hitShip(target, coords);
            miss = false;
        }
        if(miss) {missedArray.push(coords)};
    };
    return {
        placeShip, 
        placeAllShips,
        receiveAttack, 
        checkGameOver, 
        missedArray, 
        shipArray, 
        sunkArray
    };
};

const Player = (name, board) => {
    const autoAttack = () => {//now in a function above
        const x = Math.floor(Math.random()*10);
        const y = Math.floor(Math.random()*10);
        return [x, y];
    };
    const manualAttack = (x, y) => {
        return [x, y];
    };
    return {name, board, autoAttack, manualAttack};
};

const gameloop = () => {
    let person = Player('Tom', Gameboard());
    let bot = Player('Computer', Gameboard());
    let personStartChoices = [[2,2],[9,3],[0,6],[4,8],[5,4]];
    let personOrChoices = ['x','y','y','x','y'];
    console.log(person.placeAllShips(true, personStartChoices, personOrChoices));
    console.log(bot.placeAllShips(false));
};
gameloop();
module.exports.Ship = Ship;
module.exports.Gameboard = Gameboard;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CLHFDQUFxQztBQUNyQztBQUNBO0FBQ0EsbUNBQW1DLDBCQUEwQjtBQUM3RCwyQkFBMkI7QUFDM0I7QUFDQSwyREFBMkQ7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsZUFBZTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixPQUFPO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QiwwQkFBMEI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsd0JBQXdCOzs7Ozs7VUNsSnhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFNoaXAgPSAobmFtZSwgbGVuZ3RoKSA9PiB7XG4gICAgbGV0IGhpdENvb3JkcyA9IFtdO1xuICAgIGNvbnN0IGhpdCA9IChwb3MpID0+IHtcbiAgICAgICAgaGl0Q29vcmRzLnB1c2gocG9zKTtcbiAgICB9O1xuICAgIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIChoaXRDb29yZHMubGVuZ3RoID09PSBsZW5ndGgpXG4gICAgfTtcbiAgICByZXR1cm4ge25hbWUsIGxlbmd0aCwgaGl0Q29vcmRzLCBoaXQsIGlzU3Vua307XG59O1xuXG5jb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2hpcEFycmF5ID0gW107XG4gICAgY29uc3Qgb2NjdXBpZWRBcnJheSA9IFtdO1xuICAgIGNvbnN0IG1pc3NlZEFycmF5ID0gW107XG4gICAgY29uc3Qgc3Vua0FycmF5ID0gW107XG4gICAgY29uc3QgcGxhY2VTaGlwID0gKG5hbWUsIGxlbmd0aCwgc3RhcnRDb29yZCwgb3JpZW50YXRpb24pID0+IHtcbiAgICAgICAgY29uc3QgY3JlYXRlUG9zaXRpb25BcnJheSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uQXJyYXkgPSBbXTtcbiAgICAgICAgICAgIGxldCBkaW1lbnNpb247XG4gICAgICAgICAgICBjb25zdCBjb29yZCA9IChvciwgeCwgeSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKG9yID09PSd4Jykge3JldHVybiBbeCwgeVsxXV19XG4gICAgICAgICAgICAgICAgZWxzZSBpZihvciA9PT0gJ3knKSB7cmV0dXJuIFt5WzBdLCB4XX1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBvcmllbnRhdGlvbiA9PT0gJ3gnID8gKGRpbWVuc2lvbiA9IHN0YXJ0Q29vcmRbMF0pIDogKGRpbWVuc2lvbiA9IHN0YXJ0Q29vcmRbMV0pXG4gICAgICAgICAgICBmb3IobGV0IGkgPSBkaW1lbnNpb247IGkgPCAoZGltZW5zaW9uICsgbGVuZ3RoKTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYoaSA+IDkpIHt0aHJvdyBuZXcgRXJyb3IoJ1NoaXAgb3V0IG9mIGJvdW5kcycpfTtcbiAgICAgICAgICAgICAgICBsZXQgbmV3Q29vcmQgPSBjb29yZChvcmllbnRhdGlvbiwgaSwgc3RhcnRDb29yZCk7XG4gICAgICAgICAgICAgICAgaWYoY2hlY2tPY2N1cGllZChuZXdDb29yZCkgIT09IHVuZGVmaW5lZCkge3Rocm93IG5ldyBFcnJvcignQWxyZWFkeSBvY2N1cGllZCcpfTtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbkFycmF5LnB1c2gobmV3Q29vcmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2hpcEFycmF5LnB1c2goU2hpcChuYW1lLCBsZW5ndGgpKTtcbiAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbkFycmF5O1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCB1cGRhdGVPY2N1cGllZEFycmF5ID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHBvc0FycmF5ID0gY3JlYXRlUG9zaXRpb25BcnJheSgpO1xuICAgICAgICAgICAgb2NjdXBpZWRBcnJheS5wdXNoKHtuYW1lLCBwb3NBcnJheX0pXG4gICAgICAgICAgICByZXR1cm4gb2NjdXBpZWRBcnJheTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHVwZGF0ZU9jY3VwaWVkQXJyYXkoKTtcbiAgICB9O1xuICAgIGNvbnN0IHJhbmRvbVBsYWNlID0gKCkgPT4ge1xuICAgICAgICBsZXQgc3RhcnRzID0gW107XG4gICAgICAgIGxldCBvcnMgPSBbXTtcbiAgICAgICAgY29uc3QgcmFuZG9tQ29vcmQgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwKTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTApO1xuICAgICAgICAgICAgcmV0dXJuIFt4LCB5XTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByYW5kb21PciA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjaG9pY2VzID0gWyd4JywgJ3knXVxuICAgICAgICAgICAgcmV0dXJuIGNob2ljZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMildXG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICAgICAgc3RhcnRzW2ldID0gcmFuZG9tQ29vcmQoKTtcbiAgICAgICAgICAgIG9yc1tpXSA9IHJhbmRvbU9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtzdGFydHMsIG9yc31cbiAgICB9O1xuICAgIGNvbnN0IHBsYWNlQWxsU2hpcHMgPSAobWFudWFsLCBpbnB1dFN0YXJ0QXJyYXksIGlucHV0T3JBcnJheSkgPT4ge1xuICAgICAgICBjb25zdCBzaGlwQ2xhc3NlcyA9IFsnQ2FycmllcicsICdCYXR0bGVzaGlwJywgJ0NydWlzZXInLCAnU3VibWFyaW5lJywgJ0Rlc3Ryb3llciddO1xuICAgICAgICBjb25zdCBzaXplcyA9IFs1LCA0LCAzLCAzLCAyXTtcbiAgICAgICAgbGV0IHN0YXJ0QXJyYXk7XG4gICAgICAgIGxldCBvckFycmF5O1xuICAgICAgICBsZXQgY3VycmVudE9jY3VwaWVkQXJyYXkgPSBbXTsgLy9UaGlzIG1heSBiZSBhZGp1c3RlZCB3aGVuIFVJIGlzIGltcGxlbWVudGVkXG4gICAgICAgIGlmKG1hbnVhbCkge1xuICAgICAgICAgICAgc3RhcnRBcnJheSA9IGlucHV0U3RhcnRBcnJheTtcbiAgICAgICAgICAgIG9yQXJyYXkgPSBpbnB1dE9yQXJyYXk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIW1hbnVhbCkge1xuICAgICAgICAgICAgc3RhcnRBcnJheSA9IHJhbmRvbVBsYWNlLnJhbmRvbUNvb3JkKCk7XG4gICAgICAgICAgICBvckFycmF5ID0gcmFuZG9tUGxhY2UucmFuZG9tT3IoKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2l6ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY3VycmVudE9jY3VwaWVkQXJyYXlbaV0gPSBwbGFjZVNoaXAoc2hpcENsYXNzZXNbaV0sIHNpemVzW2ldLCBzdGFydEFycmF5W2ldLCBvckFycmF5W2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgIGktLVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdXJyZW50T2NjdXBpZWRBcnJheVs0XTtcbiAgICB9O1xuICAgIGNvbnN0IGNoZWNrR2FtZU92ZXIgPSAoKSA9PiB7XG4gICAgICAgIGlmKHN1bmtBcnJheS5sZW5ndGggPT09IHNoaXBBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBoaXRTaGlwID0gKGksIGNvb3JkcykgPT4ge1xuICAgICAgICBzaGlwQXJyYXlbaV0uaGl0KGNvb3Jkcyk7XG4gICAgICAgIGlmKHNoaXBBcnJheVtpXS5pc1N1bmsoKSkge1xuICAgICAgICAgICAgc3Vua0FycmF5LnB1c2goc2hpcEFycmF5W2ldKTtcbiAgICAgICAgICAgIGNoZWNrR2FtZU92ZXIoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgY2hlY2tPY2N1cGllZCA9IChjb29yZHMpID0+IHtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG9jY3VwaWVkQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwb3NTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShvY2N1cGllZEFycmF5W2ldLnBvc0FycmF5KTtcbiAgICAgICAgICAgIGlmKHBvc1N0cmluZy5pbmNsdWRlcyhKU09OLnN0cmluZ2lmeShjb29yZHMpKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmRzKSA9PiB7XG4gICAgICAgIGxldCBtaXNzID0gdHJ1ZTtcbiAgICAgICAgbGV0IHRhcmdldCA9IGNoZWNrT2NjdXBpZWQoY29vcmRzKTtcbiAgICAgICAgaWYodGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGhpdFNoaXAodGFyZ2V0LCBjb29yZHMpO1xuICAgICAgICAgICAgbWlzcyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKG1pc3MpIHttaXNzZWRBcnJheS5wdXNoKGNvb3Jkcyl9O1xuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGxhY2VTaGlwLCBcbiAgICAgICAgcGxhY2VBbGxTaGlwcyxcbiAgICAgICAgcmVjZWl2ZUF0dGFjaywgXG4gICAgICAgIGNoZWNrR2FtZU92ZXIsIFxuICAgICAgICBtaXNzZWRBcnJheSwgXG4gICAgICAgIHNoaXBBcnJheSwgXG4gICAgICAgIHN1bmtBcnJheVxuICAgIH07XG59O1xuXG5jb25zdCBQbGF5ZXIgPSAobmFtZSwgYm9hcmQpID0+IHtcbiAgICBjb25zdCBhdXRvQXR0YWNrID0gKCkgPT4gey8vbm93IGluIGEgZnVuY3Rpb24gYWJvdmVcbiAgICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMCk7XG4gICAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTApO1xuICAgICAgICByZXR1cm4gW3gsIHldO1xuICAgIH07XG4gICAgY29uc3QgbWFudWFsQXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICAgICAgcmV0dXJuIFt4LCB5XTtcbiAgICB9O1xuICAgIHJldHVybiB7bmFtZSwgYm9hcmQsIGF1dG9BdHRhY2ssIG1hbnVhbEF0dGFja307XG59O1xuXG5jb25zdCBnYW1lbG9vcCA9ICgpID0+IHtcbiAgICBsZXQgcGVyc29uID0gUGxheWVyKCdUb20nLCBHYW1lYm9hcmQoKSk7XG4gICAgbGV0IGJvdCA9IFBsYXllcignQ29tcHV0ZXInLCBHYW1lYm9hcmQoKSk7XG4gICAgbGV0IHBlcnNvblN0YXJ0Q2hvaWNlcyA9IFtbMiwyXSxbOSwzXSxbMCw2XSxbNCw4XSxbNSw0XV07XG4gICAgbGV0IHBlcnNvbk9yQ2hvaWNlcyA9IFsneCcsJ3knLCd5JywneCcsJ3knXTtcbiAgICBjb25zb2xlLmxvZyhwZXJzb24ucGxhY2VBbGxTaGlwcyh0cnVlLCBwZXJzb25TdGFydENob2ljZXMsIHBlcnNvbk9yQ2hvaWNlcykpO1xuICAgIGNvbnNvbGUubG9nKGJvdC5wbGFjZUFsbFNoaXBzKGZhbHNlKSk7XG59O1xuZ2FtZWxvb3AoKTtcbm1vZHVsZS5leHBvcnRzLlNoaXAgPSBTaGlwO1xubW9kdWxlLmV4cG9ydHMuR2FtZWJvYXJkID0gR2FtZWJvYXJkOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ21vZHVsZScgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=