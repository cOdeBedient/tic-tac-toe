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

function manageBoardClick(iD) {
    if (availableSquares.includes(iD)) {
        storeSquare(iD);
        updateAvailable(iD);
        displayIcons();
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

function checkForWin() {

}

function checkForDraw() {

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

function displayTurn() {

}

function manageGameEnd() {

}

function updateWins() {

}

function displayWins() {

}

function resetBoard() {

}

function resetStored() {

}