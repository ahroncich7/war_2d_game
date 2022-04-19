class Unit {
    position;
    constructor(type) {
        this.type = type;
        this.texture = new Image()
        this.texture.src = "/infantry.png"
        this.reach = 2;
        this.makeClickable()
    }

    render() {
        let imageElement = document.createElement("img")
        imageElement = this.texture
        this.position.cellElement.appendChild(imageElement)
    }

    moveTo(cell) {
        if (cell.isReachable) {
            this.position = cell;
            this.render();
            gridMap.unselectAll()
        }

    }


    makeClickable() {
        this.texture.addEventListener("click", ((e) => {
            e.stopPropagation()
            gridMap.selectUnit(this)
        }))
    }


    calculateReach() {


        //Declara una variable que estará compuesta de todos los nodos 
        //dentro del area de alcance, sin contar los costes de terreno. Esto es para 
        //ahorrar recursos al evaluar un area mas cercana
        let potentiallyReacheableGrid = []

        //Mete dentro de la lista los posibles nodos dentro del alcance, de nuevo,
        //sin contar los costes de terreno
        gridMap.grid.forEach((e) => {
            e.forEach((node) => {
                if (this.distance(node, this.position) <= this.reach) {
                    potentiallyReacheableGrid.push(node)
                }
            })
        })


        this.calculateCosts(this.position, potentiallyReacheableGrid)

        potentiallyReacheableGrid.forEach((node) => {
            let pathCost = node.costf
                // this.pathCost(this.position, node)


            if (pathCost <= this.reach) {
                node.isReachable = true
            }

        })


    }


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
}