const initialData= {
    data:{},
}
const user =(state = initialData,action)=>{
    switch(action.type)
    {
        case 'SET_USER':
            return {
                ...state,
                data:action.payload,
            }
        default:
            return state;
    }
}
export default user;