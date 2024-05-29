import { applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import { thunk } from "redux-thunk";
import projectsReducer from "./reducers/projectsReducer";
import issuesReducer from "./reducers/issuesReducers";

const rootReducer= combineReducers({
    projects:projectsReducer,
    issues:issuesReducer
});


const store= createStore(rootReducer,applyMiddleware(thunk))
export default store;