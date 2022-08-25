const mapGrid = require("../../tools/mapa.json");
const { validateSelectUnit } = require("./validations");

exports.sendMapToClient = function (socket){
    let data = {
        map: mapGrid,
        message: "Map 1 Seted Up" 
    }
    socket.emit("setMap", data)
}

exports.sendSelectUnitToClients =  function (socket){
    let res = validateSelectUnit(data)
        res.isValid ? console.log(`Unit id ${res.id} selected`) : console.log(res.message)
        socket.emit("selectUnit", res)
}