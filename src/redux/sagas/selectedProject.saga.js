import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getSelectedProject(action){
    try{
        const response = yield axios({
            method: 'GET',
            url: '/api/projects/select'
        })
        yield put({
            type: 'SET_SELECTED_PROJECT',
            payload: response.data
        })
    }catch(error){
        console.log('getSelectedProject error:', error);
    };
}

function* changeProject(action){
    try{
        const response = yield axios({
            method: 'PUT',
            url: `/api/projects/select/${action.payload}`
        })
        yield put({
            type: 'GET_SELECTED_PROJECT',
        })
    }catch(error){
        console.log('changeProject error:', error);
    };
};

function* selectedProjectSaga() {
    yield takeLatest('GET_SELECTED_PROJECT', getSelectedProject);
    yield takeLatest('CHANGE_PROJECT', changeProject);
};
  
export default selectedProjectSaga;