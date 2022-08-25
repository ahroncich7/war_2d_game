import { Tile } from "../object/Tile.js";

let mapElement = document.querySelector(".map");

export function startMap(map){
    printMap(map)
    setMapTiles(map)
    
}

function printMap(map) {
    let width = map.width;
    let height = map.height; 
    mapElement.innerHTML = ((`<div></div>`).repeat(width * height))
}

function setMapTiles(map){
    let divMap = mapElement.querySelectorAll("div");
    for (let x = 0; x < map.height; x++) {
        for (let y = 0; y < map.width; y++) {
            new Tile(map.mapTile[x][y], {x:y,y:x }, divMap[map.width*x + y])
        }
        
    }

}