import { serverHandler } from "../connections/serverHandler.js";
import { Cell } from "../object/cell.js";
import { Unit } from "../object/unit.js";

export var gameHandler = {


    playersList :[],
    player: prompt("ingrese nombre"),
    turnPlayer : "Player1",
    selectedUnit : undefined,
    initialPosition: undefined,

    selectUnit(unit){
        this.selectedUnit = unit;
        console.log("Unit: ", unit, " selected");
        serverHandler.sendSelectUnit(unit)
    },


    createUnit(id, type, owner ) {
        let unit = new Unit(id, type, owner)
        unit.moveTo(owner.initialPosition)
    },

    moveUnit(unit, position) {
        unit.moveTo(position)
    },

    destroyUnit(unit) {
    },

    update(){
        Unit.unitList.forEach(unit=>{
            unit.render()
        })
    }


}