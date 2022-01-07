import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

function LayerItem({layer}){

    const dispatch = useDispatch();
    const history = useHistory();
    
    //Find a way to conditionally render EDITING a layer.
    function deleteLayer(){
        dispatch({
            type: 'DELETE_LAYER',
            payload: layer.id
        });
    };

    return(
        <div>
            {layer.layer_name}
            <button onClick={() => history.push(`/editlayer/${layer.id}`)}>Edit</button>
            <button onClick={deleteLayer}>Delete</button>
        </div>
    )
};

export default LayerItem;