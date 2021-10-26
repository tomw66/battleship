const Ship = (name, length) => {
    let hitCoords = [];
    const hit = (pos) => {
        hitCoords.push(pos);
    };
    const isSunk = () => {
        return (hitCoords.length === length)
    };
    return {name, length, hit, isSunk};
};

const Gameboard = () => {
    //const boardGrid = Array.from(Array(10), () => new Array(10)) Is an overall grid actually needed?

    const placeShip = (name, length, startCoord, orientation) => {
        const ship = Ship(name, length);
        const createPositionArray = () => {
            const positionArray = [];
            let dim;
            let thing;
            orientation === 'x' ? (dim = startCoord[0], thing = [i, startCoord[1]]) : (dim = startCoord[1], thing = [startCoord[0], i])
            for(let i = dim; i < (dim + length); i++) {
                positionArray.push(thing)
            }
    }
}
};


module.exports = Ship;