import { Tile } from "../object/Tile.js";


export var gameHandler = {


    playersList :[],
    player: prompt("ingrese nombre"),
    turnPlayer : "Player1",
    selectedUnit : undefined,
    initialPosition: {x:16, y:10},
    unitList: [],

    selectUnit(unitId){
        let unit = this.getUnit(unitId);
        this.selectedUnit = unit;
        this.update()
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

    update(){
        this.renderUnits();

        Tile.tileMap.forEach(tile=>{
            tile.render()
        })
    },

    renderUnits(){
        this.unitList.forEach(unit => {
            let spriteContainer = Tile.getCell(unit.position).spriteContainer;
            spriteContainer.innerHTML += `
            <img src=../images/${unit.sprite}></img>    
            `
        })
    },

    unselectAll(){
        this.selectedUnit = undefined;
        Tile.tileMap.forEach(tile=>tile.isReacheable = false)
        gameHandler.update()
    },

    getUnit(unitId){
        return this.unitList.find(unit => unit.id == unitId)
    }
}