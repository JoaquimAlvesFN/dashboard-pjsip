
const INITIAL_STATE = {
    data: []
};

const endpointsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'LOADINITIAL':
            return {...state, data: action.payload}
        case 'MUTATION':
            return {...state, data: action.ramais}
        default:
            return state
    }
    
}

export default endpointsReducer;

