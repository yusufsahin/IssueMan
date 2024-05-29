import {
    SET_CURRENT_PROJECT,
    CLEAR_CURRENT_PROJECT,
    FETCH_PROJECTS_REQUEST,
    FETCH_PROJECTS_SUCCESS,
    FETCH_PROJECTS_FAILURE,
    ADD_PROJECT_REQUEST,
    ADD_PROJECT_SUCCESS,
    ADD_PROJECT_FAILURE,
    UPDATE_PROJECT_REQUEST,
    UPDATE_PROJECT_SUCCESS,
    UPDATE_PROJECT_FAILURE,
    DELETE_PROJECT_REQUEST,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_FAILURE
} from './projectsActions';

const initialState = {
    projects: [],
    currentProject: null,
    status: 'idle',
    error: null,
    addLoading: false,
    addError: '',
    updateLoading: false,
    updateError: '',
    deleteLoading: false,
    deleteError: ''
};

const projectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_PROJECT:
            return { ...state, currentProject: action.payload };
        case CLEAR_CURRENT_PROJECT:
            return { ...state, currentProject: null };
        case FETCH_PROJECTS_REQUEST:
            return { ...state, status: 'loading' };
        case FETCH_PROJECTS_SUCCESS:
            return { ...state, status: 'succeeded', projects: action.payload };
        case FETCH_PROJECTS_FAILURE:
            return { ...state, status: 'failed', error: action.error };
        case ADD_PROJECT_REQUEST:
            return { ...state, addLoading: true };
        case ADD_PROJECT_SUCCESS:
            return { ...state, addLoading: false, projects: [...state.projects, action.payload], addError: '' };
        case ADD_PROJECT_FAILURE:
            return { ...state, addLoading: false, addError: action.payload };
        case UPDATE_PROJECT_REQUEST:
            return { ...state, updateLoading: true };
        case UPDATE_PROJECT_SUCCESS:
            return {
                ...state, updateLoading: false,
                projects: state.projects.map(project => project.id === action.payload.id ? action.payload : project),
                updateError: ''
            };
        case UPDATE_PROJECT_FAILURE:
            return { ...state, updateLoading: false, updateError: action.payload };
        case DELETE_PROJECT_REQUEST:
            return { ...state, deleteLoading: true };
        case DELETE_PROJECT_SUCCESS:
            return {
                ...state, deleteLoading: false,
                projects: state.projects.filter(project => project.id !== action.payload),
                deleteError: ''
            };
        case DELETE_PROJECT_FAILURE:
            return { ...state, deleteLoading: false, deleteError: action.payload };
        default:
            return state;
    }
};

export default projectsReducer;
