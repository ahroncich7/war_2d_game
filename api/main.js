var express = require("express");
const { get } = require("https");
const { connect } = require("net");
var app = express();
var cors = require("cors");
const {playersHandler} = require("./playersHandler");
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
        console.log(global.playersHandler.setNewPlayer(data));
        socket.emit("playerConfig", global.playersHandler.playersList[global.playersHandler.playersList.length -1])
    })

    socket.on("createUnit", function (data) {
        console.log("Se crea nueva unidad")
        io.sockets.emit("newUnit", data)
    });

    socket.on("moveUnit", function (data) {
        console.log("Se mueve una unidad")
        io.sockets.emit("moveUnit", data)
    });

    socket.on("destroyUnit", function (data) {
        console.log("Se destruye una unidad")
        io.sockets.emit("destroyUnit", data)
    });

});