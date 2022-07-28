class Cell {
    constructor(x, y, type, cellElement) {
        this.x = x;
        this.y = y;
        this.cellElement = cellElement;
        this.terraintype = this.getTerrainType(type);
        this.costg; //costo asociado al tipo de terreno
        this.neighbors = [];
        this.makeClickable();
        this.color = this.getColor()
        this.isReachable = false
        this.unitInside = undefined;
        gameHandler.objectsList.push(this)
    }


    //Le asigna a la celda el atributo del tipo de terrano en base al tipo de terreno que le pasan
    
    getTerrainType(cellType) {
        switch (cellType) {
            case 0:
                this.costg = 1;
                return "plaine"
                break;
            case 1:
                this.costg = Infinity
                return "water"
                break;
            case 2:
                this.costg = 2;
                return "woods"
                break;

            default:
                break;
        }
    }

    //Asigna un estilo. Mas adelante debería ser una textura
    getColor() {
        switch (this.terraintype) {
            case "plaine":
                return "limegreen"
                break;
            case "water":
                return "blue"
                break;
            case "woods":
                return "darkgreen"
                break;

            default:
                break;
        }
    }

    makeClickable() {
        this.cellElement.addEventListener("click", ((e) => {
            e.stopPropagation()
            this.whenClicked()
        }))
    }

    whenClicked() {
        if (gameHandler.selectedUnit) {
            let position = {x: this.x, y: this.y};
            serverHandler.sendMoveUnitToServer({unitId: gameHandler.selectedUnit.id, position: position} )
        }
    }

    render() {
        if (this.isReachable) {
            this.cellElement.style.backgroundColor = "#ff000054"
        } else {
            this.cellElement.style.backgroundColor = this.color
        }
    }
}