const Txios = require('./Txios')
// import Txios from 'Txios'
const config = require('./config')

function createInstance(defaultsConfig) {
    let context = new Txios(defaultsConfig)
    let instance = bind(Txios.prototype.get, context)

    instance['get'] = bind(Txios.prototype.get, context)
    // instance['dispatch'] = bind(Txios.prototype.dispatch, context)

    let dataMethod = ['post', 'put']
    dataMethod.forEach(function (method, i) {
        Txios.prototype[method] = function (url, data, config) {
            return context.get(url, Object.assign(config, { data: data }))
        }
    })
    extend2(instance, Txios.prototype, context) // 因为txios.protype没有东西
    extend2(instance, context)
    console.log(instance.prototype)

    return instance
}

function bind(fn, thisArg) {
    return function wrap() {
        var arg = [].slice.call(arguments)
        return fn.apply(thisArg, arg)
    }
}
function extend2(a, b, thisArg) {
    for (var key in b) {
        if (Object.prototype.hasOwnProperty.call(b, key)) {
            if (thisArg && typeof b[key] === 'function') {
                a[key] = bind(b[key], thisArg);
            } else {
                a[key] = b[key];
            }
        }
    }
    return a;
}

function forEach2(obj, fn) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
        }
    }
}

const txios = createInstance(config)

module.exports = txios