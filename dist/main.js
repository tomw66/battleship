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
            startArray = randomPlace().starts;
            orArray = randomPlace().ors;
        }
        for(let i = 0; i < sizes.length; i++) {
            try {
                currentOccupiedArray[i] = placeShip(shipClasses[i], sizes[i], startArray[i], orArray[i]);
            }
            catch(error) {
                console.log(error);
                startArray = randomPlace().starts; //This temporary; also need to request another input from user
                orArray = randomPlace().ors;
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
    console.log(person.board.placeAllShips(true, personStartChoices, personOrChoices));
    console.log(bot.board.placeAllShips(false));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CLHFDQUFxQztBQUNyQztBQUNBO0FBQ0EsbUNBQW1DLDBCQUEwQjtBQUM3RCwyQkFBMkI7QUFDM0I7QUFDQSwyREFBMkQ7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsZUFBZTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixPQUFPO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxrQkFBa0I7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsMEJBQTBCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CLHdCQUF3Qjs7Ozs7O1VDcEp4QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBTaGlwID0gKG5hbWUsIGxlbmd0aCkgPT4ge1xuICAgIGxldCBoaXRDb29yZHMgPSBbXTtcbiAgICBjb25zdCBoaXQgPSAocG9zKSA9PiB7XG4gICAgICAgIGhpdENvb3Jkcy5wdXNoKHBvcyk7XG4gICAgfTtcbiAgICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiAoaGl0Q29vcmRzLmxlbmd0aCA9PT0gbGVuZ3RoKVxuICAgIH07XG4gICAgcmV0dXJuIHtuYW1lLCBsZW5ndGgsIGhpdENvb3JkcywgaGl0LCBpc1N1bmt9O1xufTtcblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICAgIGNvbnN0IHNoaXBBcnJheSA9IFtdO1xuICAgIGNvbnN0IG9jY3VwaWVkQXJyYXkgPSBbXTtcbiAgICBjb25zdCBtaXNzZWRBcnJheSA9IFtdO1xuICAgIGNvbnN0IHN1bmtBcnJheSA9IFtdO1xuICAgIGNvbnN0IHBsYWNlU2hpcCA9IChuYW1lLCBsZW5ndGgsIHN0YXJ0Q29vcmQsIG9yaWVudGF0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGNyZWF0ZVBvc2l0aW9uQXJyYXkgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbkFycmF5ID0gW107XG4gICAgICAgICAgICBsZXQgZGltZW5zaW9uO1xuICAgICAgICAgICAgY29uc3QgY29vcmQgPSAob3IsIHgsIHkpID0+IHtcbiAgICAgICAgICAgICAgICBpZihvciA9PT0neCcpIHtyZXR1cm4gW3gsIHlbMV1dfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYob3IgPT09ICd5Jykge3JldHVybiBbeVswXSwgeF19XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgb3JpZW50YXRpb24gPT09ICd4JyA/IChkaW1lbnNpb24gPSBzdGFydENvb3JkWzBdKSA6IChkaW1lbnNpb24gPSBzdGFydENvb3JkWzFdKVxuICAgICAgICAgICAgZm9yKGxldCBpID0gZGltZW5zaW9uOyBpIDwgKGRpbWVuc2lvbiArIGxlbmd0aCk7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmKGkgPiA5KSB7dGhyb3cgbmV3IEVycm9yKCdTaGlwIG91dCBvZiBib3VuZHMnKX07XG4gICAgICAgICAgICAgICAgbGV0IG5ld0Nvb3JkID0gY29vcmQob3JpZW50YXRpb24sIGksIHN0YXJ0Q29vcmQpO1xuICAgICAgICAgICAgICAgIGlmKGNoZWNrT2NjdXBpZWQobmV3Q29vcmQpICE9PSB1bmRlZmluZWQpIHt0aHJvdyBuZXcgRXJyb3IoJ0FscmVhZHkgb2NjdXBpZWQnKX07XG4gICAgICAgICAgICAgICAgcG9zaXRpb25BcnJheS5wdXNoKG5ld0Nvb3JkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNoaXBBcnJheS5wdXNoKFNoaXAobmFtZSwgbGVuZ3RoKSk7XG4gICAgICAgICAgICByZXR1cm4gcG9zaXRpb25BcnJheTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgdXBkYXRlT2NjdXBpZWRBcnJheSA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwb3NBcnJheSA9IGNyZWF0ZVBvc2l0aW9uQXJyYXkoKTtcbiAgICAgICAgICAgIG9jY3VwaWVkQXJyYXkucHVzaCh7bmFtZSwgcG9zQXJyYXl9KVxuICAgICAgICAgICAgcmV0dXJuIG9jY3VwaWVkQXJyYXk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB1cGRhdGVPY2N1cGllZEFycmF5KCk7XG4gICAgfTtcbiAgICBjb25zdCByYW5kb21QbGFjZSA9ICgpID0+IHtcbiAgICAgICAgbGV0IHN0YXJ0cyA9IFtdO1xuICAgICAgICBsZXQgb3JzID0gW107XG4gICAgICAgIGNvbnN0IHJhbmRvbUNvb3JkID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMCk7XG4gICAgICAgICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwKTtcbiAgICAgICAgICAgIHJldHVybiBbeCwgeV07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmFuZG9tT3IgPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY2hvaWNlcyA9IFsneCcsICd5J11cbiAgICAgICAgICAgIHJldHVybiBjaG9pY2VzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpXVxuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgICAgIHN0YXJ0c1tpXSA9IHJhbmRvbUNvb3JkKCk7XG4gICAgICAgICAgICBvcnNbaV0gPSByYW5kb21PcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7c3RhcnRzLCBvcnN9XG4gICAgfTtcbiAgICBjb25zdCBwbGFjZUFsbFNoaXBzID0gKG1hbnVhbCwgaW5wdXRTdGFydEFycmF5LCBpbnB1dE9yQXJyYXkpID0+IHtcbiAgICAgICAgY29uc3Qgc2hpcENsYXNzZXMgPSBbJ0NhcnJpZXInLCAnQmF0dGxlc2hpcCcsICdDcnVpc2VyJywgJ1N1Ym1hcmluZScsICdEZXN0cm95ZXInXTtcbiAgICAgICAgY29uc3Qgc2l6ZXMgPSBbNSwgNCwgMywgMywgMl07XG4gICAgICAgIGxldCBzdGFydEFycmF5O1xuICAgICAgICBsZXQgb3JBcnJheTtcbiAgICAgICAgbGV0IGN1cnJlbnRPY2N1cGllZEFycmF5ID0gW107IC8vVGhpcyBtYXkgYmUgYWRqdXN0ZWQgd2hlbiBVSSBpcyBpbXBsZW1lbnRlZFxuICAgICAgICBpZihtYW51YWwpIHtcbiAgICAgICAgICAgIHN0YXJ0QXJyYXkgPSBpbnB1dFN0YXJ0QXJyYXk7XG4gICAgICAgICAgICBvckFycmF5ID0gaW5wdXRPckFycmF5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFtYW51YWwpIHtcbiAgICAgICAgICAgIHN0YXJ0QXJyYXkgPSByYW5kb21QbGFjZSgpLnN0YXJ0cztcbiAgICAgICAgICAgIG9yQXJyYXkgPSByYW5kb21QbGFjZSgpLm9ycztcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2l6ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY3VycmVudE9jY3VwaWVkQXJyYXlbaV0gPSBwbGFjZVNoaXAoc2hpcENsYXNzZXNbaV0sIHNpemVzW2ldLCBzdGFydEFycmF5W2ldLCBvckFycmF5W2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgIHN0YXJ0QXJyYXkgPSByYW5kb21QbGFjZSgpLnN0YXJ0czsgLy9UaGlzIHRlbXBvcmFyeTsgYWxzbyBuZWVkIHRvIHJlcXVlc3QgYW5vdGhlciBpbnB1dCBmcm9tIHVzZXJcbiAgICAgICAgICAgICAgICBvckFycmF5ID0gcmFuZG9tUGxhY2UoKS5vcnM7XG4gICAgICAgICAgICAgICAgaS0tXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnJlbnRPY2N1cGllZEFycmF5WzRdO1xuICAgIH07XG4gICAgY29uc3QgY2hlY2tHYW1lT3ZlciA9ICgpID0+IHtcbiAgICAgICAgaWYoc3Vua0FycmF5Lmxlbmd0aCA9PT0gc2hpcEFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhpdFNoaXAgPSAoaSwgY29vcmRzKSA9PiB7XG4gICAgICAgIHNoaXBBcnJheVtpXS5oaXQoY29vcmRzKTtcbiAgICAgICAgaWYoc2hpcEFycmF5W2ldLmlzU3VuaygpKSB7XG4gICAgICAgICAgICBzdW5rQXJyYXkucHVzaChzaGlwQXJyYXlbaV0pO1xuICAgICAgICAgICAgY2hlY2tHYW1lT3ZlcigpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBjaGVja09jY3VwaWVkID0gKGNvb3JkcykgPT4ge1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgb2NjdXBpZWRBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHBvc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KG9jY3VwaWVkQXJyYXlbaV0ucG9zQXJyYXkpO1xuICAgICAgICAgICAgaWYocG9zU3RyaW5nLmluY2x1ZGVzKEpTT04uc3RyaW5naWZ5KGNvb3JkcykpKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChjb29yZHMpID0+IHtcbiAgICAgICAgbGV0IG1pc3MgPSB0cnVlO1xuICAgICAgICBsZXQgdGFyZ2V0ID0gY2hlY2tPY2N1cGllZChjb29yZHMpO1xuICAgICAgICBpZih0YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaGl0U2hpcCh0YXJnZXQsIGNvb3Jkcyk7XG4gICAgICAgICAgICBtaXNzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYobWlzcykge21pc3NlZEFycmF5LnB1c2goY29vcmRzKX07XG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgICBwbGFjZVNoaXAsIFxuICAgICAgICBwbGFjZUFsbFNoaXBzLFxuICAgICAgICByZWNlaXZlQXR0YWNrLCBcbiAgICAgICAgY2hlY2tHYW1lT3ZlciwgXG4gICAgICAgIG1pc3NlZEFycmF5LCBcbiAgICAgICAgc2hpcEFycmF5LCBcbiAgICAgICAgc3Vua0FycmF5XG4gICAgfTtcbn07XG5cbmNvbnN0IFBsYXllciA9IChuYW1lLCBib2FyZCkgPT4ge1xuICAgIGNvbnN0IGF1dG9BdHRhY2sgPSAoKSA9PiB7Ly9ub3cgaW4gYSBmdW5jdGlvbiBhYm92ZVxuICAgICAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwKTtcbiAgICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMCk7XG4gICAgICAgIHJldHVybiBbeCwgeV07XG4gICAgfTtcbiAgICBjb25zdCBtYW51YWxBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgICAgICByZXR1cm4gW3gsIHldO1xuICAgIH07XG4gICAgcmV0dXJuIHtuYW1lLCBib2FyZCwgYXV0b0F0dGFjaywgbWFudWFsQXR0YWNrfTtcbn07XG5cbmNvbnN0IGdhbWVsb29wID0gKCkgPT4ge1xuICAgIGxldCBwZXJzb24gPSBQbGF5ZXIoJ1RvbScsIEdhbWVib2FyZCgpKTtcbiAgICBsZXQgYm90ID0gUGxheWVyKCdDb21wdXRlcicsIEdhbWVib2FyZCgpKTtcbiAgICBsZXQgcGVyc29uU3RhcnRDaG9pY2VzID0gW1syLDJdLFs5LDNdLFswLDZdLFs0LDhdLFs1LDRdXTtcbiAgICBsZXQgcGVyc29uT3JDaG9pY2VzID0gWyd4JywneScsJ3knLCd4JywneSddO1xuICAgIGNvbnNvbGUubG9nKHBlcnNvbi5ib2FyZC5wbGFjZUFsbFNoaXBzKHRydWUsIHBlcnNvblN0YXJ0Q2hvaWNlcywgcGVyc29uT3JDaG9pY2VzKSk7XG4gICAgY29uc29sZS5sb2coYm90LmJvYXJkLnBsYWNlQWxsU2hpcHMoZmFsc2UpKTtcbn07XG5nYW1lbG9vcCgpO1xubW9kdWxlLmV4cG9ydHMuU2hpcCA9IFNoaXA7XG5tb2R1bGUuZXhwb3J0cy5HYW1lYm9hcmQgPSBHYW1lYm9hcmQ7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnbW9kdWxlJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==