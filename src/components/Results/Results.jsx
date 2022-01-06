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

    //Randomized data from server. Format: Array of Arrays of Strings.
    const random = useSelector(store => store.random);

    //Convert array of arrays of strings to CSV format.
    function arrayToCsv(data){
        return data.map(row =>
        row
        .map(String)  // convert every value to String
        .map(v => v.replaceAll('"', '""'))  // escape double colons
        .map(v => `"${v}"`)  // quote it
        .join(',')  // comma-separated
        ).join('\r\n');  // rows starting on new lines
    };

    //create csv variable with the convert function.
    let csv = arrayToCsv(random);

    //Download csv as a file.
    function downloadBlob(content, filename, contentType) {
        // Create a blob
        var blob = new Blob([content], { type: contentType });
        var url = URL.createObjectURL(blob);

        // Create a link to download it
        var pom = document.createElement('a');
        pom.href = url;
        pom.setAttribute('download', filename);
        pom.click();
    };

    function goToCheckInputs(){
        history.push(`/checkinputs/${params.id}`);
    };

    function downloadCsv(){

    }

    return(
        <div>
            <button onClick={() => downloadBlob(csv, 'export.csv', 'text/csv;charset=utf-8;')}>Download CSV</button>
            <button onClick={goToCheckInputs}>Back To CheckInputs</button>
        </div>
    );
};

export default CheckInputs;