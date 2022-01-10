import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import AttributeItem from '../AttributeItem/AttributeItem.jsx';
import AttributeLayerItem from '../AttributeLayerItem/AttributeLayerItem.jsx';
import {Grid, Paper, Box, Button, List, ListItem} from '@mui/material';

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

    console.log(layers);
    console.log(attributes);
    return(
        <div><Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
                <Grid item xs={7}>
                    <Box><h1>Attributes and Rarities</h1></Box>
                </Grid>
                <Grid item xs={7}>
                    <Paper><p>
                        Add all of your attributes for each layer.
                        Assign the desired rarity per attribute.
                    <h4>ALL Layers must have exactly 100% rarity.</h4></p>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Box>
                    {layers.map(layer =>{
                if(layer.project_id == params.id)
                return(
                    <div key={layer.id}>
                        <AttributeLayerItem layer={layer} params={params.id} />
                        {attributes.map(attribute => {
                        if (layer.id == attribute.layer_id)
                            return(
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                    key={attribute.id}>
                                    <AttributeItem attribute={attribute} />
                                </Grid>
                            )
                        })}
                    </div>
                )
            })}
                    </Box>
                </Grid>
            </Grid>
                    <Button variant="contained" onClick={goToLayers}>Back To Layers</Button>
                    <Button variant="outlined" onClick={goToCheckInputs}>Check All Inputs</Button>
        </div>
    );
};

export default Attributes;