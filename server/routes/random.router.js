const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//Generate random number between 1 and 100.
function randomInt(){
    return Math.floor(Math.random() * 100) + 1
};

//POST details for randomization.
router.post('/', (req, res) => {
    let project = req.body;
    let returnArray = [];
    let rowArray = [];
    let rarityRange = 0;
    let roll = 0;
    let attributesForLayer = [];
    for(let i = 0; i<project.number; i++){
        for (let layer of project.layers){
            rarityRange = 0;
            attributesForLayer = [];
            roll = randomInt();

            for(let attribute of project.attributes){
                if(attribute.layer_id == layer.id){
                    attributesForLayer.push(attribute);
                };
            };//end for of all attributes filter for layer loop

            for(let selectedAttribute of attributesForLayer){
                if(roll > rarityRange && roll <= (rarityRange + selectedAttribute.rarity_value)){
                    rowArray.push(selectedAttribute.attribute_name);
                    rarityRange+= selectedAttribute.rarity_value
                }else{
                    rarityRange += selectedAttribute.rarity_value;
                };
            };//end for of selectedAttribute loop.

        };//end for of layers loop
        returnArray.push(rowArray);
        rowArray = [];
    };//End mint number for loop
    console.log('returnArray:', returnArray);
}); // End /random POST

module.exports = router;