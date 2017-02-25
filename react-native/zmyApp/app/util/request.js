import queryString from 'query-string'
import lodash from 'lodash';
import config from './config';
import Mock from 'mockjs';

//定义一个对象
var request={}
//对 request 对象设置 get、post 请求方法
request.get=function (url,params) {
    if(params){
        url+="?"+queryString.stringify(params)
    }
    return fetch(url)
        .then((response) => response.json())
        .then((response) =>{
            return Mock.mock(response)
        })
}
request.post=function (url,body) {
    var options=lodash.extend(config.header,{
        body:JSON.stringify(body)
    })
    return fetch(url,options)
        .then((response)=>response.json())
        .then((response)=>{
            return Mock.mock(response)
        })
}

//导出请求数据
module.exports=request;