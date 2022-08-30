const mapGrid = require("../../tools/mapa.json");
const gameHandlerServer = require("./gameHandler");
const { validateSelectUnit, validateCreateUnit, validateMoveUnit, validateTargetCell, validateUnitInTarget } = require("./validations");

module.exports = requestHandler = {

    reqMap(data){
        let responseData = {
            map: mapGrid,
            message: "Map 1 Seted Up"
        }
        return responseData;
    },

    reqSelectUnit(data) {

        let responseData = {
            message : ""
        }

        let isValid = validateSelectUnit(data);

        if (isValid) {

            let unit = gameHandlerServer.getUnit(data.id)
            try {

                gameHandlerServer.calculateReach(unit)

            } catch {
                responseData.message = `Calculate Reach Failed`;
            }
        } else {

            gameHandlerServer.setTilesUnreachables();
            responseData.message = `Selection not valid`;

        }

        responseData.unitList = gameHandlerServer.getUnitList();
        responseData.cellList = gameHandlerServer.getCellList();
        responseData.id = data.id;
        return responseData;
    },

    reqCreateUnit(data) {

        let responseData = {
            message :""
        }

        let isValid = validateCreateUnit(data);

        if (isValid) {
            gameHandlerServer.createUnit(data);
            responseData.unitList = gameHandlerServer.getUnitList();
            responseData.cellList = gameHandlerServer.getCellList();
        } else {
            responseData.message = `Failed to create`;
        }

        return responseData;
    },

    reqMoveUnit(data) {

        let responseData = {
            message : "",
            selectUnitInstead: false
        }

        let isValid = validateTargetCell(data);

        if (isValid) {
            let unitInTarget = validateUnitInTarget(data);

            if (unitInTarget == "NO_UNIT") {
                gameHandlerServer.moveUnit(data.id, data.position);
                responseData.unitList = gameHandlerServer.getUnitList();
                responseData.cellList = gameHandlerServer.getCellList();
                return responseData;
            }

            if (unitInTarget == "OWN_UNIT") {
                responseData.selectUnitInstead = true;
                responseData.id = data.id
            }

            if (unitInTarget == "ENEMY_UNIT") {
                let attacker = gameHandlerServer.getUnit(data.id);
                let defender = gameHandlerServer.getCell(data.position).unitInside;
                gameHandlerServer.launchCombat(attacker, defender)
                gameHandlerServer.getUnitList();
                gameHandlerServer.getCellList();
            }
            gameHandlerServer.moveUnit(data.id, data.position);

        } else {
            responseData.message = `Failed to move unit`
        }

        return responseData;
    }
}