import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addAttribute(action){
    const selectedLayer = action.payload.layer
    console.log('addAttribute payload:', action.payload);
    try{
        const response = axios({
            method: 'POST',
            url: '/api/attributes',
            data: action.payload
        })
        yield put({
            type: 'GET_ATTRIBUTES',
            payload: selectedLayer
        })
    }catch(error){
        console.log('addAttribute catch error:', error);
    };
};

function* getAttributes(action){
    console.log('in getAttributes');
    try{
        const response = yield axios({
            method: 'GET',
            url: `/api/attributes`
        })
        yield put({
            type: 'SET_ATTRIBUTES',
            payload: response.data
        })
    }catch(error){
        console.log('getAttributes error:', error);
    };
};

function* deleteAttribute(action){
    console.log('in deleteAttribute');
    try{
        const response = yield axios({
            method: 'DELETE',
            url: `/api/attributes/${action.payload}`
        })
        yield put({
            type: 'GET_ATTRIBUTES'
        })
    }catch(error){
        console.log('deleteAttributes error:', error);
    };
};

function* attributeSaga() {
    yield takeLatest('ADD_ATTRIBUTE', addAttribute);
    yield takeLatest('GET_ATTRIBUTES', getAttributes);
    yield takeLatest('DELETE_ATTRIBUTE', deleteAttribute)
};
  
export default attributeSaga;