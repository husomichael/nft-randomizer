import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import AttributeItem from '../AttributeItem/AttributeItem.jsx';

function Attributes(){

    const [attribute, setAttribute] = useState('');
    const [rarity, setRarity] = useState('');
    const [selectedLayer, setSelectedLayer] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const layers = useSelector(store => store.layers);
    const projects = useSelector(store => store.projects);
    const attributes = useSelector(store => store.attributes);

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
        history.push('/checkinputs');
    };

    console.log(layers);
    return(
        <div>
            {layers.map(layer =>{
                if(layer.project_id == projects.selectedProjectReducer)
                return(
                    <div key={layer.id}>
                        <h2>{layer.layer_name}</h2>
                        {attributes.map(attribute => {
                        if (layer.id == attribute.layer_id)
                            return(
                                <div key={attribute.id}><AttributeItem attribute={attribute} /></div>
                            )
                        })}
                    </div>
                )
            })}
            <button onClick={goToCheckInputs}>Check All Inputs</button>
        </div>
    );
};

export default Attributes;