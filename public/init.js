import { serverHandler } from "./connections/serverHandler.js";
import { Tile } from "./object/Tile.js";
import { UnitObject } from "./object/UnitObject.js";
import map from "./resources/mapa.js";
import { gameHandler } from "./services/gameHandler.js";
import { startMap } from "./services/mapHandler.js";





//-------------START-----------------//
startMap(map)


//------------------ SET UP --------------------------------------

serverHandler.connectToServer()
  


//-------------------------- TESTS -------------------------------

window.Tile = Tile;
window.gameHandler = gameHandler;
window.UnitObject = UnitObject;
window.serverHandler = serverHandler;



