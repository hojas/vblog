module.exports = {
  srcDir: './src',
  modules: ['bootstrap-vue/nuxt', ['bootstrap-vue/nuxt', { css: false }]],
  plugins: [{ src: '~plugins/iview', ssr: true }],
}
