module.exports = {
    syntax: 'postcss-scss',
    map: false,
    plugins: {
        'postcss-import': {},
        'postcss-cssnext': {},
        'cssnano': {
            zindex: false
        }
    }
}
