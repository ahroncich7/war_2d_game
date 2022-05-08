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
gameHandler.setUnit("ground", "player1", { x: 0, y: 1 });
gameHandler.setUnit("ground", "player2", { x: 5, y: 4 });
gameHandler.update();

var socket = io.connect("http://localhost:8091", { "forceNew": true });

socket.on("mensaje", function(data) {

})

socket.on("newUnit", function(unit) {
    gameHandler.setUnit(unit.type, unit.owner, unit.position)
})