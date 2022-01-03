import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addLayer(action){
    const selectedProject = action.payload.project
    console.log('addLayer payload:', action.payload);
    try{
        const response = axios({
            method: 'POST',
            url: '/api/layers',
            data: action.payload
        })
        yield put({
            type: 'GET_LAYERS',
            payload: selectedProject
        })
    }catch(error){
        console.log('addLayer catch error:', error);
    };
};

function* getLayers(action){
    console.log('in getLayers');
    try{
        const response = yield axios({
            method: 'GET',
            url: '/api/layers'
        })
        yield put({
            type: 'SET_LAYERS',
            payload: response.data
        })
    }catch(error){
        console.log('getLayers error:', error);
    };
};

function* deleteLayer(action){
    console.log('in deleteLayer');
    try{
        const response = yield axios({
            method: 'DELETE',
            url: `/api/layers/${action.payload}`
        })
        yield put({
            type: 'GET_LAYERS'
        })
    }catch(error){
        console.log('deleteLayer error:', error);
    };
};

function* layerSaga() {
    yield takeLatest('ADD_LAYER', addLayer);
    yield takeLatest('GET_LAYERS', getLayers);
    yield takeLatest('DELETE_LAYER', deleteLayer)
};
  
export default layerSaga;