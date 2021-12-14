import Axios from 'axios';
import {
    LOGIN_USER
} from '../_action/types';

export function loginUser(dataTosubmit) {

    // 서버에서 받은 data를 request에 저장
    const request = Axios.post('/api/users/login', dataTosubmit)
    .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    } // return해서 reducer로 보내기
}