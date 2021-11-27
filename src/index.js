import './style.css';

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

const gridGeneration = (name) => {
    const n = 10;
    let board = document.getElementById(name);
    const elementSize = "auto ";
    board.style.gridTemplateRows = elementSize.repeat(n);
    board.style.gridTemplateColumns = elementSize.repeat(n); 
    for (let i = 0; i < n**2; i++) {
        const grid = document.createElement('div');
        grid.classList.add('grid');
        grid.id = name + i;
        board.appendChild(grid);  
    }
};
gridGeneration('player');
gridGeneration('computer');