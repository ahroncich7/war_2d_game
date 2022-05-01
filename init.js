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
gameHandler.setUnit({ x: 0, y: 1 }, "ground");
gameHandler.setUnit({ x: 5, y: 4 }, "ground", "player2");
gameHandler.update();