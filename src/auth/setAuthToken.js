import instance from './../axios/axios';

export const setAuthToken = token => {
    if (token) {
        instance.defaults.headers.common['Authorization'] = token;
    } else {
        delete instance.defaults.headers.common['Authorization'];
    }
}
