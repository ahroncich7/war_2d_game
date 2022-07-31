var gameHandler = {

    objectsList: [],
    gridMap: undefined,
    selectedUnit: undefined,
    matrix: undefined,
    gameArea: document.getElementById("gameArea"),
    ownerTurn: prompt("Ingrese nombre de jugador"),
    playerHome: {},




    //---------------------------- SET UP ------------------------------//


    start(matrix) {
        this.escapeSelect()
        this.matrix = matrix
        this.getMap()
    },

    escapeSelect() {

        document.addEventListener("keydown", (e) => {
            if (e.key == "Escape") {
                this.unselectAll()
                console.log("salir")
            }
        })
    },

    getMap() {
        this.gridMap = new GridSystem(this.matrix, this.gameArea);
    },

    selectUnit(unit) {
        this.unselectAll();
        this.selectedUnit = unit;
        unit.calculateReach();
    },

    unselectAll() {
        this.selectedUnit = undefined
        this.gridMap.grid.forEach((e) => {
            e.forEach((e) => {
                e.isReachable = false
            })
        })
    },





    //------------------------UNIT HANDLER -------------------------------//

    setUnit(type = "ground", owner = gameHandler.ownerTurn, coordinate = { x: 0, y: 0 }) {
        let unit = new Unit(type, owner);
        unit.position = this.gridMap.getCell(coordinate.x, coordinate.y);
    },

    combatLaunch(unit1, unit2) {
        let u1a = unit1.attackStrength;
        let u2d = unit2.defenseStrength;

        let u1A = (Math.floor(Math.random() * u1a + 1));
        console.log("unidad 1 ha sacado " + u1A)
        let u2D = (Math.floor(Math.random() * u2d + 1));
        console.log("unidad 2 ha sacado " + u2D)
        if ((u1A + u2D) > u2d) {
            alert(unit1.type + " ha acabado con " + unit2.type);
            serverHandler.sendDestroyUnitToServer(unit2.id);
        }
        this.unselectAll()
    },

    deleteObject(object) {
        this.objectsList = this.objectsList.filter((value) => value != object);
        object.sprite.remove();
        try { object.position.unitInside = undefined } catch { }
    },

    getUnit(unitId) {
        return unitsInstances.find(unit => unit.id == unitId)
    },


    //-----------------------------  ------------------------------//

    inspect(unit) {
        //aqui debería implementar el sistema de inspeccionar unidades
        return null
    },


    update() {
        gameHandler.objectsList.forEach((object) => {
            object.render()
        })
        window.requestAnimationFrame(gameHandler.update)
    }
}