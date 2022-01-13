import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Grid, Typography, TablePagination, Paper, Box, Button, List, ListItem, TextField, TableContainer, Table, TableRow, TableCell, TableHead, TableBody} from '@mui/material';
import './CheckInputs.css';

function CheckInputs(){

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const layers = useSelector(store => store.layers);
    const projects = useSelector(store => store.projects);
    const attributes = useSelector(store => store.attributes);
    const [mintNumber, setMintNumber] = useState('');
    let rarities = [];

    useEffect(() =>{
        fetchLayers();
        fetchProjects();
        fetchAttributes();
    }, []);
    layers.map(layer =>{
        let layerRarity = 0;
        attributes.map(attribute => {
            if(attribute.layer_id == layer.id){
                layerRarity += attribute.rarity_value;
            };
        });
        rarities.push({layerId: layer.id, layerRarity: layerRarity})
    });

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

    function sendInputs(){
        let inputLayers = [];
        let inputAttributes = [];
        for (let layer of layers){
            let rarityTotal = 0;
            if(layer.project_id == params.id){
                inputLayers.push(layer);
                for(let attribute of attributes){
                    if(attribute.layer_id == layer.id){
                        inputAttributes.push(attribute);
                        rarityTotal += attribute.rarity_value
                    };
                };
                if(rarityTotal != 100){
                    return alert("All rarities needs to be 100% before generating CSV");
                }
            };
        };
        dispatch({
            type: 'SEND_INPUTS',
            payload: {layers: inputLayers, attributes: inputAttributes, number: mintNumber}
        })
        history.push(`/results/${params.id}`);
    };

    function handleMintNumber(event){
        setMintNumber(event.target.value);
    };

    function goToAttributes(){
        history.push(`/attributes/${params.id}`);
    };

    return(
        <div>
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="11vh"
            >
            <Typography variant="h2" component="div" >
                Layers
            </Typography>
            </Box>
                <Table>
                    <Grid 
                    container direction="row" 
                    spacing={30} 
                    justifyContent={'center'}
                    align-items={'center'}
                    >
                    {layers.map(layer =>{
                        if(layer.project_id == params.id)
                        return(
                            <Grid item
                            xs={1}
                            key={layer.id}>
                                <TableHead>
                                    <TableRow key={layer.id}>
                                        <TableCell>
                                            {layer.layer_name}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {attributes.map(attribute =>{
                                    if(attribute.layer_id == layer.id)
                                    return(
                                        <TableRow key={attribute.id}>
                                            <TableCell>
                                                {attribute.attribute_name}
                                            </TableCell>
                                            <TableCell>
                                                {attribute.rarity_value}%
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                                </TableBody>
                            </Grid>
                        )
                    })}
                    </Grid>
                </Table>
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="10vh"
            >
            <Typography variant="h2" component="div" >
                Rarities
             </Typography>
            </Box>
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="0vh"
            sx={{ml: 36}}
            >
            <TableContainer style={{maxWidth: 1200}} 
            textalign="center">
                <Table>
                    {layers.map(layer =>{
                    if(layer.project_id == params.id)
                    return(
                    <TableRow key={layer.id}>
                        <TableCell>{layer.layer_name}</TableCell>
                        {rarities.map(rarity => {
                            if(rarity.layerId == layer.id){
                                if(rarity.layerRarity == 100){
                                    return (<TableCell class="green">{rarity.layerRarity}%</TableCell>)
                                }else{
                                    return (<TableCell class="red">{rarity.layerRarity}%</TableCell>)
                                }
                            }
                        })}
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
            minHeight="11vh"
            >
                <Button variant='outlined' 
                onClick={goToAttributes}
                sx={{height: 55, color: '#00ADB5', borderColor: '#00ADB5', mr: 35,}}>
                    Back To Attributes
                </Button>
                <TextField
                placeholder="Number to Mint"
                value={mintNumber}
                onChange={handleMintNumber}
                type="number"
                sx={{width: 250, mr: 2}}
                />
                <Button variant='outlined' 
                onClick={sendInputs}
                sx={{mr: 9, height: 55, color: '#5DBB63', borderColor: '#5DBB63'}}>
                    Generate
                </Button>
            </Box>
        </div>
    );
};

export default CheckInputs;