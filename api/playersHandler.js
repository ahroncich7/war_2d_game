module.exports = playersHandler = {

    playersNumber: 0,
    playersList: [],


    setNewPlayer(playerName = "Player" + (this.playersNumber + 1)) {
        this.playersNumber++
        let x = (this.playersNumber - 1) * 7
        let player = {
            playerId: this.playersNumber,
            playerName: playerName,
            playerHome: {x: x, y:0},
        
        }

        this.playersList.push(player)
        return player
    }



}