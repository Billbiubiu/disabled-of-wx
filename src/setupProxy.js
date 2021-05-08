const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app){
    app.use('/api', createProxyMiddleware(
        { 
            target: 'http://2.20.103.134/api/', 
            changeOrigin: true,
            pathRewrite:{
                "^/api":""
            }
        }
    ))
}
