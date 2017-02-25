import queryString from 'query-string';
import lodash from 'lodash';
import config from './config';
import Mock from 'mockjs';

//封装request请求
//如果让导出的能用，传出的要是一个对象
var request={}
request.get=function (url,params) {
    //如果传了参数，将路径拼起来
    if(params){
        url+="?"+queryString.stringify(params);
    }
    return fetch(url)
        .then((response) => response.json())
        .then((response) => {
            return Mock.mock(response)
        })
}
request.post=function (url,body) {
    var options=lodash.extend(config.header,{
        body:JSON.stringify(body)
    })
    return fetch(url,options)
        .then((response) => response.json())
        .then((response) => {
            return Mock.mock(response)
        })
}
//将request导出
module.exports=request;