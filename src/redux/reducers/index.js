import { combineReducers } from 'redux'
import user from './user';
import userById from './userById';
import listPostByUser from './listPostByUser';

const rootReducer  = combineReducers({
    user,
    userById,
    listPostByUser
})

export default rootReducer;