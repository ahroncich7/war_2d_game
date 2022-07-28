//-------------START-----------------//

let matrix = [
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [2, 2, 0, 0, 1, 1, 1, 1],
    [0, 2, 2, 2, 0, 0, 1, 1],
    [0, 0, 2, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 1]
]

gameHandler.start(matrix)




//------------------ SET UP PRE-DEFINED MAP AND UNITS ------------



gameHandler.setUnit("ground", "player1", { x: 0, y: 1 });
gameHandler.setUnit("ground", "player2", { x: 5, y: 4 });
gameHandler.update();



//-------------------------- TESTS -------------------------------

console.log(serverHandler)
serverHandler.connectToServer()