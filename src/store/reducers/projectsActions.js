// actions/projectActions.js
import axios from "../../api/axios";

export const SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT';
export const CLEAR_CURRENT_PROJECT = 'CLEAR_CURRENT_PROJECT';

export const FETCH_PROJECTS_REQUEST = 'FETCH_PROJECTS_REQUEST';
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const FETCH_PROJECTS_FAILURE = 'FETCH_PROJECTS_FAILURE';

export const ADD_PROJECT_REQUEST = 'ADD_PROJECT_REQUEST';
export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS';
export const ADD_PROJECT_FAILURE = 'ADD_PROJECT_FAILURE';

export const UPDATE_PROJECT_REQUEST = 'UPDATE_PROJECT_REQUEST';
export const UPDATE_PROJECT_SUCCESS = 'UPDATE_PROJECT_SUCCESS';
export const UPDATE_PROJECT_FAILURE = 'UPDATE_PROJECT_FAILURE';

export const DELETE_PROJECT_REQUEST = 'DELETE_PROJECT_REQUEST';
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS';
export const DELETE_PROJECT_FAILURE = 'DELETE_PROJECT_FAILURE';

export const setCurrentProject = (project) => ({
    type: SET_CURRENT_PROJECT,
    payload: project
});

export const clearCurrentProject = () => ({
    type: CLEAR_CURRENT_PROJECT
});

export const fetchProjects = () => async (dispatch) => {
    dispatch({ type: FETCH_PROJECTS_REQUEST });
    try {
        const response = await axios.get('/projects');
        dispatch({ type: FETCH_PROJECTS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_PROJECTS_FAILURE, error: error.message });
    }
};

export const addProject = (newProject) => async (dispatch) => {
    dispatch({ type: ADD_PROJECT_REQUEST });
    try {
        const response = await axios.post('/projects', newProject);
        dispatch({ type: ADD_PROJECT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: ADD_PROJECT_FAILURE, payload: error.message });
    }
};

export const updateProject = (updatedProject) => async (dispatch) => {
    dispatch({ type: UPDATE_PROJECT_REQUEST });
    try {
        const response = await axios.put(`/projects/${updatedProject.id}`, updatedProject);
        dispatch({ type: UPDATE_PROJECT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_PROJECT_FAILURE, payload: error.message });
    }
};

export const deleteProject = (projectId) => async (dispatch) => {
    dispatch({ type: DELETE_PROJECT_REQUEST });
    try {
        await axios.delete(`/projects/${projectId}`);
        dispatch({ type: DELETE_PROJECT_SUCCESS, payload: projectId });
    } catch (error) {
        dispatch({ type: DELETE_PROJECT_FAILURE, payload: error.message });
    }
};
