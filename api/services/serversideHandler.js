const mapGrid = require("../../tools/mapa.json");
const Cell = require("../objects/Cell");
const { unitsInstances } = require("../objects/Unit");
const Unit = require("../objects/Unit");
const { validateSelectUnit, validateCreateUnit, validateMovement } = require("./validations");

exports.sendMapToClient = function (socket) {
    let data = {
        map: mapGrid,
        message: "Map 1 Seted Up"
    }
    socket.emit("setMap", data)
};

exports.sendCreateUnitToClients = function (sockets, data) {
    let res = validateCreateUnit(data.type, data.player)
    res.unitList = Unit.unitsInstances;
    res.cellList = Cell.cellList;
    res.isValid ? console.log(`Unit id ${res.unit.id} type ${res.unit.type} created`) : console.log(res.message)
    sockets.emit("newUnit", res)
};

exports.sendSelectUnitToClients = function (socket, data) {
    let res = validateSelectUnit(data)
    
    res.isValid ? console.log(`Unit id ${res.id} selected`) : console.log(res.message)
    socket.emit("selectUnit", res)
};

exports.sendMoveUnitToClients = function (sockets, data){
    let res = validateMovement(data.id, data.position);
    res.unitList = unitsInstances;
    res.cellList = Cell.cellList;
    res.isValid ? console.log(`Unit id ${data.id} moved to ${JSON.stringify(data.position)}`) : console.log(res.message)
    sockets.emit("moveUnit", res)
}