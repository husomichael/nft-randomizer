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
    for(let i = 0; i<project.number; i++){
        if(i == 0){
            rowArray.push('id');
            for (let layer of project.layers){
                rowArray.push(layer.layer_name);
            };
            returnArray.push(rowArray);
        };
        rowArray = [];
        rowArray.push(i + 1);
        for (let layer of project.layers){
            rarityRange = 0;
            roll = randomInt();
            for(let attribute of project.attributes){
                if(attribute.layer_id == layer.id 
                && roll > rarityRange 
                && roll <= (rarityRange + attribute.rarity_value)){
                    rowArray.push(attribute.attribute_name);
                    rarityRange+= attribute.rarity_value;
                }else if(attribute.layer_id == layer.id){
                    rarityRange += attribute.rarity_value;
                };
            };//end pushing 1 randomized attribute loop.
        };//end for of layers loop
        //***** UNIQUE CHECK BEFORE PUSH *****
        console.log('rowArray before pushString:', rowArray);
        let pushString = '';
        for(singleAttribute of rowArray){
            if(singleAttribute != rowArray[0]){
                pushString += singleAttribute;
            };
        };
        for(let oneRow of returnArray){
            let tempCheckString = '';
            for(tempAttribute of oneRow){
                if(tempAttribute != oneRow[0]){
                    tempCheckString += tempAttribute;
                };
            };
            console.log('tempCheckString', tempCheckString);
            console.log('pushString', pushString);
            if(pushString == tempCheckString){
                console.log('Duplicate found!');
            }else{
                returnArray.push(rowArray);
            };
        };//end for of returnArray uniqueness check loop.
        //Conditional can't run without first being populated.
        if (returnArray = []){
            returnArray.push(rowArray);
        };
        //push
        //returnArray.push(rowArray);
        //Reset row array for next row.
        rowArray = [];
    };//End mint number for loop
    console.log('returnArray:', returnArray);
    //Send client randomized values.
    res.send(returnArray);
});//End /random POST

module.exports = router;