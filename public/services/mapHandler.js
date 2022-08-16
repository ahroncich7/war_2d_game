import { Cell } from "../object/cell.js";

let mapElement = document.querySelector(".map");

export function startMap(map){
    printMap(map.mapGrid)
    setMapTiles(map.mapGrid)
    
}

function printMap(mapGrid) {
    let width = mapGrid.width;
    let height = mapGrid.height; 
    mapElement.innerHTML = ((`<div></div>`).repeat(width * height))
}

function setMapTiles(mapGrid){
    let divMap = mapElement.querySelectorAll("div");
    for (let x = 0; x < mapGrid.height; x++) {
        for (let y = 0; y < mapGrid.width; y++) {
            new Cell(mapGrid.mapTiles[x][y], {x:y,y:x }, divMap[mapGrid.width*x + y])
        }
        
    }

}