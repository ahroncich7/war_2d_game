const Cell = require("../objects/Cell")
const grid = require("../objects/grid")

exports.calculateReach = function (unit) {

    let reacheableCells = []
    let potentiallyReacheableGrid = Cell.cellList;


    calculateCosts(grid.getCell(unit.position), potentiallyReacheableGrid, unit)

    potentiallyReacheableGrid.forEach((node) => {
        let pathCost = node.costf
        // this.pathCost(this.position, node)

        node.isReachable = false;
        if (pathCost <= unit.movement && node != grid.getCell(unit.position)) {
            node.isReachable = true;
            reacheableCells.push(node)
        }

    })

    return reacheableCells;

}

//calcula los costes de moverse del nodo inicial hasta cualquier nodo de una lista de nodos
function calculateCosts(startNode, grid, unit) {

    let openList = [startNode]; //crea lista de los nodos pendientes de evaluar. Son todos los que estan a su alcance

    grid.forEach((cell) => { //Inicializa los costos de todos los nodos a evaluar

        if (cell.unitInside == startNode.unitInside) {
            cell.costf = 0;
        } else {
            if ((!cell.unitInside || cell.unitInside.owner == unit.owner)) {
                cell.costf = Infinity //Inicializa el costo de todos los nodos a el start en infinito
                openList.push(cell);
            }
        }

    })

    openList = sortNearestToFarthest(startNode, openList); //Ordena la lista a evaluar de mas cerca a mas lejos del nodo inicial

    openList.forEach((cell) => {
        let currentCell = cell

        let neighborsCurrentCell = setNeighbors(cell);

        let totalCost = Infinity

        neighborsCurrentCell.forEach((neighbor) => {

            totalCost = currentCell.costf + neighbor.costg

            if (totalCost < neighbor.costf) {
                neighbor.costf = totalCost
            }
        })
    })

}

function getDistance(node1, node2) {
    let localX = Math.abs(node1.position.x - node2.position.x)
    let localY = Math.abs(node1.position.y - node2.position.y)
    return Math.max(localX, localY)
}

function getPathCost(startNode, endNode) {

    let path = [endNode];
    let currentCell = endNode
    while (currentCell != startNode) {
        let lowerNode = getLowerCostNode(currentCell.neighbors)
        path.push(lowerNode)
        currentCell = lowerNode

    }

    path.pop() //Remueve el último nodo que es el del comienzo

    let pathCost = 0;
    path.forEach((node) => {
        pathCost += node.costf
    })

    return pathCost;
}

function getLowerCostNode(nodeList) {
    let lowerCost = Infinity;
    let lowerNode
    nodeList.forEach((node) => {
        if (node.costf <= lowerCost) {
            lowerCost = node.costf
            lowerNode = node
        }
    })

    return lowerNode
}

function sortNearestToFarthest(startNode, list) {
    let nearestNode;
    let sortedList = [];


    while (list.length > 0) {
        let nearestValue = Infinity
        list.forEach((node) => {
            if (getDistance(startNode, node) <= nearestValue) {
                nearestValue = getDistance(startNode, node);
                nearestNode = node;
            }
        })
        list = list.filter(v => v != nearestNode)
        sortedList.push(nearestNode)
    }

    return sortedList;
}

function setNeighbors(cell) {
    let neighbors = []
    let x = cell.position.x
    let y = cell.position.y
    let $cell

    if ($cell = grid.getCell({ x: x + 1, y: y + 0 }))
        neighbors.push($cell)
    if ($cell = grid.getCell({ x: x - 1, y: y + 0 }))
        neighbors.push($cell)
    if ($cell = grid.getCell({ x: x + 0, y: y + 1 }))
        neighbors.push($cell)
    if ($cell = grid.getCell({ x: x + 0, y: y - 1 }))
        neighbors.push($cell)
    if ($cell = grid.getCell({ x: x + 1, y: y + 1 }))
        neighbors.push($cell)
    if ($cell = grid.getCell({ x: x + 1, y: y - 1 }))
        neighbors.push($cell)
    if ($cell = grid.getCell({ x: x - 1, y: y + 1 }))
        neighbors.push($cell)
    if ($cell = grid.getCell({ x: x - 1, y: y - 1 }))
        neighbors.push($cell)

    return neighbors
}
