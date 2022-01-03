import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getSelectedProject(action){
    console.log('in getSelectedProject')
    try{
        const response = yield axios({
            method: 'GET',
            url: '/api/selectedProject'
        })
        yield put({
            type: 'SET_SELECTED_PROJECT',
            payload: response.data
        })
    }catch(error){
        console.log('getSelectedProject error:', error);
    };
}

function* selectProject(action){
    console.log('in selectProject');
    try{
        const response = yield axios({
            method: 'POST',
            payload: {project: action.payload}
        })
        yield put({
            type: 'GET_SELECTED_PROJECT',
        })
    }catch(error){
        console.log('selectProject error:', error);
    };
};

function* changeProject(action){
    console.log('in changeProject');
    try{
        const response = yield axios({
            method: 'PUT',
            payload: {project: action.payload}
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
    yield takeLatest('SELECT_PROJECT', selectProject);
    yield takeLatest('CHANGE_PROJECT', changeProject);
};
  
export default selectedProjectSaga;