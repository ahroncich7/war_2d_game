const Cell = require("./objects/Cell.js");
module.exports = grid = {

    map: [],

    makeGrid(mapGrid){
        let width = mapGrid.width;
        let height = mapGrid.height;
        for (let col = 0; col < width; col++) {
            this.map.push([])
            for (let row = 0; row < height; row++) {
                this.map[col].push([])
                let type = mapGrid.mapTile[row][col]
                this.map[col][row] = new Cell ({x:col,y:row}, type)             
            }
            
        }
    },

    getCell({x,y}){
        try {
            return this.map[x][y]
        } catch (error) {
            return undefined
        }
    },

    
}