import { serverHandler } from "../connections/serverHandler.js";
import { gameHandler } from "../services/gameHandler.js";

export class Cell {

    type;
    position;
    spriteContainer;
    isReacheable = false;

    constructor(type, position, spriteContainer) {

        this.type = type;
        this.position = position;
        this.spriteContainer = spriteContainer;
        this.unitInside = undefined
        this.spriteContainer.innerHTML =  `${position.x},${position.y}`
        Cell.cellMap.push(this);
        this.makeClickable()

    }


    render() {
        if (this.isReacheable) {
            this.spriteContainer.style.setProperty("background-color", "rgba(20, 80, 20, 0.45)")
        } else {
            this.spriteContainer.style.setProperty("background-color", "")
        }
    }

    makeClickable(){
        this.spriteContainer.addEventListener("click", (e) => {
            e.stopPropagation()
            console.log("clicked")
            this.whenClicked()
        })
    }

    whenClicked(){

        if(this.unitInside && this.unitInside.owner.Name == gameHandler.turnPlayer){
            gameHandler.selectUnit(this.unitInside)
            
        }else if (gameHandler.selectedUnit){
            let data = {
                unitId: gameHandler.selectedUnit.Id, 
                position: this.position
            }
            serverHandler.sendMoveUnitToServer(data)
            gameHandler.selectUnit(undefined)
            console.log("Envia mover unidad con datos: ", data)
            
        }else{
            console.log("No selected unit")
        }
    }




    static cellMap = []


    static getCell(position) {    
        return Cell.cellMap.find($cell => $cell.position.x == position.x && $cell.position.y == position.y )
    }



}
