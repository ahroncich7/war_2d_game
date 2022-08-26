const mapGrid = require("../../tools/mapa.json");
const Unit = require("../objects/Unit");
const { validateSelectUnit, validateCreateUnit } = require("./validations");

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
    res.isValid ? console.log(`Unit id ${res.unit.id} type ${res.unit.type} created`) : console.log(res.message)
    sockets.emit("newUnit", res)
};

exports.sendSelectUnitToClients = function (socket) {
    let res = validateSelectUnit(data)
    res.isValid ? console.log(`Unit id ${res.id} selected`) : console.log(res.message)
    socket.emit("selectUnit", res)
};