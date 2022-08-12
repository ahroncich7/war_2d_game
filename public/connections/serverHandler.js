var serverHandler = {

    socket: undefined,

    serverIp: "181.90.115.21:8091",

    connectToServer() {
        this.socket = io.connect(this.serverIp, { "forceNew": true });


        //---------------- HEAR MESSAGES FROM SERVER -------------------

        this.socket.on("playerConfig", (data) => {
            console.log(data);
            gameHandler.playerHome = data.playerHome

        })

        this.socket.on("newUnit", (data) => {
            gameHandler.setUnit(data.type, data.owner, data.position)
        });

        this.socket.on("destroyUnit", (unitId) => {
            gameHandler.deleteObject(gameHandler.getUnit(unitId))
        });

        this.socket.on("moveUnit", (data) => {
            let unit = gameHandler.getUnit(data.unitId)
            let pos = data.position
            let Cell = gameHandler.gridMap.getCell(pos.x, pos.y)
            gameHandler.selectUnit(unit)
            unit.moveTo(Cell)
        });
    },



    //---------------- SEND MESSAGES TO SERVER -------------------

    sendSetNewPlayerToServer() {
        this.socket.emit("setPlayer", gameHandler.ownerTurn)
    },

    sendCreateNewUnitToServer(data) {
        this.socket.emit("createUnit", data)
    },

    sendMoveUnitToServer(data) {
        this.socket.emit("moveUnit", data)
    },

    sendDestroyUnitToServer(unit) {
        this.socket.emit("destroyUnit", unit)
    }

}