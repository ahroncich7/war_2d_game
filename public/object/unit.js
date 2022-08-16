
import { gameHandler } from "../services/gameHandler.js";
import { Cell } from "./cell.js";

export class Unit {
    Id;
    unitType;
    position;
    owner;

    constructor(id, type, owner) {

        this.Id = id;
        this.unitType = type;
        this.sprite = this.getSprite();
        this.owner = owner;
        this.position = owner.initialPosition;
        Unit.unitList.push(this);
    }


    getSprite() {
        let img = document.createElement("img")
        switch (this.unitType) {
            case "soldier":
                img.src = "images/infantry.png"
            default:
                break;
        }
        return img
    }

    render() {
        if (this.position) {
            Cell.getCell(this.position).spriteContainer.appendChild(this.sprite)
        }
    }

    moveTo(position) {

        this.setPosition(position)
        this.render()
    }


    setPosition(newPosition){
        let originPosition = this.position
        if(originPosition){
            let originCell = Cell.getCell(originPosition)
            originCell.unitInside = undefined;
            let $sprite = originCell.spriteContainer.querySelector("img");
            if($sprite){$sprite.innerHTML = ""}
        }
        let $newPosition = newPosition;
        let targetCell = Cell.getCell($newPosition);
        targetCell.unitInside = this;
        this.position = $newPosition; 
    }


    static unitList = []

    static getUnit(unitId) {
        return Unit.unitList.find(unit => unit.Id == unitId)
    }
}