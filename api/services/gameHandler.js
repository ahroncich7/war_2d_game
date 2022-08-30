const Cell = require("../objects/Cell");
const grid = require("../objects/grid");
const { getUnit } = require("../objects/Unit");
const Unit = require("../objects/Unit");
const { fight } = require("./combatSystem");
const { calculateReach } = require("./pathfinding");

module.exports = gameHandlerServer = {

    moveUnit(id, position) {
        let unit = getUnit(id);
        calculateReach(unit);
        unit.moveTo(position);
        this.setTilesUnreachables();
    },

    calculateReach(unit){
        calculateReach(unit);
    },

    setTilesUnreachables(){
        Cell.cellList.forEach(cell => {
            cell.isReachable = false
        })
    },

    createUnit(data){
        let unit = new Unit(data.type, data.owner);
        unit.moveTo(ownerHomePosition = {x:17, y:10});

    },

    getUnit(unitId) {
        return Unit.getUnit(unitId);
    },

    getUnitList(){
        return Unit.unitsInstances;
    },

    getCellList(){
        return Cell.cellList;
    },

    getCell(position){
        return grid.getCell(position);
    },

    launchCombat(attacker, defender){
        fight(attacker, defender)
    }
}