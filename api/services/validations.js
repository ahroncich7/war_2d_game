const { calculateReach } = require("./pathfinding.js");

const Unit = require("../objects/Unit");
const Cell = require("../objects/Cell.js");
const grid = require("../grid.js");

exports.validateMovement = function (unitId, position) {
    let res = ({
        data: undefined,
        isValid: false,
        message: "Not Valid Movement"
    })
    try {
        let unit = Unit.getUnit(unitId)
        console.log(grid.getCell(position).isReachable) // BORRAR 
        if (
            unit.owner == "ale"
            && Unit.unitsInstances.find($unit => $unit.id == unitId)
            && grid.getCell(position).isReachable
        ) {
            unit.moveTo(position);
            res.data = { id: unitId, position: position };

            console.log(res.isValid)//BORRAR
            res.isValid = true;
            res.message = "Valid Movement"
        }
    } catch { console.log("hubo un error") }

    return res

}

exports.validateCreateUnit = function (type, owner) {
    let res = {
        id: "",
        type,
        owner,
        isValid: false,
        message: "Invalid to create unit"
    }
    if (true) {//condicion para validar
        let unit = new Unit(type, owner)
        res.id = unit.id;
        res.type = unit.type;
        res.owner = unit.owner;
        res.isValid = true;
        res.message = "Valid to create unit"
    }
    return res
}

exports.validateSelectUnit = function (data) {

    let unit;
    let res = ({
        id: data.id,
        data: undefined,
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

        let reacheableCells = calculateReach(unit)
        res.data = reacheableCells
    }
    catch (e) {
        console.log(e)
        res.message += " Calculate Reach not possible"
    }

    return res

}