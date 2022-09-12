const Cell = require("../objects/Cell");
const Unit = require("../objects/Unit");
const { fight } = require("./combatSystem");

module.exports = gameHandlerServer = {

    moveUnit(id, position) {
        let unit = this.getUnit(id);
        unit.moveTo(position);
        this.setTilesUnreachables();
    },

    setTilesUnreachables() {
        Cell.cellList.forEach(cell => {
            cell.isReachable = false
        })
    },

    createUnit(type, owner) {
        let unit = new Unit(type, owner);
        unit.moveTo(ownerHomePosition = { x: 17, y: 10 });
        return unit
    },

    getUnit(unitId) {
        return Unit.getUnit(unitId);
    },

    getUnitList() {
        return Unit.unitsInstances;
    },

    getCellList() {
        return Cell.cellList;
    },

    getCell(position) {
        let $cell = Cell.cellList.find($cell => $cell.position.x == position.x && $cell.position.y == position.y)
        return $cell;
    },

    launchCombat(attacker, defender) {
        const target = defender.position;
        const attackerWins = fight(attacker, defender);
        if (attackerWins){this.moveUnit(attacker.id, target)}

    }
}