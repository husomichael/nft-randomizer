import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import {Button, TextField} from '@mui/material';
import LayerItem from '../LayerItem/LayerItem.jsx';


function Layers(){

    //TODO:
    //Rewrite routes to fill reducer, and base maps on reducer values rather than sql statements.
    //Setup attributeItem routes to do the same.

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
            <p>Insert all of your projects layers. Note: Make sure the layer names are identical to your photoshop project's layer names.</p>
            <TextField 
            placeholder="Add Layer" 
            value={inputLayer} 
            onChange={setLayers}
            />
            <Button variant='contained' onClick={addLayer}>Add Layer</Button>
            {layers.map(layer =>{
                if(layer.project_id == params.id)
                return(
                    <div key={layer.id}>
                        <LayerItem layer={layer} />
                    </div>
                )
            })}
            <Button variant='contained' onClick={goToProjects}>Back To Projects</Button>
            <Button variant='contained' onClick={goToAttributes}>Next To Attributes</Button>
        </div>
    );
};

export default Layers;