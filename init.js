let matrix = //
    [
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [2, 2, 0, 0, 1, 1, 1, 1],
        [0, 2, 2, 2, 0, 0, 1, 1],
        [0, 0, 2, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1]
    ]



function update() {
    gridMap = new GridSystem(matrix, document.querySelector(".gameArea"))
    unit = new Unit("water")
    gridMap.getCell(0, 0).isReachable = true
    unit.moveTo(gridMap.getCell(0, 0))
};


window.requestAnimationFrame(update)