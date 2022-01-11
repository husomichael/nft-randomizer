import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {TextField, Button, Grid} from '@mui/material';

function AttributeLayerItem({layer, params}){

    const dispatch = useDispatch();
    const [inputAttribute, setInputAttribute] = useState('');
    const [inputRarity, setInputRarity] = useState('');
    const attributes = useSelector (store => store.attributes);
    let layerRarity = 0;

    function setAttribute(event){
        setInputAttribute(event.target.value);
    };

    function setRarity(event){
        setInputRarity(event.target.value);
    };

    {attributes.map(attribute => {
        if(attribute.layer_id == layer.id){
            layerRarity += attribute.rarity_value;
        };
    })}

    function rarityCheck(){
        if(layerRarity == 100){
            return (<h3 class="green">Total Rarity: {layerRarity}%</h3>)
        }else{
            return (<h3 class="red">Total Rarity: {layerRarity}%</h3>)
        }
    }


    function addAttribute(){
        dispatch({
            type: 'ADD_ATTRIBUTE',
            payload: {attribute: inputAttribute, rarity: inputRarity, layer: layer.id, project: params}
        });
        setInputAttribute('');
        setInputRarity('');
    };

    return(
        <div>
            <Grid
            container direction="row"
            spacing={5}
            justifyContent={'space-between'}
            align-items={'center'}
            >   
                <Grid item>
                    <h2>Layer - {layer.layer_name}</h2>
                    {rarityCheck()}
                </Grid>
                <Grid item>
                <TextField
                placeholder="Attribute Name"
                value={inputAttribute} 
                onChange={setAttribute}
                />
                <TextField
                placeholder="Set Rarity %"
                value={inputRarity}
                onChange={setRarity}
                />
                </Grid>
                <Grid item>
                <Button variant="contained" onClick={addAttribute}>Add Attribute</Button>
                </Grid>
            </Grid>
        </div>
    )
};

export default AttributeLayerItem;