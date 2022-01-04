import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import AttributeItem from '../AttributeItem/AttributeItem.jsx';
import AttributeLayerItem from '../AttributeLayerItem/AttributeLayerItem.jsx';

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
        <div>
            {layers.map(layer =>{
                if(layer.project_id == params.id)
                return(
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
                )
            })}
            <button onClick={goToLayers}>Back To Layers</button>
            <button onClick={goToCheckInputs}>Check All Inputs</button>
        </div>
    );
};

export default Attributes;