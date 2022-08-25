var express = require("express");
const mapGrid = require("../tools/mapa.json");
const { get } = require("https");
const { connect } = require("net");
var app = express();
var cors = require("cors");
const Player = require("./objects/Player");
const grid = require("./grid");
const { validateMovement, validateCreateUnit, validateSelectUnit } = require("./services/validations");

var server = require("http").createServer(app);
const PORT = 8091;

//----- Define app and static response



app.use(cors())

app.use(express.static("public"));

app.use(express.static("api"))


//--------------------------------------



//---------- Run Server ----------

server.listen(PORT, function () {
    console.log(`server corriendo en Puerto: ${PORT}`)
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
        let res = validateSelectUnit(data)
        res.isValid ? console.log(`Unit id ${data.id} selected]`) : console.log(res.message)
        socket.emit("selectUnit", res)
        
    })

    socket.on("createUnit", function (data) {
        let res = validateCreateUnit(data.type, data.player)
        io.sockets.emit("newUnit", res)
    });

    socket.on("moveUnit", function (data) {
        let res = validateMovement(data.id, data.position);
        res.isValid ? console.log(`Unit id ${data.id} Moved]`) : console.log(res.message)
        io.sockets.emit("moveUnit", res)
    });

    socket.on("destroyUnit", function (data) {
        console.log("Se destruye una unidad")
        io.sockets.emit("destroyUnit", data)
    });

});



//////////////////////// TESTS ///////////////////////////////

grid.makeGrid(mapGrid)