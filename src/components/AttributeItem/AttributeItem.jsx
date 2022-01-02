import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

function AttributeItem({layer}){

    const dispatch = useDispatch();
    const history = useHistory();
    const [attribute, setAttribute] = useState('');
    const [rarity, setRarity] = useState('');
    const attributes = useSelector(store => store.attributes);

    // function editAttribute(){
    //     dispatch({
    //         type: 'EDIT_ATTRIBUTE',
    //         payload: layer.id
    //     });
    // };


    //TODO: Delete all references to layers, and attributes for project when deleted.
    //Find a way to conditionally render EDITING a layer.
    // function deleteAttribute(){
    //     dispatch({
    //         type: 'DELETE_ATTRIBUTE',
    //         payload: layer.id
    //     });
    // };
    console.log('attributes: ', attributes);

    function setInputAttribute(event){
        setAttribute(event.target.value);
    };

    function setInputRarity(event){
        setRarity(event.target.value);
    };

    function addAttribute(){
        dispatch({
            type: 'ADD_ATTRIBUTE',
            payload: {attribute: attribute, rarity: rarity, layer: layer.id}
        });
        setAttribute('');
        setRarity('');
    };

    function goToCheckInputs(){
        history.push('/checkinputs');
    };

    return(
        <div>
            <h2>{layer.layer_name}</h2>
            {/* <h3>Total Layer Rarity (Needs to be %100) </h3> {find a way to total up rarities per layers here}*/} 
            {attributes.map(attribute => {
                if (layer.id == attribute.layer_id)
                return(
                    <div>
                    <li>{attribute.attribute_name}  {attribute.rarity_value}</li>
                    </div>
                )
            })}
            <input
                placeholder="Attribute Name"
                value={attribute} 
                onChange={setInputAttribute}
            />
            <input
                placeholder="Set Rarity %"
                value={rarity}
                onChange={setInputRarity}
            />
            <button onClick={addAttribute}>Add Attribute</button>
            <button onClick={goToCheckInputs}>Check All Inputs</button>
        </div>
    )
};

export default AttributeItem;