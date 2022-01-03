import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

function AttributeItem({attribute}){

    const dispatch = useDispatch();
    const history = useHistory();
    const [inputAttribute, setInputAttribute] = useState('');
    const [inputRarity, setInputRarity] = useState('');
    const attributes = useSelector(store => store.attributes);
    const projects = useSelector(store => store.projects.selectedProjectReducer)

    // function editAttribute(){
    //     dispatch({
    //         type: 'EDIT_ATTRIBUTE',
    //         payload: layer.id
    //     });
    // };


    //Find a way to conditionally render EDITING an attribute.
    // function deleteAttribute(){
    //     dispatch({
    //         type: 'DELETE_ATTRIBUTE',
    //         payload: attribute.id
    //     });
    // };
    console.log('attributes: ', attributes);

    function setAttribute(event){
        setInputAttribute(event.target.value);
    };

    function setRarity(event){
        setInputRarity(event.target.value);
    };

    function deleteAttribute(){
        dispatch({
            type: 'DELETE_ATTRIBUTE',
            payload: attribute.id
        });
    };

    function editAttribute(){
        // dispatch({
        //     type: 'EDIT_ATTRIBUTE',
        //     payload:
        // });
    };

    function addAttribute(){
        dispatch({
            type: 'ADD_ATTRIBUTE',
            payload: {attribute: attribute, rarity: rarity, layer: layer.id, project: projects}
        });
        setAttribute('');
        setRarity('');
    };

    return(
        <div>
            {/* <h3>Total Layer Rarity (Needs to be %100) </h3> TODO: {find a way to total up rarities per layers here
            Limit user to having values = 100% for all attributes per layer.}*/} 
            <li>{attribute.attribute_name}  {attribute.rarity_value}</li>
            <button onClick={editAttribute}>Edit</button>
            <button onClick={deleteAttribute}>Delete</button>
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

export default AttributeItem;