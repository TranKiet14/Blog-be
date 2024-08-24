module.exports = {
    secret : process.env.JWT_SECRET || 'secret',

    ttl: '30s'
}
