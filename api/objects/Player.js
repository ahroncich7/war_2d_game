
module.exports = class Player {

    constructor(name) {


        this.id = Player.incrementId(),
        this.name = name,
        this.initialPosition = this.setInitialPosition()
    }


    setInitialPosition(){
        if(this.Id == 1) return {x:14, y: 10}
        if(this.Id == 2) return {x:22, y: 6}
        if(this.Id == 3) return {x:0, y: 10}
        if(this.Id == 4) return {x:10, y: 10}
    }

    static playersList = []

    static getPlayer(playerId) {
        let player = Player.playersList.find(player => player.id == playerId) 
        if(player) return player
        else console.log(`No existe la unidad con ID: ${unitId}`)         

    }

    static incrementId() {
        if (!this.latestId) this.latestId = 1
        else this.latestId++
        return this.latestId
    }

}