const mapGrid = require("../../tools/mapa.json");
const gameHandlerServer = require("./gameHandler");
const { calculateReach } = require("./pathfinding");
const { validateSelectUnit, validateCreateUnit, validateTargetCell, validateUnitInTarget, validateMoveUnit } = require("./validations");

module.exports = requestHandler = {

    reqMap(data) {
        let responseData = {
            map: mapGrid,
            message: "Map 1 Seted Up"
        }
        return responseData;
    },

    reqSelectUnit(data) {

        let responseData = {}

        let isValid = validateSelectUnit(data);

        if (isValid) {

            let unit = gameHandlerServer.getUnit(data.id)
            try {calculateReach(unit) }
            catch { responseData.message = `Calculate Reach Failed` }
            responseData.status = "Ok"
            responseData.id = data.id;

        } else {

            gameHandlerServer.setTilesUnreachables();
            responseData.status = "Error";
            responseData.message = `Selection not valid`;

        }

        responseData.unitList = gameHandlerServer.getUnitList();
        responseData.cellList = gameHandlerServer.getCellList();
        return responseData;
    },

    reqCreateUnit(data) {

        let responseData = {}

        let isValid = validateCreateUnit(data);

        if (isValid) {
            gameHandlerServer.createUnit(data.type, data.owner);
            responseData.unitList = gameHandlerServer.getUnitList();
            responseData.cellList = gameHandlerServer.getCellList();
            responseData.status = "Ok"
        } else {
            responseData.status = "Error"
            responseData.message = `Failed to create`;
        }

        return responseData;
    },

    reqMoveUnit(data) {

        let responseData = {}

        let isValid = validateTargetCell(data);
        let unitInTarget = validateUnitInTarget(data);
        let targetIsReachable = validateMoveUnit(data.id, data.position);

        if (isValid) {
            
            if (unitInTarget == "NO_UNIT") {

                if (targetIsReachable) {
                    gameHandlerServer.moveUnit(data.id, data.position);
                }
                responseData.unitList = gameHandlerServer.getUnitList();
                responseData.cellList = gameHandlerServer.getCellList();
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

            responseData.status = "Ok";

        } else {
            responseData.message = `Failed to move unit`
        }

        return responseData;
    }
}