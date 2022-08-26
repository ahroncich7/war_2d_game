import { Tile } from "../object/Tile.js";
import { gameHandler } from "../services/gameHandler.js";
import { startMap } from "../services/mapHandler.js";

export var serverHandler = {

    socket: undefined,

    serverIp: "181.1.107.37:8091",

    connectToServer() {
        this.socket = io.connect(this.serverIp, { "forceNew": true });


        //---------------- HEAR MESSAGES FROM SERVER -------------------

        this.socket.on("setMap", (data)=>{
            startMap(data.map);
            console.log(data.message)
        })
        
        this.socket.on("newUnit", (data) => {
            console.log(data, data.unit.sprite)
            if(data.isValid){
                gameHandler.unitList = data.unitList;
            }else{
                console.log(data.message)
            }
        });

        // this.socket.on("destroyUnit", (unitId) => {
        //     gameHandler.deleteObject(gameHandler.getUnit(unitId))
        // });

        // this.socket.on("moveUnit", (data) => {
        //     if (data.isValid) {
        //         moveUnit(data)
        //     } else {
        //         console.log(data.message);
        //     }
        // });

        // this.socket.on("selectUnit", (data) => {
        //     if (data.isValid) {
        //         selectUnit(data);
        //     } else {
        //         console.log("Not Valid Select");
        //     }
        // })
    },



    //---------------- SEND MESSAGES TO SERVER -------------------

    // sendSetNewPlayerToServer() {
    //     this.socket.emit("setPlayer", { name: gameHandler.player })
    // },

    // sendSelectUnitToServer(data) {
    //     console.log(data.message)
    //     this.socket.emit("selectUnit", data)
    // },

    sendCreateNewUnitToServer(type) {
        let data = {
            type: type,
            player: gameHandler.player
        }
        this.socket.emit("createUnit", data)
    },

    // sendMoveUnitToServer(data) {
    //     console.log(data.message)
    //     this.socket.emit("moveUnit", data)
    // },

    // sendDestroyUnitToServer(unit) {
    //     this.socket.emit("destroyUnit", unit)
    // }

}


////////////////////// Server Services ////////////////////////



