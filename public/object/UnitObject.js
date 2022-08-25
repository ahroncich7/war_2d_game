import { gameHandler } from "../services/gameHandler.js";
import { Tile } from "./Tile.js";

export class UnitObject {
    id;
    unitType;
    position;
    owner;

    constructor(id, type, owner, position = undefined) {

        this.id = id;
        this.unitType = type;
        this.sprite = this.getSprite();
        this.owner = owner;
        this.position = this.moveTo(position) || this.moveTo(gameHandler.initialPosition);
        UnitObject.unitList.push(this);
    }


    getSprite() {
        let img = document.createElement("img");
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
            Tile.getCell(this.position).spriteContainer.appendChild(this.sprite)
        }
    }

    moveTo(position) {
        try {
            this.setPosition(position)
            this.render()
            return position
        }
        catch {
            return undefined
        }
    }


    setPosition(newPosition) {
        let originPosition = this.position
        if (originPosition) {
            let originCell = Tile.getCell(originPosition)
            originCell.unitInside = undefined;
            let $sprite = originCell.spriteContainer.querySelector("img");
            if ($sprite) { $sprite.innerHTML = "" }
        }
        let $newPosition = newPosition;
        let targetCell = Tile.getCell($newPosition);
        targetCell.unitInside = this;
        this.position = $newPosition;
    }


    static unitList = []

    static getUnit(unitId) {
        return this.unitList.find(unit => unit.id == unitId)
    }

    static update() {

        this.unitList.forEach(unit => unit.render())
    }
}