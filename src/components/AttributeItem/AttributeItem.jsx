import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

function AttributeItem({attribute}){

    const dispatch = useDispatch();
    const history = useHistory();
    const attributes = useSelector(store => store.attributes);
    const projects = useSelector(store => store.selectedProject);

    function deleteAttribute(){
        dispatch({
            type: 'DELETE_ATTRIBUTE',
            payload: attribute.id
        });
    };

    return(
        <div>
            {/* <h3>Total Layer Rarity (Needs to be %100) </h3> TODO: {find a way to total up rarities per layers here
            Limit user to having values = 100% for all attributes per layer.}*/} 
            <li>{attribute.attribute_name}  {attribute.rarity_value}%</li>
            <button onClick={() => history.push(`/editattribute/${attribute.id}`)}>Edit</button>
            <button onClick={deleteAttribute}>Delete</button>
        </div>
    )
};

export default AttributeItem;