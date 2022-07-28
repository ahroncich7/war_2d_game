var unitsInstances =[]
let unitId = 0
class Unit {
    position;
    movement;
    sight;
    attackStrength = 6;
    defenseStrength = 8;

    constructor(type, owner = "player1") {
        this.id = unitId++
        this.type = type;
        this.sprite = this.makeSprite()
        this.movement = 2;
        this.makeClickable()
        this.owner = owner
        gameHandler.objectsList.push(this)
        unitsInstances.push(this)
    
    }



    render() { //Funcion que se ejecuta cada frame para mostrar el sprite
        let cellSize = gameHandler.gridMap.cellSize;
        let padding = gameHandler.gridMap.cellPadding;
        this.sprite.style.left = cellSize * this.position.x + padding * 2 + "px";
        this.sprite.style.bottom = cellSize * this.position.y + padding * 2 + "px";
    }

    moveTo(cell) {
        if (cell.isReachable) {
            this.position.unitInside = undefined
            cell.unitInside = this
            this.position = cell;
            gameHandler.unselectAll();
        }

    }

    makeSprite() {
        let sprite = new Image(gameHandler.gridMap.cellSize - gameHandler.gridMap.cellPadding * 2)
        sprite.src = "/infantry.png"
        sprite.classList.add("unit")
        gameHandler.gameArea.appendChild(sprite)
        return sprite
    }

    makeClickable() {
        this.sprite.addEventListener("click", ((e) => {
            e.stopPropagation()
            this.whenClicked()
        }))
    }

    whenClicked() { //Setea lo que se dispara cuando se hace click en la unidad
        if (this.owner == gameHandler.ownerTurn) {
            gameHandler.selectUnit(this)
        } else {
            if (gameHandler.selectedUnit) {
                console.log("combate")
                gameHandler.combatLaunch(gameHandler.selectedUnit, this)

            } else {
                gameHandler.inspect(this)
            }
        }
    }




    //Métodos para el PathFindidng

    calculateReach() {


        //Declara una variable que estará compuesta de todos los nodos 
        //dentro del area de alcance, sin contar los costes de terreno. Esto es para 
        //ahorrar recursos al evaluar un area mas cercana
        let potentiallyReacheableGrid = []

        //Mete dentro de la lista los posibles nodos dentro del alcance, de nuevo,
        //sin contar los costes de terreno

        gameHandler.gridMap.grid.forEach((e) => {
            e.forEach((node) => {

                if (this.distance(node, this.position) <= this.movement) {
                    potentiallyReacheableGrid.push(node)
                }
            })
        })




        this.calculateCosts(this.position, potentiallyReacheableGrid)

        potentiallyReacheableGrid.forEach((node) => {
            let pathCost = node.costf
                // this.pathCost(this.position, node)


            if (pathCost <= this.movement && node != this.position && !(node.unitInside)) {
                node.isReachable = true
            }

        })


    }

    //calcula los costes de moverse del nodo inicial hasta cualquier nodo de una lista de nodos
    calculateCosts(startNode, grid) {

        let openList = [startNode]; //crea lista de los nodos pendientes de evaluar. Son todos los que estan a su alcance

        grid.forEach((e) => { //Inicializa los costos de todos los nodos a evaluar

            if (e == startNode) {
                e.costf = 0
            } else {
                e.costf = Infinity //Inicializa el costo de todos los nodos a el start en infinito
                openList.push(e);
            }


        })

        openList = this.sortNearestToFarest(startNode, openList); //Ordena la lista a evaluar de mas cerca a mas lejos de la celda inicial

        openList.forEach((cell) => {
            let currentCell = cell

            let neighborsCurrentCell = currentCell.neighbors;

            let totalCost = Infinity

            neighborsCurrentCell.forEach((neighbor) => {

                totalCost = currentCell.costf + neighbor.costg

                if (totalCost < neighbor.costf) {
                    neighbor.costf = totalCost
                }
            })
        })

    }

    distance(node1, node2) {
        let localX = Math.abs(node1.x - node2.x)
        let localY = Math.abs(node1.y - node2.y)
        return Math.max(localX, localY)
    }

    pathCost(startNode, endNode) {

        let path = [endNode];
        let currentCell = endNode
        while (currentCell != startNode) {
            let lowerNode = this.getLowerCostNode(currentCell.neighbors)
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

    getLowerCostNode(nodeList) {
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

    sortNearestToFarest(startNode, list) {
        let nearestNode;
        let sortedList = [];


        while (list.length > 0) {
            let nearestValue = Infinity
            list.forEach((node) => {
                if (this.distance(startNode, node) <= nearestValue) {
                    nearestValue = this.distance(startNode, node);
                    nearestNode = node;
                }
            })
            list = list.filter(v => v != nearestNode)
            sortedList.push(nearestNode)
        }

        return sortedList;
    }
}