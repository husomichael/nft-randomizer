import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

function AttributeLayerItem({layer}){

    const dispatch = useDispatch();
    const history = useHistory();
    const attributes = useSelector(store => store.attributes);
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
            payload: {attribute: inputAttribute, rarity: inputRarity, layer: layer.id, project: projects}
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