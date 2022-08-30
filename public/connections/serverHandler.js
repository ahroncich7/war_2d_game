import { Tile } from "../object/Tile.js";
import { gameHandler } from "../services/gameHandler.js";
import { startMap } from "../services/mapHandler.js";

export var serverHandler = {

    socket: undefined,

    serverIp: "181.90.60.86:8091",

    connectToServer() {
        this.socket = io.connect(this.serverIp, { "forceNew": true });
        this.sendReqMap("nada");


        //---------------- HEAR MESSAGES FROM SERVER -------------------

        this.socket.on("resMap", (data) => {
            startMap(data.map);
            console.log(data.message)
        })

        this.socket.on("resSelectUnit", (data) => {
            gameHandler.selectUnit(data.id);
            gameHandler.updateTiles(data.cellList)
            console.log(data.message);
        })

        this.socket.on("resCreateUnit", (data) => {
            gameHandler.updateUnits(data.unitList);
            gameHandler.updateTiles(data.cellList);
            console.log(data.message);
        })

        this.socket.on("resMoveUnit", (data) => {
            gameHandler.updateUnits(data.unitList);
            gameHandler.updateTiles(data.cellList);
            console.log(data.message);
        });


    },



    //---------------- SEND MESSAGES TO SERVER -------------------

    // sendSetNewPlayerToServer() {
    //     this.socket.emit("setPlayer", { name: gameHandler.player })
    // },

    sendSelectUnitToServer(data) {
        console.log(data.message)
        this.socket.emit("reqSelectUnit", data)
    },

    sendCreateNewUnitToServer(type) {
        let data = {
            type: type,
            owner: gameHandler.player
        }
        this.socket.emit("reqCreateUnit", data)
    },

    sendMoveUnitToServer(data) {
        this.socket.emit("reqMoveUnit", data)
    },

    sendReqMap(data) {
        this.socket.emit("reqMap", data);
    }

    // sendDestroyUnitToServer(unit) {
    //     this.socket.emit("destroyUnit", unit)
    // }

}


////////////////////// Server Services ////////////////////////



