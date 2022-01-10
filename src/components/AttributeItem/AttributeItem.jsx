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
            <li>{attribute.attribute_name}  {attribute.rarity_value}%</li>
            <button onClick={() => history.push(`/editattribute/${attribute.id}`)}>Edit</button>
            <button onClick={deleteAttribute}>Delete</button>
        </div>
    )
};

export default AttributeItem;