import { serverHandler } from "./connections/serverHandler.js";
import { Tile } from "./object/Tile.js";
import { gameHandler } from "./services/gameHandler.js";





//-------------START-----------------//



//------------------ SET UP --------------------------------------

serverHandler.connectToServer()



//-------------------------- TESTS -------------------------------

window.Tile = Tile;
window.gameHandler = gameHandler;
window.serverHandler = serverHandler;

document.querySelector("#add-unit").addEventListener("click", (e) => {
    serverHandler.sendCreateNewUnitToServer("soldier")
})

