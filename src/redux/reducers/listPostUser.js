const initialData= {
    data:[],
}
const listPostUser =(state = initialData,action)=>{
    switch(action.type)
    {
        case 'SET_LiST_POST_USER':
            return {
                ...state,
                data:action.payload,
            }
        default:
            return state;
    }
}
export default listPostUser;