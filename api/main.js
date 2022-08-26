var express = require("express");
const { get } = require("https");
const { connect } = require("net");
var app = express();
var cors = require("cors");
const grid = require("./grid");
const { sendSelectUnitToClients, sendMapToClient, sendCreateUnitToClients } = require("./services/serverSideHandler");
const mapGrid = require("../tools/mapa.json")
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

    console.log("alguien se conectó con la IP" + clientIp + " y el id " + socket.id)

    sendMapToClient(socket);

    socket.on("createUnit", function (data) {
        sendCreateUnitToClients(io.sockets, data);
    });

    // socket.on("setPlayer", function (data) {
        
    // })

    // socket.on("selectUnit", function (data) {
    //     sendSelectUnitToClients(socket);
    // })


    // socket.on("moveUnit", function (data) {
    //     let res = validateMovement(data.id, data.position);
    //     res.isValid ? console.log(`Unit id ${data.id} moved`) : console.log(res.message)
    //     io.sockets.emit("moveUnit", res)
    // });

    // socket.on("destroyUnit", function (data) {
    //     console.log("Se destruye una unidad")
    //     io.sockets.emit("destroyUnit", data)
    // });

});



//////////////////////// TESTS ///////////////////////////////

grid.makeGrid(mapGrid)