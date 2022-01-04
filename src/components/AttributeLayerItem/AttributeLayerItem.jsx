import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function AttributeLayerItem({layer, params}){

    const dispatch = useDispatch();
    const projects = useSelector(store => store.projects.selectedProjectReducer);
    const [inputAttribute, setInputAttribute] = useState('');
    const [inputRarity, setInputRarity] = useState('');

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
            <h2>{layer.layer_name}</h2>
            <input
            placeholder="Attribute Name"
            value={inputAttribute} 
            onChange={setAttribute}
            />
            <input
            placeholder="Set Rarity %"
            value={inputRarity}
            onChange={setRarity}
            />
            <button onClick={addAttribute}>Add Attribute</button>
        </div>
    )
};

export default AttributeLayerItem;