import { combineReducers } from 'redux'
import user from './user';
import listPostUser from './listPostUser';

const rootReducer  = combineReducers({
    user,
    listPostUser
})

export default rootReducer;