var express = require("express");
const { get } = require("https");
var app = express();
var cors = require("cors");
const grid = require("./objects/grid");

const mapGrid = require("../tools/mapa.json");
const Unit = require("./objects/Unit");
const gameHandlerServer = require("./services/gameHandler");
const { controller } = require("./controller");
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

controller.connect(server);



//////////////////////// TESTS ///////////////////////////////

grid.makeGrid(mapGrid)
const testUnit = gameHandlerServer.createUnit("soldier", "pepe")
gameHandlerServer.moveUnit(testUnit.id, {x:19 ,y:8})

// debugger