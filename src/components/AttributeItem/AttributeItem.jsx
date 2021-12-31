import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

function AttributeItem({layer}){

    const dispatch = useDispatch();
    const history = useHistory();
    const [attribute, setAttribute] = useState('');
    const [rarity, setRarity] = useState('');
    const attributes = useSelector(store => store.attributes);

    useEffect(() =>{
        fetchAttributes();
    }, []);

    function fetchAttributes(){
        dispatch({
            type: 'GET_ATTRIBUTES',
            payload: layer.id
        });
    };

    // function editAttribute(){
    //     dispatch({
    //         type: 'EDIT_ATTRIBUTE',
    //         payload: layer.id
    //     });
    // };


    //TODO: Delete all references to layers, and attributes for project when deleted.
    //Find a way to conditionally render EDITING a layer.
    // function deleteAttribute(){
    //     dispatch({
    //         type: 'DELETE_ATTRIBUTE',
    //         payload: layer.id
    //     });
    // };


    function addAttribute(){
        dispatch({
            type: 'ADD_ATTRIBUTE',
            payload: attribute
        });
        setAttribute('');
    };

    function goToCheckInputs(){
        history.push('/checkinputs');
    };

    return(
        <div>
            <h2>{layer.layer_name}</h2>
            {attributes.map(attribute => {
                return(
                    <div>
                    <p>{attribute.name}</p>
                    <p>{attribute.rarity}</p>
                    </div>
                )
            })}
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
    )
};

export default AttributeItem;