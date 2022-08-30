const Cell = require("../objects/Cell");
const Unit = require("../objects/Unit");
const { fight } = require("./combatSystem");
const { calculateReach } = require("./pathfinding");

module.exports = gameHandlerServer = {

    moveUnit(id, position) {
        let unit = this.getUnit(id);
        unit.moveTo(position);
        this.setTilesUnreachables();
    },

    setTilesUnreachables(){
        Cell.cellList.forEach(cell => {
            cell.isReachable = false
        })
    },

    createUnit(type, owner){
        let unit = new Unit(type, owner);
        unit.moveTo(ownerHomePosition = {x:17, y:10});
        return unit
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
        return Cell.cellList(position);
    },

    launchCombat(attacker, defender){
        fight(attacker, defender)
    }
}