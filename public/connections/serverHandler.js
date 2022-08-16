import  {gameHandler}  from "../services/gameHandler.js";

export var serverHandler = {

    socket: undefined,

    serverIp: "181.14.115.50:8091",

    connectToServer() {
        this.socket = io.connect(this.serverIp, { "forceNew": true });


        //---------------- HEAR MESSAGES FROM SERVER -------------------

        this.socket.on("playerConfig", (data) => {
            console.log(data);
            gameHandler.initialPosition = data.InitialPosition
            gameHandler.player = data

        })

        this.socket.on("newUnit", (data) => {
            console.log(data)
            gameHandler.createUnit(data.id, data.type, data.owner);
            gameHandler.update()
        });

        this.socket.on("destroyUnit", (unitId) => {
            gameHandler.deleteObject(gameHandler.getUnit(unitId))
        });

        this.socket.on("moveUnit", (data) => {
           gameHandler.moveUnit(data.Id, data.unit)
        });

        this.socket.on("reacheableCells", (data)=>{
            console.log(data)
        })
    },



    //---------------- SEND MESSAGES TO SERVER -------------------

    sendSetNewPlayerToServer() {
        this.socket.emit("setPlayer", {name: gameHandler.player})
    },

    sendSelectUnit(unit){
        this.socket.emit("selectUnit", unit)
    },

    sendCreateNewUnitToServer(type) {
        let $data = {
            type: type,
            player: gameHandler.player
        } 
        this.socket.emit("createUnit", $data)
    },

    sendMoveUnitToServer(data) {
        this.socket.emit("moveUnit", data)
    },

    sendDestroyUnitToServer(unit) {
        this.socket.emit("destroyUnit", unit)
    }

}

