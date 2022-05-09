var express = require("express");
const { get } = require("https");
const { connect } = require("net");
var app = express();
var cors = require("cors")
var server = require("http").createServer(app);
const PORT = 8091;

app.use(cors())



var io = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
})

app.use(express.static("public"));
app.use(express.static("api"))



server.listen(PORT, function() {
    console.log(`server corriendo en http://localhost:${PORT}`)

});

io.on("connection", function(socket) {
    var clientIp = socket.request.connection.remoteAddress
    console.log("alguien se conectó con " + clientIp)

    socket.on("getNewUnit", function(unit) {
        console.log("piden nueva unidad")
        io.sockets.emit("newUnit", { unit })
    })
})