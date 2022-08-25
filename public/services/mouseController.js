import { serverHandler } from "../connections/serverHandler.js";
import { gameHandler } from "./gameHandler.js"

export function whenClicked(tile) {

    let unit = tile.unitInside;
    let selectedUnit = gameHandler.selectedUnit;

    if (unit) {

        clickUnitTile(unit, selectedUnit, tile)

    } else {

        clickEmptyTile(selectedUnit, tile)

    }


};

function clickUnitTile(unit, selectedUnit, tile) {

    if (selectedUnit) {

        if (unit.owner == gameHandler.player) {

            sendSelectUnit(unit);

        } else {

            sendMoveUnit(selectedUnit, tile)

        }

    } else {

        if (unit.owner == gameHandler.player) {

            sendSelectUnit(unit);

        } else {

            // inspectUnit(unit)

        }

    }
}

function clickEmptyTile(selectedUnit, tile) {

    if (selectedUnit) {

        sendMoveUnit(selectedUnit, tile)

    }else{

        // inspectTile(tile)

    }

}

function sendMoveUnit(unit, targetTile){

    let data = {
        message : "client require movement",
        id : unit.id,
        position : targetTile.position
    }
    serverHandler.sendMoveUnitToServer(data)

}

function sendSelectUnit(unit){

    let data = {

        message : "client require select",
        id : unit.id,

    }

    serverHandler.sendSelectUnitToServer(data)

}

