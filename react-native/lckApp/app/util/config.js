/**
 * Created by lanou on 2017/2/10.
 * 配置文件
 */
module.exports = {
    header:{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    },
    api:{
        base:"http://rap.taobao.org/mockjs/8207/",
        videoList:"lck/videoList",
        up:"lck/up",
        comment:"lck/comment"
    }
}
