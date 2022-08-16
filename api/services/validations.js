const Unit = require("../objects/Unit")

exports.validateMovement = function validateMovement (unitId, targetCell ) {

    let unit = Unit.getUnit(unitId);
    if(unit.owner == ownerTurn && Unit.unitsInstances.find($unit => $unit.id == unitId)){
        unit.moveTo(targetCell)
        let response = (unitId, targetCell)
        return response;
    }else console.log("Not Valid Movement")

}

exports.validateCreateUnit = function validateCreateUnit(type, owner){

    if (true){
        let unit = new Unit(type, owner)
        console.log(unit)
        return unit
    }

}