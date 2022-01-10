import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {List, ListItem, Button, Grid} from '@mui/material';

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
            <Grid item xs={12}>
                <b>{attribute.attribute_name}  {attribute.rarity_value}%</b>
                <Button onClick={() => history.push(`/editattribute/${attribute.id}`)}>Edit</Button>
                <Button onClick={deleteAttribute}>Delete</Button>
            </Grid>
    )
};

export default AttributeItem;