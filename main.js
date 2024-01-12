cells = document.querySelectorAll('.cell');
board = document.querySelector('.board');
p1Wins = document.querySelector('#p1Wins');
p2Wins = document.querySelector('#p2Wins');
statusTitle = document.querySelector('.game-status');


board.addEventListener('click', function(event) {
    if (!actionStop){
        var currentID = event.target.id;
        manageBoardClick(currentID);
    }
});


var player1 = {
    id: 'Toto',
    token : 'X',
    wins : 0,
    currentSquares: {
        all: [],
        squaresA: [],
        squaresB: [],
        squaresC: [],
        squares1: [],
        squares2: [],
        squares3: [],
        squaresDiagLR: [],
        squaresDiagRL: []
    }
}

var player2 = {
    id: 'Wicked Witch',
    token: 'O',
    wins: 0,
    currentSquares: {
        all: [],
        squaresA: [],
        squaresB: [],
        squaresC: [],
        squares1: [],
        squares2: [],
        squares3: [],
        squaresDiagLR: [],
        squaresDiagRL: []
    }
}

availableSquares = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
whosTurn = 'player1';
var actionStop = false;
cPUMode = true;

// maybe one displayAll() function broken up into the different displays?
function manageBoardClick(iD) {
    if (availableSquares.includes(iD)) {
        storeSquare(iD);
        updateAvailable(iD);
        displayIcons();
        checkForWin();
    }
}

function storeSquare(iD) {
        var firstChar = iD.charAt(0).toUpperCase();
        var secondChar = iD.charAt(1);
        var player = window[whosTurn];
        
        player.currentSquares.all.push(iD);
        player.currentSquares[`squares${firstChar}`].push(iD);
        player.currentSquares[`squares${secondChar}`].push(iD);
        if (iD === 'a1' || iD === 'b2' || iD === 'c3') {
            player.currentSquares.squaresDiagLR.push(iD);
        }
        if (iD === 'a3' || iD === 'b2' || iD === 'c1') {
            player.currentSquares.squaresDiagRL.push(iD);
        }
    }

function updateAvailable(iD) {
    for (i = 0; i < availableSquares.length; i++) {
        if (iD === availableSquares[i]) {
            availableSquares.splice(i, 1);
        }
    }
}

//check for draw a different function??
function checkForWin() {
    var player = window[whosTurn];
    var winner;
    if (
        (player.currentSquares.squaresA.length === 3) ||
        (player.currentSquares.squaresB.length === 3) ||
        (player.currentSquares.squaresC.length === 3) ||
        (player.currentSquares.squares1.length === 3) ||
        (player.currentSquares.squares2.length === 3) ||
        (player.currentSquares.squares3.length === 3) ||
        (player.currentSquares.squaresDiagLR.length === 3) ||
        (player.currentSquares.squaresDiagRL.length === 3)
        )
    {
        winner = player.id;
        processEndGame(winner);
    } else if (availableSquares.length === 0) {
        winner = 'draw';
        processEndGame(winner);
    } else {
        toggleTurn();
    }
}

function displayIcons() {
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
        if (player1.currentSquares.all.includes(cells[i].id)) {
            cells[i].innerHTML = `${player1.token}`;
        }
        if (player2.currentSquares.all.includes(cells[i].id)) {
            cells[i].innerHTML = `${player2.token}`;
        }
    }
}

// can we use our math here? Is this DRY?
// where should generateTurn go???
// I think toggleTurn and display turn should be pure, and both called in handleTurn
function toggleTurn() {
    if (cPUMode) {
        if (whosTurn === 'player1') {
            whosTurn = 'player2';
            displayTurn();
            if (!actionStop) {
                setTimeout(generateTurn, 500);
            } else {
                generateTurn();
            }
        } else {
            whosTurn = 'player1';
            displayTurn();
        }
        if (actionStop = false) {
            displayTurn();
        }
    } else {
        if (whosTurn === 'player1') {
        whosTurn = 'player2';
        } else {
        whosTurn = 'player1';
        }
        displayTurn();
    }
}

function generateTurn() {
    var conditionMet = false;
    if (player2.currentSquares.squares1.length === 2){
        console.log('1 has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if (availableSquares[i].includes('1')){
                conditionMet = true;
                manageBoardClick(availableSquares[i]);
            }
        }
    }
    if (player2.currentSquares.squares2.length === 2) {
        console.log('2 has 2')
            for (var i = 0; i < availableSquares.length; i++) {
                if (availableSquares[i].includes('2') && conditionMet === false){
                    conditionMet = true;
                    manageBoardClick(availableSquares[i]);
                }
            }
    }
    if (player2.currentSquares.squares3.length === 2) {
        console.log('3 has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if (availableSquares[i].includes('3') && conditionMet === false){
                conditionMet = true;
                manageBoardClick(availableSquares[i]);
            }
        }
    }
    if (player2.currentSquares.squaresA.length === 2) {
        console.log('A has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if (availableSquares[i].includes('a') && conditionMet === false){
                conditionMet = true;
                manageBoardClick(availableSquares[i]);
            }
        }
    }
    if (player2.currentSquares.squaresB.length === 2) {
        console.log('B has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if (availableSquares[i].includes('b') && conditionMet === false){
                conditionMet = true;
                manageBoardClick(availableSquares[i]);
            }
        }
    }
    if (player2.currentSquares.squaresC.length === 2) {
        console.log('C has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if (availableSquares[i].includes('c') && conditionMet === false){
                conditionMet = true;
                manageBoardClick(availableSquares[i]);
            }
        }
    }
    if (player2.currentSquares.squaresDiagLR.length === 2) {
        console.log('LR has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if ((availableSquares[i] === 'a1' || availableSquares[i] === 'b2' || availableSquares[i] === 'c3') && conditionMet === false){
                conditionMet = true;
                manageBoardClick(availableSquares[i]);
            }
        }
    }
    if (player2.currentSquares.squaresDiagRL.length === 2) {
        console.log('RL has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if ((availableSquares[i] === 'a3' || availableSquares[i] === 'b2' || availableSquares[i] === 'c1') && conditionMet === false){
                conditionMet = true;
                manageBoardClick(availableSquares[i]);
            }
        }
    }

    if (player1.currentSquares.squares1.length === 2){
        console.log('1 has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if (availableSquares[i].includes('1')){
                conditionMet = true;
                manageBoardClick(availableSquares[i]);
            }
        }
    }
    if (player1.currentSquares.squares2.length === 2) {
        console.log('2 has 2')
            for (var i = 0; i < availableSquares.length; i++) {
                if (availableSquares[i].includes('2') && conditionMet === false){
                    conditionMet = true;
                    manageBoardClick(availableSquares[i]);
                }
            }
    }
    if (player1.currentSquares.squares3.length === 2) {
        console.log('3 has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if (availableSquares[i].includes('3') && conditionMet === false){
                conditionMet = true;
                manageBoardClick(availableSquares[i]);
            }
        }
    }
    if (player1.currentSquares.squaresA.length === 2) {
        console.log('A has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if (availableSquares[i].includes('a') && conditionMet === false){
                conditionMet = true;
                manageBoardClick(availableSquares[i]);
            }
        }
    }
    if (player1.currentSquares.squaresB.length === 2) {
        console.log('B has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if (availableSquares[i].includes('b') && conditionMet === false){
                conditionMet = true;
                manageBoardClick(availableSquares[i]);
            }
        }
    }
    if (player1.currentSquares.squaresC.length === 2) {
        console.log('C has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if (availableSquares[i].includes('c') && conditionMet === false){
                conditionMet = true;
                manageBoardClick(availableSquares[i]);
            }
        }
    }
    if (player1.currentSquares.squaresDiagLR.length === 2) {
        console.log('LR has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if ((availableSquares[i] === 'a1' || availableSquares[i] === 'b2' || availableSquares[i] === 'c3') && conditionMet === false){
                conditionMet = true;
                manageBoardClick(availableSquares[i]);
            }
        }
    }
    if (player1.currentSquares.squaresDiagRL.length === 2) {
        console.log('RL has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if ((availableSquares[i] === 'a3' || availableSquares[i] === 'b2' || availableSquares[i] === 'c1') && conditionMet === false){
                conditionMet = true;
                manageBoardClick(availableSquares[i]);
            }
        }
    }
    if (!conditionMet && actionStop === false) {
        var randomCellsIndex = Math.floor(Math.random() * availableSquares.length);
        var randomCell = availableSquares[randomCellsIndex];
        manageBoardClick(randomCell);
    }
}


function displayTurn() {
    if (whosTurn === 'player1') {
        statusTitle.innerHTML = `It's ${player1.token}'s turn`
    } else {
        statusTitle.innerHTML = `It's ${player2.token}'s turn`
    }
}

// let's make better names for process and manage end game
function processEndGame(winner) {
    if (winner != 'draw'){
        updateWins();
        displayWins();
        manageGameEnd(winner);
    } else {
        manageGameEnd('draw');  
    }
    resetStored();
    actionStop = true;
    setTimeout(displayIcons, 2000);
    setTimeout(toggleTurn, 2000);
    setTimeout(displayTurn, 2000);
    setTimeout(function(){actionStop = false}, 2000);
}

function updateWins() {
    var player = window[whosTurn];
    player.wins += 1;
}

function displayWins() {
        p1Wins.innerHTML = `${player1.wins} wins`;
        p2Wins.innerHTML = `${player2.wins} wins`;
}

function resetStored() {
    player1.currentSquares = {
        all: [],
        squaresA: [],
        squaresB: [],
        squaresC: [],
        squares1: [],
        squares2: [],
        squares3: [],
        squaresDiagLR: [],
        squaresDiagRL: []
    }
    player2.currentSquares = {
        all: [],
        squaresA: [],
        squaresB: [],
        squaresC: [],
        squares1: [],
        squares2: [],
        squares3: [],
        squaresDiagLR: [],
        squaresDiagRL: []
    }
    availableSquares = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
}

function manageGameEnd(winner) {
    if (winner === 'draw') {
        statusTitle.innerHTML = "It's a Draw!"
    } else {
        var player = window[whosTurn];
        statusTitle.innerHTML = `${player.token} won the game!`
    }
}
