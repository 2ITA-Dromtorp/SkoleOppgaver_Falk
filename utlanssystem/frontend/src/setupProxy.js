const { createProxyMiddleware } = require('http-proxy-middleware');
 
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://utlandromtorp.no/api',
            changeOrigin: true,
        }),
    );
}

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:3000/api',
            changeOrigin: true,
        }),
    );
}