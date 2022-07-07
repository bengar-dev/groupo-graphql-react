const INITIAL_STATE = {
    userInfo: {
        id: "",
        email: "",
        firstname: "",
        lastname: "",
        avatar: ""
    }
}

function userReducer(state = INITIAL_STATE, action) {

    switch(action.type) {

        case 'GETUSERINFO': {
            return {
                ...state,
                userInfo: action.payload
            }
        }

        case 'EDITUSERINFO': {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    email: action.payload.email,
                    firstname: action.payload.firstname,
                    lastname: action.payload.lastname
                }
            }
        }
    }

    return state
}

export default userReducer