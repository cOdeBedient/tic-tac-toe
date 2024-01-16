// Query Selectors
var cells = document.querySelectorAll('.cell');
var board = document.querySelector('.board');
var p1Icon = document.querySelector('.p1-icon');
var p2Icon = document.querySelector('.p2-icon'); 
var p1Wins = document.querySelector('#p1Wins');
var p2Wins = document.querySelector('#p2Wins');
var statusTitle = document.querySelector('.game-status');
var mainField = document.querySelector('main');
var boardContainer = document.querySelector('.board-container');
var toggleButton = document.querySelector('.toggle-button');
var toggleText = document.querySelector('p');

//Event Listeners
board.addEventListener('click', function(event) {
    console.log('actionStop within event listener =', actionStop);
    if (!actionStop){
        var currentID = event.target.id;
        manageBoardClick(currentID);
    }
});

toggleButton.addEventListener('click', toggleModes);

// Global Variables
var player1 = {
    id: 'Toto',
    token: 'X',
    image: './assets/toto.png',
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
var player2 = {
    id: 'Witch',
    token: 'O',
    image: './assets/wicked-witch.png',
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
cPUMode = false;

// Functions
function toggleModes(){
    cPUMode = !cPUMode;
    whosTurn = 'player1';
    actionStop = false;
    resetStored();
    displayIcons();
    resetWins();
    displayWins();
    displayTurn();
    toggleTheme();
}

function toggleTheme() {
    if (cPUMode) {
        p1Icon.innerHTML = '<img class="player1-icon" src="./assets/toto.png" alt="toto"></img>';
        p2Icon.innerHTML = '<img class="player2-icon" src="./assets/wicked-witch.png" alt="wicked-witch"></img>';
        statusTitle.innerHTML = `It's Toto's turn`;
        mainField.classList.add('main-oz');
        statusTitle.classList.add('game-status-oz');
        boardContainer.classList.add('board-container-oz');
        mainField.classList.add('main-oz');
        board.classList.add('board-oz');
        toggleButton.src = "./assets/ttt-board.png";
        toggleText.innerText = 'return to original ->';
        player1.token = 'T';
        player2. token = 'W';
        for (var i = 0; i < cells.length; i++) {
            cells[i].classList.add('cell-oz');
        }
    } else {
        p1Icon.innerHTML = '<h3>X</h3>';
        p2Icon.innerHTML = '<h3>O<h3>';
        statusTitle.innerHTML = `It's X's turn`;
        mainField.classList.remove('main-oz');
        statusTitle.classList.remove('game-status-oz');
        boardContainer.classList.remove('board-container-oz');
        mainField.classList.remove('main-oz');
        board.classList.remove('board-oz');
        toggleButton.src = "./assets/ruby-slippers.png";
        toggleText.innerText = 'enter tic-tac-toto ->'
        player1.token = 'X';
        player2. token = 'O';
        for (var i = 0; i < cells.length; i++) {
            cells[i].classList.remove('cell-oz');
        }
    }
}

function resetWins() {
    player1.wins = 0;
    player2.wins = 0;
}

// maybe one displayAll() function broken up into the different displays?
function manageBoardClick(iD) {
    if (availableSquares.includes(iD)) {
        storeSquare(iD);
        updateAvailable(iD);
        displayIcons();
        var winCheck = checkForWin();
        if (winCheck.gameOver) {
            if (cPUMode) {
                actionStop = true;
                setTimeout(function() {actionStop = false}, 4000);
                setTimeout(toggleTurn, 4000);
                setTimeout(displayTurn, 4000);
                if (whosTurn === 'player1') {
                    setTimeout(generateTurn, 4000);
                }
            } else {
                actionStop = true;
                setTimeout(function() {actionStop = false}, 3000);
                setTimeout(toggleTurn, 3000);
                setTimeout(displayTurn, 3000);
            }
            processEndGame(result.playerName);
        }
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
            if (cPUMode) {
                if (whosTurn === 'player1'){
                    var dogBark = new Audio('./assets/dog-bark.mp3');
                    dogBark.play();
                } else {
                    var witchCackle = new Audio('./assets/witch-cackle.ogg');
                    witchCackle.play();
                }
            }
            availableSquares.splice(i, 1);
        }
    }
}

//check for draw a different function?? Is toggleTurn weird here?
function checkForWin() {
    var player = window[whosTurn];
    var result = {
        playerName: player.id,
        gameOver: false
    }
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
        result.gameOver = true;
        return result;
    } else if (availableSquares.length === 0) {
        result.playerName = 'draw';
        result.gameOver = true;
        return result;
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

function toggleTurn() {
    if (cPUMode) {
        if (whosTurn === 'player1') {
            whosTurn = 'player2';
        } else {
            whosTurn = 'player1';
        }
    }
}

// i = avalableSquares.length as a way to bail out instead of action stop? Also availableSquares.length will change during this, which is not good.
function generateTurn() {
    var conditionMet = false;
    var bestChoice;
    if (player2.currentSquares.squares1.length === 2){
        console.log('1 has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if (availableSquares[i].includes('1')){
                conditionMet = true;
                bestChoice = availableSquares[i];
                bestChoice = availableSquares[i];
            }
        }
    }
    if (player2.currentSquares.squares2.length === 2) {
        console.log('2 has 2')
            for (var i = 0; i < availableSquares.length; i++) {
                if (availableSquares[i].includes('2') && !conditionMet){
                    conditionMet = true;
                    bestChoice = availableSquares[i];
                }
            }
    }
    if (player2.currentSquares.squares3.length === 2) {
        console.log('3 has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if (availableSquares[i].includes('3') && !conditionMet){
                conditionMet = true;
                bestChoice = availableSquares[i];
            }
        }
    }
    if (player2.currentSquares.squaresA.length === 2) {
        console.log('A has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if (availableSquares[i].includes('a') && !conditionMet){
                conditionMet = true;
                bestChoice = availableSquares[i];
            }
        }
    }
    if (player2.currentSquares.squaresB.length === 2) {
        console.log('B has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if (availableSquares[i].includes('b') && !conditionMet){
                conditionMet = true;
                bestChoice = availableSquares[i];
            }
        }
    }
    if (player2.currentSquares.squaresC.length === 2) {
        console.log('C has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if (availableSquares[i].includes('c') && !conditionMet){
                conditionMet = true;
                bestChoice = availableSquares[i];
            }
        }
    }
    if (player2.currentSquares.squaresDiagLR.length === 2) {
        console.log('LR has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if ((availableSquares[i] === 'a1' || availableSquares[i] === 'b2' || availableSquares[i] === 'c3') && !conditionMet){
                conditionMet = true;
                bestChoice = availableSquares[i];
            }
        }
    }
    if (player2.currentSquares.squaresDiagRL.length === 2) {
        console.log('RL has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if ((availableSquares[i] === 'a3' || availableSquares[i] === 'b2' || availableSquares[i] === 'c1') && !conditionMet){
                conditionMet = true;
                bestChoice = availableSquares[i];
            }
        }
    }

    if (player1.currentSquares.squares1.length === 2){
        console.log('1 has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if (availableSquares[i].includes('1') && !conditionMet){
                conditionMet = true;
                bestChoice = availableSquares[i];
            }
        }
    }
    if (player1.currentSquares.squares2.length === 2) {
        console.log('2 has 2')
            for (var i = 0; i < availableSquares.length; i++) {
                if (availableSquares[i].includes('2') && !conditionMet){
                    conditionMet = true;
                    bestChoice = availableSquares[i];
                }
            }
    }
    if (player1.currentSquares.squares3.length === 2) {
        console.log('3 has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if (availableSquares[i].includes('3') && !conditionMet){
                conditionMet = true;
                bestChoice = availableSquares[i];
            }
        }
    }
    if (player1.currentSquares.squaresA.length === 2) {
        console.log('A has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if (availableSquares[i].includes('a') && !conditionMet){
                conditionMet = true;
                bestChoice = availableSquares[i];
            }
        }
    }
    if (player1.currentSquares.squaresB.length === 2) {
        console.log('B has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if (availableSquares[i].includes('b') && !conditionMet){
                conditionMet = true;
                bestChoice = availableSquares[i];
            }
        }
    }
    if (player1.currentSquares.squaresC.length === 2) {
        console.log('C has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if (availableSquares[i].includes('c') && !conditionMet){
                conditionMet = true;
                bestChoice = availableSquares[i];
            }
        }
    }
    if (player1.currentSquares.squaresDiagLR.length === 2) {
        console.log('LR has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if ((availableSquares[i] === 'a1' || availableSquares[i] === 'b2' || availableSquares[i] === 'c3') && !conditionMet){
                conditionMet = true;
                bestChoice = availableSquares[i];
            }
        }
    }
    if (player1.currentSquares.squaresDiagRL.length === 2) {
        console.log('RL has 2')
        for (var i = 0; i < availableSquares.length; i++) {
            if ((availableSquares[i] === 'a3' || availableSquares[i] === 'b2' || availableSquares[i] === 'c1') && !conditionMet){
                conditionMet = true;
                bestChoice = availableSquares[i];
            }
        }
    }
    
    if (conditionMet) {
        manageBoardClick(bestChoice);
    } else {
        var randomCellsIndex = Math.floor(Math.random() * availableSquares.length);
        var randomCell = availableSquares[randomCellsIndex];
        manageBoardClick(randomCell);
    }
}

function displayTurn() {
    if (whosTurn === 'player1') {
        if (cPUMode){
        statusTitle.innerHTML = `It's ${player1.id}'s turn`
        } else {
            statusTitle.innerHTML = `It's ${player1.token}'s turn`
        }
    } else {
        if (cPUMode) {
            statusTitle.innerHTML = `It's ${player2.id}'s turn`
        } else {
            statusTitle.innerHTML = `It's ${player2.token}'s turn`
        } 
    }
}

// let's make better names for process and manage end game
function processEndGame(winner) {
    if (winner != 'draw'){
        updateWins();
        displayWins();
        showResult(winner);
    } else {
        showResult('draw');  
    }
    resetStored();
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

function showResult(winner) {
    if (winner === 'draw') {
        statusTitle.innerHTML = "It's a Draw!"
    } else {
        var player = window[whosTurn];
        if (cPUMode){
            if (whosTurn === 'player1'){
                var africaSong = new Audio('./assets/africa.mp3');
                africaSong.play();
                mainField.classList.add('saturate');
                setTimeout(function() {mainField.classList.remove('saturate')}, 4000);
            } else {
                var witchyWoman = new Audio('./assets/witchy-woman.mp3');
                witchyWoman.play();
                mainField.classList.add('desaturate');
                setTimeout(function() {mainField.classList.remove('desaturate')}, 4000);
            }
            statusTitle.innerHTML = `${player.id} won the game!`
        } else {
            var player = window[whosTurn];
            statusTitle.innerHTML = `${player.token} won the game!`
        }
    }
}