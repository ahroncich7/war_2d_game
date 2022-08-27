const Cell = require("../objects/Cell");
const grid = require("../objects/grid");
const Unit = require("../objects/Unit")

module.exports = gameHandlerServer = {

    moveUnit(unit, position) {
        if (!grid.getCell(position).unitInside) {
            unit.moveTo(position);
            Cell.cellList.forEach(cell => {
                cell.isReachable = false
            })
        }
    }
}