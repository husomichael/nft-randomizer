import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import AttributeItem from '../AttributeItem/AttributeItem.jsx';
import AttributeLayerItem from '../AttributeLayerItem/AttributeLayerItem.jsx';
import {Grid, Paper, Box, Button, List, ListItem} from '@mui/material';
import './Attributes.css';

function Attributes(){

    const dispatch = useDispatch();
    const history = useHistory();
    const layers = useSelector(store => store.layers);
    const attributes = useSelector(store => store.attributes);
    const params = useParams();

    useEffect(() =>{
        fetchProjects();
        fetchAttributes();
        fetchLayers();
    }, []);

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

    function goToCheckInputs(){
        history.push(`/checkinputs/${params.id}`);
    };

    function goToLayers(){
        history.push(`/layers/${params.id}`);
    };

    return(
            <div>
            <h1>Attributes and Rarities</h1>
            <p>
            Add all of your attributes for each layer.
            Assign the desired rarity per attribute.
            <b>ALL Layers must have exactly 100% rarity.</b>
            </p>
            <Grid container direction="row" spacing={4}>
                {layers.map(layer =>{
                if(layer.project_id == params.id)
                return(
                    <Grid item>
                    <div key={layer.id}>
                        <AttributeLayerItem layer={layer} params={params.id} />
                        {attributes.map(attribute => {
                            if (layer.id == attribute.layer_id)
                            return(
                                <div key={attribute.id}>
                                    <AttributeItem attribute={attribute} />
                                </div>
                            )
                        })}
                    </div>
                    </Grid>
                    )
                })}
            </Grid>
                <Button variant="contained" onClick={goToLayers}>Back To Layers</Button>
                <Button variant="contained" onClick={goToCheckInputs}>Check All Inputs</Button>
        </div>
    );
};

export default Attributes;