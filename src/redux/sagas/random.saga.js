import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* sendInputs(action){
    try{
        const response = yield axios({
            method: 'POST',
            url: '/api/random',
            data: action.payload
        })
        yield put({
            type: 'SET_RANDOM',
            payload: response.data
        })
    }catch(error){
        console.log('addLayer catch error:', error);
    };
};


function* randomSaga() {
    yield takeEvery('SEND_INPUTS', sendInputs);
};
  
export default randomSaga;