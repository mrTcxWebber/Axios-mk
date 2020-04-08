// import { merge } from './util'
const utils = require('./util')
const merge = utils.merge
const mergeConfig = utils.mergeConfig
const InterceptorManager = require('./InterceptorManager')


// todo: 实现顺序
//     1. 返回get请求
//     2. 全局配置，< 实例配置，< 当前方法选项配置(.post)
//     3. 前后拦截器
//     4. 适配器 - 希望在浏览器可用，在node也可用，就需要适配
//     5. 数据转换
//     6. 函数包装 使得Txios({url:'xxx'}) Txios.get()

class Txios {
    constructor(options = {}) {
        // this.defaults = options
        this.defaults = merge(options)
        //  request拦截器 > 发送请求 > 响应拦截 > axios具体方法的then
        this.Interceptors = {
            request: new InterceptorManager(),
            response: new InterceptorManager()
        }
    }

    get(url, options) {
        let configs = mergeConfig(this.defaults, options)
        configs.url = url

        let promise = Promise.resolve(configs);

        this.Interceptors.request.handlers.forEach(item => {
            promise = promise.then(item.resolve, item.reject)
        })

        promise = promise.then(this.dispatch, undefined)
        this.Interceptors.response.handlers.forEach(item => {
            promise = promise.then(item.resolve, item.reject)
        })
        return promise
    }

    dispatch(configs) {
        let data = configs.adaptor(configs)
        return data
    }


}

module.exports = Txios