/* Function Description: if the board is buils automatic
we need to put the mines in some random places on the board*/
function getMinesLocations(board, location) {
    gGame.mines = [];
    var locations = getAllLocations();
    for (var i = 0; i < gLevel.mines; i++) {
        var randNumb = getRandomInteger(0, locations.length - 1);
        var randLocation = locations[randNumb];
        while (randLocation.i === location.i && randLocation.j === location.j) {
            randNumb = getRandomInteger(0, locations.length - 1);
            randLocation = locations[randNumb];
        }    
        locations.splice(randNumb, 1);
        insertMines(randLocation, board);
    }    
    return board;
}    

/* Function Description: create cell for mines and put it on the rigth place*/
function insertMines(randLocation, board) {
    var cell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: true,
        isMarked: false,
        element: MINE
    }    
    board[randLocation.i][randLocation.j] = cell;
    gGame.mines.push(randLocation);
}    

/* Function Description: over the board and put in the cell how much mines negs it has*/
function updateNegs(cell) {
    for (var i = 0; i < gLevel.size; i++) {
        for (var j = 0; j < gLevel.size; j++) {
            setMinesNegsCount(gBoard, { i: i, j: j })
        }    
    }    
}    

function mineSound(){
    var elMineAudio = document.querySelector('.mine-sound');
    console.log(elMineAudio);
    elMineAudio.play();
}