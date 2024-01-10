cells = document.querySelectorAll('.cell');
board = document.querySelector('.board');
p1Wins = document.querySelector('#p1-wins');
p2Wins = document.querySelector('#p2-wins');
statusTitle = document.querySelector('.game-status');


board.addEventListener('click', function(event) {
    var currentID = event.target.closest('id');
    manageBoardClick(currentID);
});


var player1 = {
    id: 'Toto',
    token : 'X',
    wins : 0,
    currentSquares: {
        aSquares: [],
        bSquares: [],
        cSquares: [],
        oneSquares: [],
        twoSquares: [],
        threeSquares: [],
        diagLRSquares: [],
        diagRLSquares: []
    }
}

var player2 = {
    id: 'Wicked Witch',
    token: 'O',
    wins: 0,
    currentSquares: {
        aSquares: [],
        bSquares: [],
        cSquares: [],
        oneSquares: [],
        twoSquares: [],
        threeSquares: [],
        diagLRSquares: [],
        diagRLSquares: []
    }
}

availableSquares = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
whosTurn = 1;

function manageBoardClick(iD) {
}

function updateCurrentSquares() {

}

function checkForWin() {

}


function displayIcons() {

}

function updateTurn() {

}

function displayTurn() {

}

function manageGameEnd() {

}

function updateWins() {

}

function displayWins() {

}