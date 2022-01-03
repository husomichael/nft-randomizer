import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import AttributeItem from '../AttributeItem/AttributeItem.jsx';

function CheckInputs(){

    const dispatch = useDispatch();
    const history = useHistory();
    const layers = useSelector(store => store.layers);
    const projects = useSelector(store => store.projects);
    const attributes = useSelector(store => store.attributes);
    const [mintNumber, setMintNumber] = useState('');
    console.log('attributes:', attributes);
    console.log('projects:', projects);
    console.log('layers:', layers);

    useEffect(() =>{
        fetchLayers();
        fetchProjects();
        fetchAttributes();
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

    function sendInputs(){
        let inputLayers = [];
        let inputAttributes = [];
        for (let layer of layers){
            if(layer.project_id == projects.selectedProjectReducer){
                inputLayers.push(layer);
                for(let attribute of attributes){
                    if(attribute.layer_id == layer.id){
                        inputAttributes.push(attribute);
                    };
                };
            };
        };
        dispatch({
            type: 'SEND_INPUTS',
            payload: {layers: inputLayers, attributes: inputAttributes, number: mintNumber}
        })
        console.log('in sendInputs');
        console.log('inputLayers:', inputLayers);
        console.log('inputAttributes:', inputAttributes);
        console.log('mintNumber', mintNumber);
    };

    function handleMintNumber(event){
        setMintNumber(event.target.value);
    };

    return(
        <div>
            {/* append layers */}
            {/* append attributes and their rarities */}
            <input
            placeholder="Number to Mint"
            value={mintNumber}
            onChange={handleMintNumber}
            />
            <button onClick={sendInputs}>Generate</button>
        </div>
    );
};

export default CheckInputs;