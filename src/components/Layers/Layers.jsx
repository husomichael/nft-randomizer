import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';


function Layers(){

    const history = useHistory();
    const dispatch = useDispatch();
    // const params = useParams();
    const [inputLayer, setInputLayer] = useState('');
    const layers = useSelector(store => store.layers)
    const projects = useSelector(store => store.projects)

    useEffect(() =>{
        fetchLayers();
    }, []);
    
    function fetchLayers(){
        dispatch({
            type: 'GET_LAYERS',
            payload: projects.selectedProjectReducer
        });
    };

    function addLayer(){
        dispatch({
            type: 'ADD_LAYER',
            payload: {layer: inputLayer, project: projects.selectedProjectReducer}
        });
        setInputLayer('');
    };

    function goToAttributes(){
        history.push('/attributes');
    };

    function setLayers(event){
        setInputLayer(event.target.value);
    };

    function goToProjects(){
        history.push('/projects');
    };

    return(
        <div>
            <p>Insert all of your projects layers. Note: Make sure the layer names are identical to your photoshop project's layer names.</p>
            <input 
            placeholder="Add Layer" 
            value={inputLayer} 
            onChange={setLayers}
            />
            <button onClick={addLayer}>Add Layer</button>
            {layers.map(layer =>{
                return(
                    <div>{layer.layer_name}</div>
                )
            })}
            <button onClick={goToProjects}>Back To Projects</button>
            <button onClick={goToAttributes}>Next To Attributes</button>
        </div>
    );
};

export default Layers;