import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import AttributeItem from '../AttributeItem/AttributeItem.jsx';
import AttributeLayerItem from '../AttributeLayerItem/AttributeLayerItem.jsx';

function Attributes(){

    const [selectedLayer, setSelectedLayer] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const layers = useSelector(store => store.layers);
    const projects = useSelector(store => store.projects);
    const attributes = useSelector(store => store.attributes);
    const [inputAttribute, setInputAttribute] = useState('');
    const [inputRarity, setInputRarity] = useState('');

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

    function setAttribute(event){
        setInputAttribute(event.target.value);
    };

    function setRarity(event){
        setInputRarity(event.target.value);
    };


    function addAttribute(){
        dispatch({
            type: 'ADD_ATTRIBUTE',
            payload: {attribute: attribute, rarity: rarity, layer: layer.id, project: projects}
        });
        setAttribute('');
        setRarity('');
    };

    console.log(layers);
    console.log(attributes);
    return(
        <div>
            {layers.map(layer =>{
                if(layer.project_id == projects.selectedProjectReducer)
                return(
                    <div key={layer.id}>
                        <AttributeLayerItem layer={layer} />
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