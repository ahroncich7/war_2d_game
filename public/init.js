import { serverHandler } from "./connections/serverHandler.js";
import { Cell } from "./object/cell.js";
import { Unit } from "./object/unit.js";
import map from "./resources/mapa.js";
import { gameHandler } from "./services/gameHandler.js";
import { startMap } from "./services/mapHandler.js";




//-------------START-----------------//

// let playerName = prompt("nombre jugador");
let gameData = {
    map: {
        mapUrl: "/images/quad Grid2.jpg",
        mapGrid: map
    }
}
startMap(gameData.map)

//------------------ SET UP --------------------------------------

serverHandler.connectToServer()
  


//-------------------------- TESTS -------------------------------

window.Unit = Unit;
window.gameHandler = gameHandler;
window.Cell = Cell;
window.serverHandler = serverHandler;
serverHandler.sendSetNewPlayerToServer()