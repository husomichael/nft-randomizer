import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import AttributeItem from '../AttributeItem/AttributeItem.jsx';
import AttributeLayerItem from '../AttributeLayerItem/AttributeLayerItem.jsx';
import {Grid, Box, Button, Typography, Table, TableContainer} from '@mui/material';
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
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="0vh"
                sx={{mt: 9}}
            >
                <Typography 
                    variant="h2" 
                    component="div" 
                >
                    Attributes and Rarities
                </Typography>
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="0vh"
            >
                <Typography 
                    variant="subtitle1" 
                    component="div" 
                >
                    Add all of your attributes for each layer.
                    Assign the desired rarity per attribute.
                </Typography>
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="0vh"
            >
                <Typography 
                    variant="subtitle1" 
                    component="div" 
                >
                    <b>ALL Layers must have exactly 100% rarity.</b>
                </Typography>
            </Box>
            <Grid 
                container direction="row"
                spacing={0}
                sx={{ml: 12}}
            >
                {layers.map(layer =>{
                    if(layer.project_id == params.id)
                    return(
                        <Grid 
                            item xs={4}
                        >
                            <TableContainer  
                                textalign="center"
                            >
                                <Table>
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
                                </Table>
                            </TableContainer>
                        </Grid>
                    )
                })}
            </Grid>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="10vh"
            >
                <Button 
                    variant="outlined" 
                    onClick={goToLayers}
                    sx={{height: 55, color: '#00ADB5', borderColor: '#00ADB5', mr: 45,}}
                >
                    Back To Layers
                </Button>
                <Button 
                    variant="outlined" 
                    onClick={goToCheckInputs}
                    sx={{height: 55, color: '#5DBB63', borderColor: '#5DBB63'}}
                >
                    Check All Inputs
                </Button>
            </Box>
        </div>
    );
};

export default Attributes;