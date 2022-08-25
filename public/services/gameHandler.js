import { Tile } from "../object/Tile.js";
import { UnitObject } from "../object/UnitObject.js";


export var gameHandler = {


    playersList :[],
    player: prompt("ingrese nombre"),
    turnPlayer : "Player1",
    selectedUnit : undefined,
    initialPosition: {x:16, y:10},

    selectUnit(unitId){
        let unit = UnitObject.getUnit(unitId)
        this.selectedUnit = unit;
        this.update()
    },


    createUnit(id, type, owner ) {
        let unit = new UnitObject(id, type, owner);
        unit.render()
    },

    moveUnit(id, position) {
        let unit = UnitObject.getUnit(id);
        unit.moveTo(position);
        this.unselectAll()
    },

    destroyUnit(unit) {
    },

    update(){
        UnitObject.unitList.forEach(unit=>{
            unit.render()
        })

        Tile.tileMap.forEach(tile=>{
            tile.render()
        })
    },

    unselectAll(){
        this.selectedUnit = undefined;
        Tile.tileMap.forEach(tile=>tile.isReacheable = false)
        gameHandler.update()
    }

}