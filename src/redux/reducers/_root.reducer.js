import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import layers from './layer.reducer';
import projects from './project.reducer';
import attributes from './attribute.reducer';
import random from './random.reducer';
import selectedProject from './selectedProject.reducer';
import editThisProject from './editProject.reducer';
import editThisLayer from './editLayer.reducer';
import editThisAttribute from './editAttribute.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  layers, //has all layers for current project
  projects, //has all projects for logged in user
  attributes, //has all attributes for current layers
  selectedProject, //stores current selected project for user
  random, //stores values after being randomized on server
  editThisProject, //stores current project to be edited
  editThisLayer, //stores current layer to be edited
  editThisAttribute, //stores current attribute to be edited
});

export default rootReducer;
