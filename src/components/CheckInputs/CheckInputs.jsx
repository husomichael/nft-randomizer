import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';

function CheckInputs(){

    const dispatch = useDispatch();
    const history = useHistory();
    const layers = useSelector(store => store.layers);
    const [mintNumber, setMintNumber] = useState('');

    function generateCsv(){
        console.log('in generateCsv');
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