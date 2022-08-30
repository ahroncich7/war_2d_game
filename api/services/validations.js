const { calculateReach } = require("./pathfinding.js");

const Unit = require("../objects/Unit");
const Cell = require("../objects/Cell.js");
const grid = require("../objects/grid");
const gameHandlerServer = require("./gameHandler.js");
const { fight } = require("./combatSystem.js");

exports.validateSelectUnit = function (data) {

    let unit = Unit.getUnit(data.id)

    if (!unit) {
        console.log(`ValidateSelectUnit: Not Unit with id ${data.id}`);
        return false
    }

    if (true) { //condicion para que sea el turno del jugador

        return true;

    }
}

exports.validateCreateUnit = function (data) {

    if (true) {//condicion para validar
        return true
    }else{
        console.log(`ValidateCreateUnit: Failed to create unit`)
        return false
    }
}

exports.validateTargetCell = function (data) {

    let unit = gameHandlerServer.getUnit(data.id);
    if(!unit) {
        console.log(`ValidateMoveUnit: Not valid id`)
        return false
    }

    let cell = gameHandlerServer.getCell(data.position);
    if(!cell){
        console.log(`ValidateMoveUnit: Not valid position`)
        return false
    }
    
    gameHandlerServer.calculateReach(unit);

    cell = gameHandlerServer.getCell(data.position);
    if(!cell.isReachable){
        console.log(`ValidateMoveUnit: Not reachable position`)
        return false
    }

    return true
}

exports.validateUnitInTarget = function (data){
    let cell = gameHandlerServer.getCell(data.position);
    if(!cell.unitInside){
        console.log(`ValidateUnitTarget: No unit in the target`)
        return "NO_UNIT";
    }

    let unit = gameHandlerServer.getUnit(data.id)
    if (cell.unitInside.owner == unit.owner){
        return "OWN_UNIT"
    }else{
        return "ENEMY_UNIT"
    }
}