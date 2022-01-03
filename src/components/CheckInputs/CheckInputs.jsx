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

    function generateCsv(){
        console.log('in generateCsv');
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
            onChange={setMintNumber}
            />
            <button onClick={generateCsv}>Generate</button>
        </div>
    );
};

export default CheckInputs;