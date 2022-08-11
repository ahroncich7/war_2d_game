const { incrementId } = require("./Unit")

module.exports = class Player {

    constructor(name) {


        Id: incrementId()
        Name: name
        InitialPosition: { x = 0, y = 0 }
    }


    setInitialPosition(){
        if(this.Id == 1) return {x:0, y: 0}
        if(this.Id == 2) return {x:10, y: 0}
        if(this.Id == 3) return {x:3, y: 10}
        if(this.Id == 4) return {x:40, y: 10}
    }

    static players = []

    static incrementId() {
        if (!this.latestId) this.latestId = 1
        else this.latestId++
        return this.latestId
    }

}