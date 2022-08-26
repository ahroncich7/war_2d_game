import { whenClicked } from "../services/mouseController.js";

export class Tile {

    type;
    position;
    spriteContainer;
    unitInside;
    isReachable = false;

    constructor(type, position, spriteContainer) {

        this.type = type;
        this.position = position;
        this.spriteContainer = spriteContainer;
        this.unitInside = undefined
        this.spriteContainer.innerHTML = `${position.x},${position.y}`
        Tile.tileMap.push(this);
        this.makeClickable()
    }


    render() {
        if (this.isReachable) {
            this.spriteContainer.style.setProperty("background-color", "rgba(20, 80, 20, 0.45)")
        } else {
            this.spriteContainer.style.setProperty("background-color", "")
        }

        if(this.unitInside){
            this.spriteContainer.innerHTML = `
            <img src=../images/${this.unitInside.sprite}></img>    
            `
        }else{
            this.spriteContainer.innerHTML = `${this.position.x},${this.position.y}`
        }
    }

    makeClickable() {
        this.spriteContainer.addEventListener("click", (e) => {
            e.stopPropagation()
            whenClicked(this)
        })
    }


    static tileMap = []


    static getCell(position) {
        return Tile.tileMap.find($cell => $cell.position.x == position.x && $cell.position.y == position.y)
    }

}
