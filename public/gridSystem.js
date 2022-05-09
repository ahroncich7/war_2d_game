class GridSystem {

    constructor(matrix, gameArea) {
        this.matrix = matrix;
        // this.mapSize = {
        //     x: gameArea.clientWidth,
        //     y: gameArea.clientHeight
        // }
        this.cellSize = 40
        this.cellPadding = 1
        this.gameArea = gameArea
        this.makeGrid()
        this.getNeighbors()
    }



    //Define un método que crea la grid teniendo en cuenta la matriz
    //de tipos de terreno, que es una especie de array de dos dimensiones (matrix[rows][cols])

    makeGrid() {

        let matrix = this.matrix
        let grid
        this.grid = grid = matrix

        //Itera sobre todos los elementos de la matriz


        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                //crea una div por cada elemento de la matriz
                let cellElement = document.createElement("div")

                //crea un Cell por cada elemento de la matriz y lo inserta dentro del array bidimensional.
                let cell = new Cell(row, col, matrix[row][col], cellElement)
                grid[row][col] = cell;

                //Define la ubicación y estilos del div
                cellElement.style.width = cellElement.style.height = this.cellSize + "px"
                cellElement.style.position = "absolute"
                cellElement.style.left = (row * this.cellSize) + "px"
                cellElement.style.bottom = (col * this.cellSize) + "px"
                cellElement.classList.add("cellElement")
                cellElement.setAttribute("terrain-type", Cell.terraintype)


                //Inserta el div en el DOM
                this.gameArea.appendChild(cellElement)


            }
        }

    }

    //Devuelve la celda específica (el objeto) del array bidimensional
    getCell(x, y) {
        try {
            return this.grid[x][y]
        } catch (error) {
            return undefined
        }


    }

    //Asigna todos los vecinos de la celda dentro del objeto de la celda
    getNeighbors() {
        this.grid.forEach(element => {
            element.forEach((cell) => {
                let grid = this.grid;
                let x = cell.x
                let y = cell.y

                if (this.getCell(x + 1, y))
                    cell.neighbors.push(this.getCell(x + 1, y))
                if (this.getCell(x - 1, y))
                    cell.neighbors.push(this.getCell(x - 1, y))
                if (this.getCell(x, y + 1))
                    cell.neighbors.push(this.getCell(x, y + 1))
                if (this.getCell(x, y - 1))
                    cell.neighbors.push(this.getCell(x, y - 1))
                if (this.getCell(x + 1, y + 1))
                    cell.neighbors.push(this.getCell(x + 1, y + 1))
                if (this.getCell(x + 1, y - 1))
                    cell.neighbors.push(this.getCell(x + 1, y - 1))
                if (this.getCell(x - 1, y + 1))
                    cell.neighbors.push(this.getCell(x - 1, y + 1))
                if (this.getCell(x - 1, y - 1))
                    cell.neighbors.push(this.getCell(x - 1, y - 1))
            })
        });
    }

}