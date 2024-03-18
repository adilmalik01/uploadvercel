export const reducer = (state, action) => {

    switch (action.type) {
        case "USER_LOGIN": {
            return { ...state, isLogin: true, user: action.payload }
        }
        case "USER_LOGOUT": {
            return { ...state, isLogin: false, user: null }
        }
        case "CHANGE_THEME": {
            return { ...state, darkTheme: !state.darkTheme }
        }
        default: {
            return state
        }
    }
}