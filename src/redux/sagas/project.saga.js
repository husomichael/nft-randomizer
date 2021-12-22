import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addProject(action){
    console.log('addProject payload:', action.payload);
    try{
        const response = axios({
            method: 'POST',
            url: '/api/projects',
            data: {project: action.payload}
        })
        yield put({
            type: 'GET_PROJECTS'
        })
    }catch(error){
        console.log('addProject catch error:', error);
    };
};

function* getProjects(action){
    console.log('in getProjects');
    try{
        const response = yield axios({
            method: 'GET',
            url: '/api/projects'
        })
        yield put({
            type: 'SET_PROJECTS',
            payload: response.data
        })
    }catch(error){
        console.log('getProjects error:', error);
    };
};

function* projectSaga() {
    yield takeLatest('ADD_PROJECT', addProject);
    yield takeLatest('GET_PROJECTS', getProjects);
};
  
export default projectSaga;