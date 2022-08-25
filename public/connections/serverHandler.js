import { Tile } from "../object/Tile.js";
import { gameHandler } from "../services/gameHandler.js";

export var serverHandler = {

    socket: undefined,

    serverIp: "181.1.107.37:8091",

    connectToServer() {
        this.socket = io.connect(this.serverIp, { "forceNew": true });


        //---------------- HEAR MESSAGES FROM SERVER -------------------

        this.socket.on("playerConfig", (data) => {
            if (data.isValid){

            }
            
            
            console.log(data);
            gameHandler.initialPosition = data.InitialPosition
            gameHandler.player = data

        })

        this.socket.on("newUnit", (data) => {
            if(data.isValid){
                createUnit(data)
            }else{
                console.log(data.message)
            }
        });

        this.socket.on("destroyUnit", (unitId) => {
            gameHandler.deleteObject(gameHandler.getUnit(unitId))
        });

        this.socket.on("moveUnit", (data) => {
            if (data.isValid) {
                moveUnit(data)
            } else {
                console.log(data.message);
            }
        });

        this.socket.on("selectUnit", (data) => {
            if (data.isValid) {
                selectUnit(data);
            } else {
                console.log("Not Valid Select");
            }
        })
    },



    //---------------- SEND MESSAGES TO SERVER -------------------

    sendSetNewPlayerToServer() {
        this.socket.emit("setPlayer", { name: gameHandler.player })
    },

    sendSelectUnitToServer(data) {
        console.log(data.message)
        this.socket.emit("selectUnit", data)
    },

    sendCreateNewUnitToServer(type) {
        let $data = {
            type: type,
            player: gameHandler.player
        }
        this.socket.emit("createUnit", $data)
    },

    sendMoveUnitToServer(data) {
        console.log(data.message)
        this.socket.emit("moveUnit", data)
    },

    sendDestroyUnitToServer(unit) {
        this.socket.emit("destroyUnit", unit)
    }

}


////////////////////// Server Services ////////////////////////


function selectUnit(data) {
    data.data.forEach(cell => {
        Tile.getCell(cell.position).isReacheable = true
    })
    gameHandler.selectUnit(data.id)
}

function moveUnit(data) {
    gameHandler.moveUnit(data.data.id, data.data.position);
}

function createUnit(data){
    gameHandler.createUnit(data.id, data.type, data.owner)
}