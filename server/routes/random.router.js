const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//Generate random number between 1 and 100.
function randomInt(){
    return Math.floor(Math.random() * 100) + 1
};

/*
This is where the magic happens.
/random POST for returning randomized values based on desired rarity.
*/
router.post('/', rejectUnauthenticated, (req, res) => {
    let project = req.body;
    let returnArray = [];
    let rowArray = [];
    let rarityRange = 0;
    let roll = 0;
    //Loop through amount to mint.
    for(let i = 0; i<project.number; i++){
        //First row is ID + Layer Names
        if(i == 0){
            rowArray.push('id');
            for (let layer of project.layers){
                rowArray.push(layer.layer_name);
            };
            returnArray.push(rowArray);
        };
        rowArray = [];
        //Push ID number.
        rowArray.push(i + 1);
        //Loop through layers.
        for (let layer of project.layers){
            //"Floor" of rarity value.
            rarityRange = 0;
            //Roll random number.
            roll = randomInt();
            //Loop through all attributes.
            for(let attribute of project.attributes){
                //If attribute is tied to layer AND within rarity range.
                if(attribute.layer_id == layer.id 
                && roll > rarityRange 
                && roll <= (rarityRange + attribute.rarity_value)){
                    //Push attribute to row.
                    rowArray.push(attribute.attribute_name);
                    //Increase floor for rarity range.
                    rarityRange+= attribute.rarity_value;
                //ELSE, If attribute is tied to layer but not within rarity range.
                }else if(attribute.layer_id == layer.id){
                    //Increase floor for rarity range.
                    rarityRange += attribute.rarity_value;
                };
            };//end pushing 1 randomized attribute loop.
        };//end for of layers loop
        /*
        ***** UNIQUE CHECK BEFORE PUSH *****
        */
        let pushString = '';
        let dupe = false;
        //Put row array into string to check against rows already pushed.
        for(singleAttribute of rowArray){
            if(singleAttribute != rowArray[0]){
                pushString += singleAttribute;
            };
        };
        //Loop through returnArray.
        for(let oneRow of returnArray){
            let tempCheckString = '';
            //Put one row of returnArray into string to check against row to be pushed.
            for(tempAttribute of oneRow){
                if(tempAttribute != oneRow[0]){
                    tempCheckString += tempAttribute;
                };
            };
            //If duplicate found, flip dupe boolean.
            //i-- to keep mint number correct.
            //break out of loop.
            if(pushString == tempCheckString){ 
                dupe = true;
                i--;
                break;
            };
        };//end for of returnArray uniqueness check loop.
        //if no duplicate, push row to returnArray.
        if (dupe == false){
            
            returnArray.push(rowArray);
        };
        //Reset row array for next row.
        rowArray = [];
    };//End mint number for loop
    //Send client randomized values.
    res.send(returnArray);
});//End /random POST

module.exports = router;