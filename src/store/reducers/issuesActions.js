import axios from "../../api/axios";

export const SET_CURRENT_ISSUE='SET_CURRENT_ISSUE'
export const CLEAR_CURRENT_ISSUE='CLEAR_CURRENT_ISSUE'

export const FETCH_ISSUES_REQUEST='FETCH_ISSUES_REQUEST'
export const FETCH_ISSUES_SUCCESS= 'FETCH_ISSUES_SUCCESS'
export const FETCH_ISSUES_FAILURE='FETCH_ISSUES_FAILURE'

export const ADD_ISSUE_REQUEST='ADD_ISSUE_REQUEST'
export const ADD_ISSUE_SUCCESS= 'ADD_ISSUE_SUCCESS'
export const ADD_ISSUE_FAILURE='ADD_ISSUE_FAILURE'

export const UPDATE_ISSUE_REQUEST='UPDATE_ISSUE_REQUEST'
export const UPDATE_ISSUE_SUCCESS= 'UPDATE_ISSUE_SUCCESS'
export const UPDATE_ISSUE_FAILURE='UPDATE_ISSUE_FAILURE'

export const DELETE_ISSUE_REQUEST='DELETE_ISSUE_REQUEST'
export const DELETE_ISSUE_SUCCESS= 'DELETE_ISSUE_SUCCESS'
export const DELETE_ISSUE_FAILURE='DELETE_ISSUE_FAILURE'


export const setCurrentIssue = (issue) => ({
    type: SET_CURRENT_ISSUE,
    payload: issue
});

export const clearCurrentIssue = () => ({
    type: CLEAR_CURRENT_ISSUE
});


//http://192.168.1.11:3000/issues?projectId=1
export const fetchIssues = (projectId) => async (dispatch) => {
    dispatch({ type: FETCH_ISSUES_REQUEST });
    try {
        const response = await axios.get(`/issues?projectId=${projectId}`);
        dispatch({ type: FETCH_ISSUES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_ISSUES_FAILURE, error: error.message });
    }
};

export const addIssue = (newIssue) => async (dispatch) => {
    dispatch({ type: ADD_ISSUE_REQUEST });
    try {
        const response = await axios.post('/issues', newIssue);
        dispatch({ type: ADD_ISSUE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: ADD_ISSUE_FAILURE, payload: error.message });
    }
};

export const updateIssue = (updatedIssue) => async (dispatch) => {
    dispatch({ type: UPDATE_ISSUE_REQUEST });
    try {
        const response = await axios.put(`/issues/${updatedIssue.id}`, updatedIssue);
        dispatch({ type: UPDATE_ISSUE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_ISSUE_FAILURE, payload: error.message });
    }
};

export const deleteIssue = (issueId) => async (dispatch) => {
    dispatch({ type: DELETE_ISSUE_REQUEST });
    try {
        await axios.delete(`/issues/${issueId}`);
        dispatch({ type: DELETE_ISSUE_SUCCESS, payload: issueId });
    } catch (error) {
        dispatch({ type: DELETE_ISSUE_FAILURE, payload: error.message });
    }
};
