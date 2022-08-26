module.exports = class Cell {
    constructor(position, type = "default") {
        this.position = position
        this.terrainType = type;
        this.costg = this.getCostByTerrainType(type); //costo asociado al tipo de terreno
        this.costf;
        this.isReachable = false;
        this.unitInside = undefined;
        Cell.cellList.push(this);
    }

    getCostByTerrainType(terrainType) {
        switch (terrainType) {
            case "grass":
                return 1;
            case "coast":
                return 1;
            case "woods":
                return 2;
            case "snow":
                return 2;
            case "hills":
                return 3;
            case "sea":
                return Infinity;
            default:
                break;
        }
    }

    static cellList = []

}