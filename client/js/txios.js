const txios = require('./txios/index.js')
// txios.defaults.method = 'post'
txios.defaults.baseUrl = 'http://192.168.1.102:3002'
txios.defaults.data = { a: 1 }

txios.Interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});
txios.Interceptors.request.use(function (config) {

    return config;
}, function (error) {
    return Promise.reject(error);
});
txios.Interceptors.response.use(function (res) {
    console.log('响应拦截了');

    return res;
}, function (error) {
    return Promise.reject(error);
});
// console.log(txios);

txios('/aaa', {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', ttt: 123 },
    transformRequest: [function (data, headers) {
        data.c = 3
        return data
    }, function (data, headers) {
        data.d = 6
        return data;
    }],
    transformResponse: [function (data) {
        return data
    }, function (data) {
        return data
    }]
}).then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})