function nodeHttp(configs) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ data: 1 })
        }, 1000);
    })
}

module.exports = nodeHttp