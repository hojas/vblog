const path = require('path')
const { connectMongo, createApp } = require('blog-server')

connectMongo().then(() => {
    const port = 8080

    createApp(path.resolve(__dirname, '../static')).listen(port, () => {
        console.log('Server is running on', port)
    })
})

