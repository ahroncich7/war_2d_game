var express = require("express");
const { get } = require("https");
const { connect } = require("net");
var app = express();
var server = require("http").createServer(app);
const PORT = 8091;


var io = require("socket.io")(server);

// app.use(express.static("../"));

server.listen(PORT, function() {
    console.log(`server corriendo en http://localhost:${PORT}`)

});

app.get("/", function(request, response) {
    response.sendFile(path.join(__dirname, '../index.html'));
});

io.on("connection", function(socket) {

    console.log("alguien se conectó")

    socket.on("getNewUnit", function(unit) {
        console.log("piden nueva unidad")
        socket.emit("newUnit", { unit })
    })
});