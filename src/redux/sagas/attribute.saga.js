import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addAttribute(action){
    const selectedLayer = action.payload.layer
    try{
        const response = yield axios({
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

function* fetchOneAttribute(action) {
    try{
        const response = yield axios({
            method: 'GET',
            url: `/api/attributes/edit/${action.payload}`
        })
        const attributeToEdit = response.data;
        yield put({
            type: 'SET_ATTRIBUTE_TO_EDIT',
            payload: attributeToEdit
        })
    } catch (err) {
        console.log(err);
    };
};
  
function* editAttribute(action) {
    try{
        yield axios({
            method: 'PUT',
            url: `/api/attributes/edit/${action.payload.id}`,
            data: action.payload
        })
        yield put({
            type: 'GET_ATTRIBUTES'
        })
    } catch (err) {
        console.log(err)
    };
};

function* attributeSaga() {
    yield takeLatest('ADD_ATTRIBUTE', addAttribute);
    yield takeLatest('GET_ATTRIBUTES', getAttributes);
    yield takeLatest('DELETE_ATTRIBUTE', deleteAttribute);
    yield takeLatest('FETCH_ONE_ATTRIBUTE', fetchOneAttribute);
    yield takeLatest('EDIT_ATTRIBUTE', editAttribute);
};
  
export default attributeSaga;