const Cell = require("../objects/Cell");
const Unit = require("../objects/Unit")

module.exports =  gameHandlerServer = {

    moveUnit(unit, position){
        unit.moveTo(position);
        Cell.cellList.forEach(cell=>{
            cell.isReachable = false
        })
    }
}