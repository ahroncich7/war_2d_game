const { calculateReach } = require("./pathfinding.js");

const Unit = require("../objects/Unit");
const Cell = require("../objects/Cell.js");
const grid = require("../objects/grid");
const gameHandlerServer = require("./gameHandlerServer.js");

exports.validateMovement = function (unitId, position) {
    let res = ({
        isValid: false,
        message: "Not Valid Movement"
    })

    let unit = Unit.getUnit(unitId);

    if (
        unit.owner == "ale"
        && Unit.unitsInstances.find($unit => $unit.id == unitId)
        && grid.getCell(position).isReachable
    ) {
        gameHandlerServer.moveUnit(unit, position)
        res.isValid = true;
        res.message = "Valid Movement"
    }

    return res
}

exports.validateCreateUnit = function (type, owner) {
    let res = {
        unit: "",
        isValid: false,
        message: "Invalid to create unit"
    }
    if (true) {//condicion para validar
        res.unit = new Unit(type, owner);
        gameHandlerServer.moveUnit(res.unit, { x: 17, y: 10 })
        res.isValid = true;
        res.message = "Valid to create unit"
    }
    return res
}

exports.validateSelectUnit = function (data) {

    let unit;
    let res = ({
        id: data.id,
        isValid: false,
        message: "Not Valid Selection"
    })


    try {
        unit = Unit.getUnit(data.id)
    }
    catch (e) {
        res.message = `Not Unit with id ${data.id}`
        return res
    }

    if (true) { //condicion para que sea el turno del jugador
        res.message = "Valid Selection";
        res.isValid = true
    }

    try {

        calculateReach(unit)

    }
    catch (e) {
        console.log(e)
        res.message += " Calculate Reach not possible"
    }

    return res

}