var uiHandler = {

    
    deleteUnit() {
        let unit = gameHandler.selectedUnit;
        if (unit && unit.owner == gameHandler.ownerTurn) {
            serverHandler.sendDestroyUnitToServer(unit.id);
            gameHandler.unselectAll();
        }

    },

    addUnit() {
        serverHandler.sendCreateNewUnitToServer({type:"ground", owner: gameHandler.ownerTurn ,position: gameHandler.playerHome})
    },
}

document.getElementById("add-unit").addEventListener("click", uiHandler.addUnit)
document.getElementById("delete-unit").addEventListener("click", uiHandler.deleteUnit) 

