module.exports = (isDev) => {
    return {
        preserveWhitespace: true,
        extractCSS: !isDev,
        cssModules: {
            localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
            camelCase: true
        },
    }
};