import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {TextField, Button, Table, TableContainer, TableRow, TableCell, TableHead, Grid, Box} from '@mui/material';

function AttributeLayerItem({layer, params}){

    const dispatch = useDispatch();
    const attributes = useSelector (store => store.attributes);
    const [inputAttribute, setInputAttribute] = useState('');
    const [inputRarity, setInputRarity] = useState('');
    let layerRarity = 0;

    {attributes.map(attribute => {
        if(attribute.layer_id == layer.id){
            layerRarity += attribute.rarity_value;
        };
    })}

    function rarityCheck(){
        if(layerRarity == 100){
            return (<h1 class="green">Total Rarity: {layerRarity}%</h1>)
        }else{
            return (<h1 class="red">Total Rarity: {layerRarity}%</h1>)
        }
    }


    function setAttribute(event){
        setInputAttribute(event.target.value);
    };

    function setRarity(event){
        setInputRarity(event.target.value);
    };

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
            <TableRow style={{minWidth: 400}}>
                <TableCell
                align="left"
                sx={{minWidth: 200}}>
                    <h1>{layer.layer_name}</h1>
                </TableCell>
                <TableCell
                colSpan={4}
                align="right"
                sx={{minWidth: 200, pr: 12}}>
                    {rarityCheck()}
                </TableCell>
            </TableRow>
            <TableRow style={{minWidth: 400}}>
                <TableCell>
                    <TextField
                    placeholder="Add a Attribute"
                    value={inputAttribute}
                    onChange={setAttribute}
                    sx={{minWidth: 100}}
                    />
                </TableCell>
                <TableCell
                align="center">
                    <TextField
                    type="number"
                    placeholder="Set Rarity %"
                    value={inputRarity}
                    onChange={setRarity}
                    sx={{minWidth: 100, pl: 2}}
                    />
                </TableCell>
                <TableCell
                align="right">
                    <Button variant="outlined" 
                    onClick={addAttribute}
                    sx={{height: 50, color: '#00ADB5', borderColor: '#00ADB5', mr: 10}}>
                        Add Attribute
                        </Button>
                </TableCell>
            </TableRow>
        </div>
    )
};

export default AttributeLayerItem;