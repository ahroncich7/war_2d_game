
const grid = require("../grid.js");

module.exports = class Unit {
    id;
    position = { x: 0, y: 0 };
    type;
    movement;
    owner;
    sight;
    attackStrength = 6;
    defenseStrength = 8;

    constructor(type, owner) {
        this.id = Unit.incrementId()
        this.type = type;
        this.movement = 2;
        this.owner = owner
        Unit.unitsInstances.push(this)
    }

    moveTo(position) {
        let cell = grid.getCell(position)
        if (cell.isReachable) {
            grid.getCell(this.position).unitInside = undefined
            cell.unitInside = this
            this.position = position;
            console.log(`Unidad ${this.id} movida a:`, cell.position)
        }
        else {
            console.log("unit " + this.id + ": Unreacheable target" + grid.getCell(position))
        }

    }

    destroy(){
        Unit.destroyUnit(this.id)
    }





    ////////////////////// STATICS ////////////////////////////

    static unitsInstances = []

    static incrementId() {
        if (!this.latestId) this.latestId = 1
        else this.latestId++
        return this.latestId
    }

    static getUnit(unitId) {
        let unit = Unit.unitsInstances.find(unit => unit.id == unitId) 
        if(unit) return unit
        else console.log(`No existe la unidad con ID: ${unitId}`)         

    }

    static getUnitsByOwner(owner) {
        return Unit.unitsInstances.filter(unit => unit.owner == owner)
    }

    static destroyUnit(unitId) {
        let unit = Unit.getUnit(unitId)
        if (unit) {
            grid.getCell(unit.position).unitInside = undefined;
            Unit.unitsInstances = Unit.unitsInstances.filter((unit) => {
                return unit.id != unitId
                })
            console.log(`Unidad con ID : ${unit.id} DESTRUIDA`)
            
        }
    }
}


