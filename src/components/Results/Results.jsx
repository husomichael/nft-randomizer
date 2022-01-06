import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';

function CheckInputs(){

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const layers = useSelector(store => store.layers);
    const projects = useSelector(store => store.projects);
    const attributes = useSelector(store => store.attributes);
    const random = useSelector(store => store.random);


    function goToCheckInputs(){
        history.push(`/checkinputs/${params.id}`);
    };

    function downloadCsv(){
        
    }

    return(
        <div>
            <button onClick={downloadCsv}>Download as CSV</button>
            <button onClick={goToCheckInputs}>Back To CheckInputs</button>
        </div>
    );
};

export default CheckInputs;