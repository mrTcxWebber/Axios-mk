const qs = require('qs')
function http(configs) {
    return new Promise((resolve, reject) => {
        const XHR = new XMLHttpRequest();
        console.log(configs);

        XHR.open(configs.method, configs.baseUrl + configs.url, true)
        for (let i in configs.headers) {
            XHR.setRequestHeader(i, configs.headers[i]);
        }
        if (configs.method === 'get') {
            XHR.send(null);
        } else {
            let data = configs.data
            configs.transformRequest.forEach(item => {
                data = Object.assign(data, item(data, configs.headers))
            });
            XHR.send(qs.stringify(data))
        }
        XHR.onreadystatechange = function () {
            if (XHR.readyState !== 4) return
            if (XHR.status >= 200 && XHR.status <= 300) {
                let data = JSON.parse(XHR.responseText)
                configs.transformResponse.forEach(item => {
                    data = Object.assign(data, item(data))
                });
                resolve(data)
            } else {
                reject(XHR.statusText)
            }
        }
    })
}

module.exports = http