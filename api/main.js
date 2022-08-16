var express = require("express");
const { get } = require("https");
const { connect } = require("net");
var app = express();
var cors = require("cors");
const Player = require("./objects/Player");
const { calculateReach } = require("./services/pathfinding");
const grid = require("./grid");
const  Unit  = require("./objects/Unit");
const { validateMovement, validateCreateUnit } = require("./services/validations");
var server = require("http").createServer(app);
const PORT = 8091;

//----- Define app and static response



app.use(cors())

app.use(express.static("public"));

app.use(express.static("api"))


//--------------------------------------




//---------- Run Server ----------

server.listen(PORT, function () {
    console.log(`server corriendo en http://localhost:${PORT}`)
});

//--------------------------------------


var io = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
})


//---------------- HEAR MESSAGES FROM CLIENT -------------------

io.on("connection", function (socket) {
    var clientIp = socket.request.connection.remoteAddress

    console.log("alguien se conectó con la IP" + clientIp+ " y el id " + socket.id)
    

    socket.on("setPlayer", function (data){
        console.log(data)
        let newPlayer = new Player(data.name)
        console.log(newPlayer);
        socket.emit("playerConfig", newPlayer)
    })

    socket.on("selectUnit", function (data){
        console.log(data.Id)
        console.log(Unit)
        calculateReach(Unit.getUnit(data.Id))
        socket.emit("reacheableCells", grid.map.filter(cell=> cell.filter(cell=>cell.isReachable)))
        
    })

    socket.on("createUnit", function (data) {
        console.log("Se crea nueva unidad")
        console.log(data)
        let res = validateCreateUnit(data.type, data.player)
        io.sockets.emit("newUnit", res)
    });

    socket.on("moveUnit", function (data) {
        console.log("Se mueve una unidad");
        let res = validateMovement(data.unitId, data.position);
        io.sockets.emit("moveUnit", res);
    });

    socket.on("destroyUnit", function (data) {
        console.log("Se destruye una unidad")
        io.sockets.emit("destroyUnit", data)
    });

});