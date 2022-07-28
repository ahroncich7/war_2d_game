var serverHandler = {

    socket: undefined,

    serverIp = "181.1.13.97:8091",

    connectToServer() {
        this.socket = io.connect(serverIp, { "forceNew": true }),



        //---------------- HEAR MESSAGES FROM SERVER -------------------
        
        this.socket.on("newUnit", (unit) => {
            gameHandler.setUnit(unit.type, unit.owner, unit.position)
        }),

        this.socket.on("unitDestroyed", (unit) => {
            gameHandler.destroyUnit(unit)
        }),

        this.socket.on("moveUnit", (data) => {
            data = JSON.parse(data)
            let unit = gameHandler.getUnit(data.unitId) 
            let pos = data.position
            let theCell = gameHandler.gridMap.getCell(pos.x, pos.y)
            gameHandler.selectUnit(unit)
            unit.moveTo(theCell)
        })


    },



    //---------------- SEND MESSAGES TO SERVER -------------------

    sendCreateNewUnitToServer(unit) {
        this.socket.emit("createUnit", unit)
    },

    sendMoveUnitToServer(data) {
        console.log("paso algo")
        this.socket.emit("moveUnit", JSON.stringify(data))
    },

    sendDestroyUnitToServer(unit) {
        this.socket.emit("destroyUnit", unit)
    }

}