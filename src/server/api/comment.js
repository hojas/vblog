import _ from 'lodash'
import moment from 'moment'
import { Comment } from '../models'

// config
{
    moment.locale('zh-cn')
}

export default function(router) {
    router.get('/api/comments/:postUrl', async (ctx, next) => {
        let postUrl = ctx.params.postUrl

        let res = await Comment.findByPost(postUrl)
        let data = _.cloneDeep(res)

        data.comments = data.comments.map(comment => {
            return {
                // 疑问：为什么会出现 _doc
                // mongoose?
                ...comment._doc,
                createdAt: moment(comment.createdAt).format('ll'),
            }
        })

        ctx.body = data
    })

    router.post('/api/comment', async (ctx, next) => {
        let { username, email, site, postUrl, content } = ctx.request.body

        if (!username || !email || !content || !postUrl) {
            ctx.body = { status: 'error', msg: '评论失败' }
        }

        let comment = new Comment({
            postUrl,
            content,
            author: {
                username,
                email,
                site,
            },
        })

        ctx.body = await Comment.add(comment)
    })
}
