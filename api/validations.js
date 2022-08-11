const Unit = require("./Unit")

exports.validateMovement = function validateMovement (unit, targetCell ) {

    let unit = Unit.getUnit(unitId);
    if(unit.owner == ownerTurn && Unit.unitsInstances.find($unit => $unit.id == unitId)){
        return true
    }else return false

}