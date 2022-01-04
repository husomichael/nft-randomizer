import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';

function CheckInputs(){

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
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
            if(layer.project_id == params.id){
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

    function goToAttributes(){
        history.push(`/attributes/${params.id}`);
    };

    return(
        <div>
            {layers.map(layer =>{
                if(layer.project_id == params.id)
                return(
                    <div>
                        <h2 key={layer.id}>{layer.layer_name}</h2>
                        {attributes.map(attribute =>{
                            if(attribute.layer_id == layer.id)
                            return(
                                <div>
                                    {attribute.attribute_name}
                                    {attribute.rarity_value}
                                </div>
                            )
                        })}
                    </div>
                )
            })}
            <input
            placeholder="Number to Mint"
            value={mintNumber}
            onChange={handleMintNumber}
            />
            <button onClick={goToAttributes}>Back To Attributes</button>
            <button onClick={sendInputs}>Generate</button>
        </div>
    );
};

export default CheckInputs;