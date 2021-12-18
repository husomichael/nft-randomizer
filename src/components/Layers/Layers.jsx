import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';


function Layers(){

    const history = useHistory();
    const dispatch = useDispatch();
    const [inputLayer, setInputLayers] = useState('');

    function addLayer(){
        dispatch({
            type: 'ADD_LAYER',
            payload: inputLayer
        });
        setInputLayers('');
    };

    function goToAttributes(){
        history.push('/attributes');
    };

    return(

        <div>
            <p>Insert all of your projects layers. Note: Make sure the layer names are identical to your photoshop project's layer names.</p>
            <input 
            placeholder="Add Layer" 
            value={inputLayer} 
            onChange={setInputLayers}
            />
            <button onClick={addLayer}>+</button>
            <span>Appended layers go here.</span>
            <button onClick={goToAttributes}>Go To Attributes</button>
        </div>
    );
};

export default Layers;