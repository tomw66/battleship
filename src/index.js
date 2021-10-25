const Ship = (length) => {
    let hitCoords = [];
    const hit = (pos) => {
        hitCoords.push(pos);
    };
    const isSunk = () => {
        return (hitCoords.length === length)
    };
    return {length, hit, isSunk};
};

module.exports = Ship;