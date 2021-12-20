import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';

function Attributes(){

    const [attribute, setAttribute] = useState('');
    const [rarity, setRarity] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();

    function addAttribute(){
        dispatch({
            type: 'ADD_ATTRIBUTE',
            payload: attribute
        });
        setAttribute('');
    };

    return(
        <div>
            {/* Append all layers here. */}
            <input 
            placeholder="Attribute Name"
            value={attribute} 
            onChange={setAttribute}
            />
            <input
            placeholder="Set Rarity %"
            value={rarity}
            onChange={setRarity}
            />
            <button onClick={addAttribute}>Add Attribute</button>
            <button onClick={goToCheckInputs}>Check All Inputs</button>
        </div>
    );
};

export default Attributes;