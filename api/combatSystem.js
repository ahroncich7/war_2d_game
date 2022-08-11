function fight(unit1, unit2) {

    console.log(`${unit1.constructor.name} de ${unit1.owner} ha atacado a ${unit2.constructor.name} de ${unit2.owner}` )
    let u1Dice = rollDice(unit1.attackStrength);
    console.log("La unidad atacante ha sacado " + u1Dice);

    let u2Dice = rollDice(unit2.defenseStrength);
    console.log("La unidad defensora ha sacado " + u2Dice);
    let defensiveBonus = getDefensiveBonus(unit2);

    if ((u1Dice + u2Dice) > unit2.defenseStrength + defensiveBonus) {
        unit2.destroy()
        console.log("El atacante eliminó al defensor");
    } else {

    }
}

function getDefensiveBonus(unit) {
    let positionCell = grid.getCell(unit.position)
    let terrainType = positionCell.terrainType
    let bonus;
    switch (terrainType) {

        case "forest":
            if (unit.type == "ground") {
                bonus = terrainTtypeBonus.forest
            }
            break;
        
        case ("hills"):
                bonus = terrainTtypeBonus.hill
            break;

        case "river":
            if (unit.type == "ground") bonus = terrainTtypeBonus.riverCoast;
            if (unit.type == "wheeled") bonus = terrainTtypeBonus.riverCoast * 2;
            break;

        default:
            bonus = 0
            break;
    }
    return bonus
}

const terrainTtypeBonus = {
    grass: 1,
    woods: 2,
    hill: 3,
    sea: -1,
}

function rollDice(dice) {

    return (Math.floor(Math.random() * dice + 1))
}

exports.fight = fight