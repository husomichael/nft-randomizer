import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import {TextField, Typography, Button, Table, TableContainer, TableRow, TableCell, TableHead, Grid, Box} from '@mui/material';
import LayerItem from '../LayerItem/LayerItem.jsx';


function Layers(){

    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();
    const [inputLayer, setInputLayer] = useState('');
    const layers = useSelector(store => store.layers)
    const projects = useSelector(store => store.projects)
    const selectedProject = useSelector(store => store.selectedProject);

    useEffect(() =>{
        fetchAttributes(),
        fetchProjects(),
        fetchLayers()
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

    function addLayer(){
        dispatch({
            type: 'ADD_LAYER',
            payload: {layer: inputLayer, project: params.id}
        });
        setInputLayer('');
    };

    function goToAttributes(){
        history.push(`/attributes/${params.id}`);
    };

    function setLayers(event){
        setInputLayer(event.target.value);
    };

    function goToProjects(){
        history.push('/projects');
    };
    console.log('selectedproject:', selectedProject);
    return(
        <div>
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="0vh"
            >
            <Typography variant="h2" component="div" >
            Insert all of your projects layers.
            </Typography>
            </Box>
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="0vh"
            paddingTop="0"
            marginTop="0"
            >
            <Typography variant="subtitle1" component="div" >
                <i>Note: Make sure the layer names are identical to your photoshop project's layer names.</i>
            </Typography>
            </Box>
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="45vh"
            >
            <TableContainer style={{maxWidth: 800}} 
            textalign="center">
                <Table>
                <TableHead>
                        <TableRow>
                            <TableCell 
                            align="center"
                            sx={{fontSize: 35}}
                            >
                                Your Layers
                            </TableCell>
                        </TableRow>
                    </TableHead>
                                {layers.map(layer =>{
                                    if(layer.project_id == params.id)
                                    return(
                                        <TableRow key={layer.id}>
                                            <LayerItem layer={layer} />
                                        </TableRow>
                                    )
                                })}
                </Table>
            </TableContainer>
            </Box>
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="10vh"
            >
            <TextField 
            placeholder="Add a Layer" 
            value={inputLayer} 
            onChange={setLayers}
            sx={{width: 250, mr: 5, color: '#00ADB5', borderColor: '#00ADB5'}}
            />
            <Button variant='outlined' 
            onClick={addLayer}
            sx={{color: '#00ADB5', borderColor: '#00ADB5', height: 55}}
            >
                Add Layer
            </Button>
            </Box>
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="0vh"
            >
            <Button variant='outlined' 
            onClick={goToProjects}
            sx={{mr: 20, color: '#00ADB5', borderColor: '#00ADB5', height: 55}}
            >
                Back To Projects
            </Button>
            <Button variant='outlined' 
            onClick={goToAttributes}
            sx={{ml: 20, color: '#5DBB63', borderColor: '#5DBB63', height: 55}}
            >
                Next To Attributes
            </Button>
            </Box>
        </div>
    );
};

export default Layers;