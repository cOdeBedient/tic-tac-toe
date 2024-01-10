cells = document.querySelectorAll('.cell');
board = document.querySelector('.board');
p1Wins = document.querySelector('#p1-wins');
p2Wins = document.querySelector('#p2-wins');
statusTitle = document.querySelector('.game-status');


board.addEventListener('click', function(event) {
    var currentID = event.target.id;
    manageBoardClick(currentID);
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

// maybe one displayAll() function broken up into the different displays?
function manageBoardClick(iD) {
    if (availableSquares.includes(iD)) {
        storeSquare(iD);
        updateAvailable(iD);
        displayIcons();
        checkForWin();
        toggleTurn();
    }
}

function storeSquare(iD) {
        var firstChar = iD.charAt(0).toUpperCase();
        var secondChar = iD.charAt(1);
        var player = window[whosTurn];
        
        player.currentSquares.all.push(iD);
        player.currentSquares[`squares${firstChar}`].push(iD);
        player.currentSquares[`squares${secondChar}`].push(iD);
        if (iD === ('a1' || 'b2' || 'c3')) {
            player.currentSquares.squaresDiagLR.push(iD);
        }
        if (iD === ('a3' || 'b2' || 'c1')) {
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
            console.log(`${winner} wins`)
            processEndGame(winner);
    } else if (availableSquares.length === 0) {
        winner = 'draw';
        console.log(`It's a ${winner}`)
        processEndGame(winner);
    }
}

function displayIcons() {
    for (var i = 0; i < cells.length; i++) {
        if (player1.currentSquares.all.includes(cells[i].id)) {
            cells[i].innerHTML = `${player1.token}`;
        }
        if (player2.currentSquares.all.includes(cells[i].id)) {
            cells[i].innerHTML = `${player2.token}`;
        }
    }
}

// can we use our math here?
function toggleTurn() {
    if (whosTurn === 'player1') {
        whosTurn = 'player2';
    } else {
        whosTurn = 'player1';
    }
}

function processEndGame(result) {
    if (result != draw){
        updateWins();
        displayWins();

    }
    
}

function updateWins() {
    var player = window[whosTurn];
    player.wins += 1;
}

function displayWins() {
    
}

function resetStored() {

}

function displayTurn() {

}

function manageGameEnd() {

}



function resetBoard() {

}

