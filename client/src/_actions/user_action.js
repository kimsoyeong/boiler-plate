import Axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';

export function loginUser(dataTosubmit) {

    // 서버에서 받은 data를 request에 저장
    const request = Axios.post('/api/users/login', dataTosubmit)
    .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    } // return해서 reducer로 보내기
}

export function registerUser(dataTosubmit) {

    const request = Axios.post('/api/users/register', dataTosubmit)
    .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth() {

    const request = Axios.get('/api/users/auth')
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}