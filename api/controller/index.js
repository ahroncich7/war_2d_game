const requestHandler = require("../services/requestHandler")


exports.controller = {

    connect: (server) => {

        const io = require("socket.io")(server, {
            cors: {
                origin: "*"
            }
        })

        io.on("connection", function (socket) {
            const clientIp = socket.request.connection.remoteAddress

            console.log("alguien se conectó con la IP" + clientIp + " y el id " + socket.id)

            socket.on("reqMap", function (data){
                let response = requestHandler.reqMap(data);
                socket.emit("resMap", response)
            })
            
            socket.on("reqSelectUnit", function (data) {
                let response = requestHandler.reqSelectUnit(data);
                socket.emit("resSelectUnit", response);
            });

            socket.on("reqCreateUnit", function (data) {
                let response = requestHandler.reqCreateUnit(data);
                io.sockets.emit("resCreateUnit", response);
            });

            socket.on("reqMoveUnit", function (data) {
                let response = requestHandler.reqMoveUnit(data);
                if(response.selectUnitInstead){
                    socket.emit("resSelectUnit", response)
                }else{
                io.sockets.emit(`resMoveUnit`, response)};
            });

        })



    }
}