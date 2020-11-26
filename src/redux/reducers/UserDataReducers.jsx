const INITIAL_STATE = [
    {
        username:'Susan Doe',
        password:'susan',
    },
    {
        username:'Amy Blyth',
        password:'amy',
    },
    {
        username:'Jane Doe',
        password:'jane',
    },
]


export default (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case 'LOGIN':
            return {...state, ...action.payload}
        case 'LOGOUT':
            return INITIAL_STATE
        default:
            return state
    }
}