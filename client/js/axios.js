import axios from 'axios'
const qs = require('qs')
// axios.defaults.headers.get['content-type'] = 'application/x-www-form-urlencoded'
// console.log(axios.defaults.headers);

var instance1 = axios.create({
    baseURL: 'http://192.168.1.102:3002/'
});
instance1.interceptors.request.use(function (config) {
    // console.log(config);
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
instance1.post('qnm', { a: 1 }, {
    transformRequest: [function (data, headers) {
        console.log(data);
        console.log(headers);
        let n = qs.stringify(data)
        return n;
    }]

}).then(data => {
    console.log(instance1);

    console.log(data)
})