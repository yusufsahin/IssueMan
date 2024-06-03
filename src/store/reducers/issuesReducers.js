import { ADD_ISSUE_FAILURE, ADD_ISSUE_REQUEST, ADD_ISSUE_SUCCESS, CLEAR_CURRENT_ISSUE, DELETE_ISSUE_FAILURE, DELETE_ISSUE_REQUEST, DELETE_ISSUE_SUCCESS, FETCH_ISSUES_FAILURE, FETCH_ISSUES_REQUEST, FETCH_ISSUES_SUCCESS, SET_CURRENT_ISSUE, UPDATE_ISSUE_FAILURE, UPDATE_ISSUE_REQUEST, UPDATE_ISSUE_SUCCESS } from "./issuesActions";



const initialState={
    issues:[],
    currentIssue:null,
    status:'idle',
    error:null,
    addLoading:false,
    addError:'',
    updateLoading:false,
    updateError:'',
    deleteLoading:false,
    deleteError:''
}

const issuesReducer=(state=initialState,action)=>{
    switch(action.type){
        case SET_CURRENT_ISSUE:
            return {...state,currentIssue:action.payload};
        case CLEAR_CURRENT_ISSUE:
            return {...state,currentIssue:null};
        case FETCH_ISSUES_REQUEST:
            return {...state,status:'loading'};
        case FETCH_ISSUES_SUCCESS:
            return {...state,status:'succeeded',issues:action.payload};
        case FETCH_ISSUES_FAILURE:
            return {...state,status:'failed',error:action.error};
        case ADD_ISSUE_REQUEST:
            return{...state,addLoading:true};
        case ADD_ISSUE_SUCCESS:
            return{...state,addLoading:false,issues:[...state.issues,action.payload],addError:''};
        case ADD_ISSUE_FAILURE:
            return {...state,addLoading:false,addError:action.payload}
        case UPDATE_ISSUE_REQUEST:
            return {...state,updateLoading:true};
        case UPDATE_ISSUE_SUCCESS:
            return {...state,updateLoading:false,
                issues:state.issues.map(issue=> issue.id===action.payload.id ? action.payload : issue),
                updateError:''
            };
        case UPDATE_ISSUE_FAILURE:
            return {...state,updateLoading:false,updateError:action.payload};
        case DELETE_ISSUE_REQUEST:
            return {...state,deleteLoading:true};
        case DELETE_ISSUE_SUCCESS:
            return {...state,deleteLoading:false,
                issues:state.issues.filter(issue=>issue.id!==action.payload),
                deleteError:''
            };
        case DELETE_ISSUE_FAILURE:
            return {...state,deleteLoading:false,deleteError:action.payload};       
        default: 
            return state;
    }
}

export default issuesReducer;