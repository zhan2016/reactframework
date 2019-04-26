import axios from 'axios';
import  qs from 'qs';
import HashHistory from '../View/BrowserHistory'
/****** 创建axios实例 ******/
const service = axios.create({
    baseURL: window.CONFIG.serverURL,  // api的base_url
    timeout: 5000  // 请求超时时间
});

/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(config => {
    console.log(window.CONFIG.serverURL);
    console.log( '数据加载中……');
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'

    config.method === 'post'
        ? config.data = qs.stringify({...config.data})
        : config.params = {...config.params};
   // config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    config.headers['Access-Control-Allow-Origin'] = '*';
    console.log(JSON.stringify(config));
    return config;
}, error => {  //请求错误处理
   console.log('warning')
    Promise.reject(error)
});

/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
    response => {  //成功请求到数据
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200 || response.status=== 201) {
            //console.log(JSON.stringify(response.data));
            return Promise.resolve(response);
        } else {
            return Promise.reject(response.data);
        }

    },
    error => {  //响应错误处理
            let errormsg;
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    HashHistory.push('/register')
                    break;

                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
                case 403:
                    errormsg = {
                        message: '登录过期，请重新登录',
                        duration: 1000,
                        forbidClick: true
                    };
                    // 清除token
                    localStorage.removeItem('token');
                   // store.commit('loginSuccess', null);
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    HashHistory.push('/register');
                    break;

                // 404请求不存在
                case 404:
                    errormsg = {
                        message: '网络请求不存在',
                        duration: 1500,
                        forbidClick: true
                    };
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    errormsg = {
                        message: error.response.data.message,
                        duration: 1500,
                        forbidClick: true
                    };
            }
            return Promise.reject(error.response);
    }
);

export default service;

