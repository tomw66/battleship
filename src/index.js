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
            let i;
            orientation === 'x' ? (dimension = startCoord[0]) : (dimension = startCoord[1])
            for(i = dimension; i < (dimension + length); i++) {
                if(i > 10) {throw new Error('Ship out of bounds')};
                let newCoord = coord(orientation, i, startCoord);
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
    const checkGameOver = () => {
        if(sunkArray.length === shipArray.length) {
            return true
        }
    };
    const hitShip = (i, coords) => {
        shipArray[i].hit(coords);
        if(shipArray[i].isSunk()) {
            sunkArray.push(shipArray[i]);
            checkGameOver();
        }
    };
    const receiveAttack = (coords) => {
        let miss = true;
        for(let i = 0; i < occupiedArray.length; i++) {
            let posString = JSON.stringify(occupiedArray[i].posArray);
            if(posString.includes(JSON.stringify(coords))){
                hitShip(i, coords);
                miss = false;
                break;
            }
        }
        if(miss) {missedArray.push(coords)};

    };
    return {placeShip, receiveAttack, checkGameOver, missedArray, shipArray, sunkArray,};
};


module.exports.Ship = Ship;
module.exports.Gameboard = Gameboard;