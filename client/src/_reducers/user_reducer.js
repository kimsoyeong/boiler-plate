import {
    LOGIN_USER,
    REGISTER_USER
} from '../_action/types';

export default function user(state = {}, action) { // previous state, action
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload };
        case REGISTER_USER:
            return { ...state, register: action.payload };
        default:
            return state;
    }
}