import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import layerSaga from './layer.saga';
import projectSaga from './project.saga';
import attributeSaga from './attribute.saga';
import randomSaga from './random.saga';
import selectedProjectSaga from './selectedProject.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(), //handles registration sagas
    userSaga(), //handles user sagas
    layerSaga(), //handles layer sagas
    projectSaga(), //handles project sagas
    attributeSaga(), //handles attribute sagas
    randomSaga(), //handles the randomization saga
    selectedProjectSaga(), //handles current project saga
  ]);
};
