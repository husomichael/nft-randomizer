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

    useEffect(() =>{
        fetchAttributes();
    }, []);

    function fetchAttributes(){
        dispatch({
            type: 'GET_ATTRIBUTES',
        });
    };

    console.log(layers);
    return(
        <div>
            {layers.map(layer =>{
                return(
                    <div key={layer.id}>
                        <AttributeItem layer={layer} />
                    </div>
                )
            })}
        </div>
    );
};

export default Attributes;