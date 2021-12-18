import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addLayer(action){
    console.log('addLayer payload:', action.payload);
    try{
        const response = axios({
            method: 'POST',
            url: '/api/layers',
            payload: {layer: action.payload}
        })
        yield put({
            type: 'SET_LAYERS'
        })
    }catch(error){
        console.log('addLayer catch error:', error);
    };
};

function* layerSaga() {
    yield takeLatest('ADD_LAYER', addLayer);
};
  
export default layerSaga;