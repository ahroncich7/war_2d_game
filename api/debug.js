const { fight } = require("./services/combatSystem")
const grid = require("./grid")
const { calculateReach } = require("./services/pathfinding")
const  Unit  = require("./objects/Unit")
const mapGrid = require("../tools/mapa.json")
const { validateMovement, validateSelectUnit } = require("./services/validations")


///////////////////////////// Game Handling //////////////////////





///////////////////////////// Start //////////////////////////////


 
grid.makeGrid(mapGrid)

let unit1 = new Unit("ground", "player2")
let unit2 = new Unit("ground", "player1")
let unit3 = new Unit("wheeled", "player1")
let unit4 = new Unit("ground", "player1")
let unit5 = new Unit("ground", "player2")
let unit6 = new Unit("ground", "player1")
unit1.position = {x:17, y:10}
unit5.position = {x:18, y:9}
fight(unit1, unit5)
unit4.destroy()
validateSelectUnit
validateMovement(1, {x:16, y:10} )
debugger