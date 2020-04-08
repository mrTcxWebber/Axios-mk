
class InterceptorManager {
    constructor() {
        this.handlers = []
    }
    use(resolve, reject) {
        this.handlers.push({
            resolve,
            reject
        })
    }
}

module.exports = InterceptorManager