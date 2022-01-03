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
    console.log('attributes:', attributes);
    console.log('projects:', projects);
    console.log('layers:', layers);

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

    function generateCsv(){
        dispatch({
            TYPE: 'GENERATE_CSV',
            // payload: {project: projects}
        })
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
            onChange={handleMintNumber}
            />
            <button onClick={generateCsv}>Generate</button>
        </div>
    );
};

export default CheckInputs;