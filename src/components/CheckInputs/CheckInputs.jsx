import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Grid, Button, TextField} from '@mui/material';
import './CheckInputs.css';

function CheckInputs(){

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const layers = useSelector(store => store.layers);
    const projects = useSelector(store => store.projects);
    const attributes = useSelector(store => store.attributes);
    const [mintNumber, setMintNumber] = useState('');
    let rarities = [];

    useEffect(() =>{
        fetchLayers();
        fetchProjects();
        fetchAttributes();
    }, []);
    layers.map(layer =>{
        let layerRarity = 0;
        attributes.map(attribute => {
            if(attribute.layer_id == layer.id){
                layerRarity += attribute.rarity_value;
            };
        });
        rarities.push({layerId: layer.id, layerRarity: layerRarity})
    });

    function fetchAttributes(){
        dispatch({
            type: 'GET_ATTRIBUTES',
        });
    };

    function fetchProjects(){
        dispatch({
            type: 'GET_PROJECTS',
        });
    };

    function fetchLayers(){
        dispatch({
            type: 'GET_LAYERS',
        });
    };

    function sendInputs(){
        let inputLayers = [];
        let inputAttributes = [];
        for (let layer of layers){
            let rarityTotal = 0;
            if(layer.project_id == params.id){
                inputLayers.push(layer);
                for(let attribute of attributes){
                    if(attribute.layer_id == layer.id){
                        inputAttributes.push(attribute);
                        rarityTotal += attribute.rarity_value
                    };
                };
                if(rarityTotal != 100){
                    return alert("All rarities needs to be 100% before generating CSV");
                }
            };
        };
        dispatch({
            type: 'SEND_INPUTS',
            payload: {layers: inputLayers, attributes: inputAttributes, number: mintNumber}
        })
        console.log('in sendInputs');
        console.log('inputLayers:', inputLayers);
        console.log('inputAttributes:', inputAttributes);
        console.log('mintNumber', mintNumber);
        history.push(`/results/${params.id}`);
    };

    function handleMintNumber(event){
        setMintNumber(event.target.value);
    };

    function goToAttributes(){
        history.push(`/attributes/${params.id}`);
    };

    return(
        <div>
            <h1>Layers</h1>
            {layers.map(layer =>{
                if(layer.project_id == params.id)
                return(
                    <div key={layer.id}>
                        <h2>{layer.layer_name}</h2>
                        {attributes.map(attribute =>{
                            if(attribute.layer_id == layer.id)
                            return(
                                <div key={attribute.id}>
                                    {attribute.attribute_name} - {attribute.rarity_value}%
                                </div>
                            )
                        })}
                    </div>
                )
            })}
            <h1>Rarities</h1>
            {layers.map(layer =>{
                if(layer.project_id == params.id)
                return(
                    <div key={layer.id}>
                        <h2>{layer.layer_name}</h2>
                        {rarities.map(rarity => {
                            if(rarity.layerId == layer.id){
                                if(rarity.layerRarity == 100){
                                    return (<div class="green">{rarity.layerRarity}%</div>)
                                }else{
                                    return (<div class="red">{rarity.layerRarity}%</div>)
                                }
                            }
                        })}
                    </div>
                )
            })}
            <TextField
            placeholder="Number to Mint"
            value={mintNumber}
            onChange={handleMintNumber}
            />
            <Button variant='contained' onClick={goToAttributes}>Back To Attributes</Button>
            <Button variant='contained' onClick={sendInputs}>Generate</Button>
        </div>
    );
};

export default CheckInputs;