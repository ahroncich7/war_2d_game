import { Tile } from "../object/Tile.js";


export var gameHandler = {


    playersList: [],
    player: prompt("ingrese nombre"),
    turnPlayer: "Player1",
    selectedUnit: undefined,
    initialPosition: { x: 16, y: 10 },
    unitList: [],

    selectUnit(unitId) {
        let unit = this.getUnit(unitId);
        this.selectedUnit = unit;
    },


    // createUnit(id, type, owner ) {
    //     let unit = new UnitObject(id, type, owner);
    //     unit.render()
    // },

    // moveUnit(id, position) {
    //     let unit = UnitObject.getUnit(id);
    //     unit.moveTo(position);
    //     this.unselectAll()
    // },

    // destroyUnit(unit) {
    // },

    update() {
        // this.renderUnits();
        this.updateTiles();
    },

    // renderUnits() {

    //     this.unitList.forEach(unit => {
    //         let spriteContainer = Tile.getCell(unit.position).spriteContainer;
    //         spriteContainer.innerHTML += `
    //         <img src=../images/${unit.sprite}></img>    
    //         `
    //     })
    // },

    updateUnits(unitList = this.unitList) {
        this.unitList = unitList;
        // this.renderUnits();
    },

    updateTiles(cellList = Tile.tileMap) {
        cellList.forEach(cell => {
            let tile = Tile.getCell(cell.position);
            tile.isReachable = cell.isReachable;
            tile.unitInside = cell.unitInside;
        })

        Tile.tileMap.forEach(tile => {
            tile.render()
        })
    },

    unselectAll() {
        this.selectedUnit = undefined;
        Tile.tileMap.forEach(tile => tile.isReacheable = false)
        gameHandler.update()
    },

    getUnit(unitId) {
        return this.unitList.find(unit => unit.id == unitId)
    }
}