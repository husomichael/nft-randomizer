import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* sendInputs(action){
    console.log('sendInputs payload:', action.payload);
    try{
        const response = axios({
            method: 'POST',
            url: '/api/random',
            data: action.payload
        })
        yield put({
            type: 'SET_RANDOM',
        })
        console.log(response);
    }catch(error){
        console.log('addLayer catch error:', error);
    };
};


function* randomSaga() {
    yield takeEvery('SEND_INPUTS', sendInputs);
};
  
export default randomSaga;