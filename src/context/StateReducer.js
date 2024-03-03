import { reducerCases } from "./Constant";

export const initialeState = {
    showLoginModal:false,
    showSignupModal:false,
    userInfos:null,
    status:"user",
    service:[]
    
}

const reducer = (state,action) => {
    switch(action.type){
        case reducerCases.TOGGLE_LOGIN_MODAL:
            return {
                ...state,
                showLoginModal:action.showLoginModal
            }
        case reducerCases.TOGGLE_SIGNUP_MODAL:
            return {
                ...state,
                showSignupModal:action.showSignupModal
            }
        case reducerCases.CLOSE_AUTH_MODAL:
            return {
                ...state,
                showLoginModal:false,
                showSignupModal:false
            }
        case reducerCases.SET_USER:
            return {
                ...state,
                userInfos:action.userInfos
            }
        case reducerCases.SET_SERVICE_DATA:
            return {
                ...state,
                service:action.service
            }
        default:
            return state;
    }
}

export default reducer