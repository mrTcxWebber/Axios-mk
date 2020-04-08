function types(s) {
    return Object.prototype.toString.call(s)
}

function merge(source) {
    let target = types(source) === "[object Object]" ? {} : []
    for (let i in source) {
        if (types(source[i]) === "[object Object]" || types(source[i]) === "[object Array]") {
            target[i] = merge(source[i])
        } else (
            target[i] = source[i]
        )
    }
    return target
}

function mergeConfig(target, source) {
    let r = merge(target)
    let s = merge(source)
    for (let i in s) {
        if (['headers'].includes(i)) {
            r[i] = Object.assign(r[i], s[i])
        } else {
            r[i] = s[i]
        }
    }
    return r
}

module.exports = {
    merge,
    mergeConfig
}
// export default {
//     merge
// }