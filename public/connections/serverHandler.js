/*UNUSED


serverHandler = {

    socket: io.connect(),

    connectToServer() {
        this.socket.on("mensaje", function(data) {

        })
    },


    sendNewUnit(unit) {
        this.socket.emit("getNewUnit", unit)
    },


    listenNewUnit() {
        this.socket.on("newUnit", (unit) => {
            gameHandler.setUnit(unit.type, unit.owner, unit.position)
        })
    },


    sendDestroyUnit(unit) {
        this.socket.emit("destroyUnit", unit)
    },

    listenDestroyUnit() {
        this.socket.on("unitDestroyed", (unit) => {
            gameHandler.destroyUnit(unit)
        })
    }
}

*/