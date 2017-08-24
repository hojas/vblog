import moment from 'moment'

moment.locale('zh-cn')

export default function(value) {
    return moment(value).format('ll')
}
