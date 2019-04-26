import  {get,post,setTokenHeader} from './API';

export const LoginAPI = p => post('users/singin/', p);

export const setToken = token => setTokenHeader(token);

export const  LoginOutAPI = p => get('users/userinfo', p);

