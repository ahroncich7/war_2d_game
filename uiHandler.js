var uiHandler = {
    deleteUnit() {
        let unit = gameHandler.selectedUnit;
        if (unit && unit.owner == gameHandler.ownerTurn) {
            gameHandler.deleteObject(gameHandler.selectedUnit);
            gameHandler.unselectAll();
        }

    },

    addUnit() {
        socket.emit("getNewUnit", { type: "ground", owner: gameHandler.ownerTurn, position: { x: 0, y: 0 } })
    },
}