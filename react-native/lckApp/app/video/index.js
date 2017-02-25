/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ListView,
    Dimensions,
    TouchableHighlight,
    ActivityIndicator,
    Image,
    RefreshControl,
    AlertIOS,
    View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import request from "../util/request";

import config from "../util/config";

import Detail from "./detail";

// import Mock from 'mockjs';

var widths = Dimensions.get('window').width;

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            row:this.props.row,
            up:false
        };
    }
    liked(){
        var url=config.api.base+config.api.up;
        request.get(url)
            .then((data)=>{
                if(data.success){
                    AlertIOS.prompt('点赞成功');
                    this.setState({
                        up:!this.state.up
                    })
                }else {
                    AlertIOS.alert('点赞失败');
                }
            })

    }

    push(){
        console.log(this.props)
    }

    render(){
        var row=this.props.row;
        return (
            //    TouchableHighlight:只能有一个子标签，如果需要多个，用View包裹起来
            <TouchableHighlight onPress={this.props.onSelected}>
                <View style={styles.item}>
                    <Text>{row.title}</Text>
                    <Image style={styles.images}
                           source={{uri:row.thumb}}
                    >
                        <Icon
                            name="ios-play"
                            size={28}
                            style={styles.play}
                        />
                    </Image>

                    <View style={styles.itemFooter}>
                        <View

                            style={styles.footerBox}>
                            <Icon
                                onPress={this.liked.bind(this)}
                                name={this.state.up ? "ios-heart":"ios-heart-outline"}
                                size={28}
                                style={[styles.footerIcon,this.state.up ? styles.liked : null]}/>
                            <Text style={styles.footerText}>喜欢</Text>
                        </View>
                        <View style={styles.footerBox}>
                            <Icon
                                name="ios-chatboxes-outline"
                                size={28}
                                style={styles.footerIcon}/>
                            <Text style={styles.footerText}>评论</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

export default class Video extends Component {
    constructor(props){
        super(props);
        console.log(this.props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            page:0,
            total:0,
            isloading:false    //   加载更多数据时需要加锁防止用户多次加载
        };
    }
    componentDidMount(){
        //首次加载
        this.fetchData(0);
    }
    fetchData(page){

        // fetch('http://rap.taobao.org/mockjs/8207/lck/videoList')
        //     .then((response) => response.json())
        //     .then((aaa) => {
        //        var data = Mock.mock(aaa);
        //         console.log(data)
        //         if (data.success){
        //             this.setState({
        //                 dataSource:this.state.dataSource.cloneWithRows(data.data)
        //             })
        //         }
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });

       this.setState({
           isloading:true
       })
        //在request文件中封装请求
        //引入request文件后不使用上述方法
        var url=config.api.base+config.api.videoList;
        //在request文件中封装请求
        request.get(url,{
            accessToken:"lcks",
            page:page
        })
            .then((data) => {
                // console.log(data)
                if (data.success){
                    var list=this.state.list;
                    if(page!=0){
                        for(var i=0;i<data.data.length;i++){
                            list.push(data.data[i]);
                        }
                    }else {
                        list=data.data;
                    }
                    page++;
                    this.setState({
                        total:data.total,
                        list:list,
                        page:page,
                        isloading:false,
                        dataSource:this.state.dataSource.cloneWithRows(list)
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }
    //加载更多
    fetchMore(){
        // console.log("aloal");

        // var isloading=this.state.isloading;
        if(this.hasMore() && !this.state.isloading){
            this.fetchData(this.state.page);
        }

    }
    onRefresh(){
        // this.state.isrefresh
        this.fetchData(0)
    }
    loadPage(row){
        //只进行叶面跳转不需要注释内容
        // var _this = this
        console.log(row);
        this.props.navigator.push({
            name:'detail',
            component:Detail,
            params:{
                row:row,
                // getUser:function (user) {
                //     _this.setState({
                //         user:user
                //     })
                // }
            }
        })
    }


    renderRow(row){
        return (
            <Item
                onSelected={this.loadPage.bind(this,row)}
                row={row}
            />
        )
    }

    hasMore(){
        return !(this.state.total>0&&this.state.total<=this.state.list.length);
    }

    renderFooter(){

        // return(
        //     <View>
        //         <ActivityIndicator
        //             animating={this.state.animating}
        //             color={"red"}
        //             size="large"
        //         />
        //     </View>
        // )

        {
            //
            if(!this.hasMore()){
                return(
                    <View>
                        <Text>没有更多数据了</Text>
                    </View>
                )
            }else {
                return(
                    <View>
                        <ActivityIndicator
                            animating={this.state.animating}
                            color={"red"}
                            size="large"
                        />
                    </View>
                )
            }
        }
    }

    render() {
        var bol=false;
        // console.log(this)
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>视频列表页</Text>
                </View>
                <View style={styles.container}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                        renderFooter={this.renderFooter.bind(this)}
                        enableEmptySections={true}
                        onEndReached={this.fetchMore.bind(this)}
                        onEndReachedThreshold={20}
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={this.onRefresh.bind(this)}
                                tintColor="#ff0000"
                                title="Loading..."
                                titleColor="#00ff00"
                                colors={['#ff0000', '#00ff00', '#0000ff']}
                                progressBackgroundColor="#ffff00"
                            />
                        }
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
    },
    header:{
        paddingTop:25,
        paddingBottom:12,
        backgroundColor:'pink'
    },
    headerTitle:{
        textAlign:'center',
        color:'white',
        fontSize:16,
        fontWeight:'600'
    },
    item:{
        width:widths,
        backgroundColor:'#fff',
        marginBottom:10
    },
    title:{
        padding:10,
        fontSize:18,
        color:"#333"
    },
    // resizeMode:'cover':控制图片大小 cover：等比拉伸，strech:原有大小 contain:图片拉伸，充满空间
    images:{
        width:widths,
        height:widths*0.5,
        resizeMode:'cover'
    },
    play:{
        position:'absolute',
        bottom:14,
        right:14,
        width:46,
        height:46,
        paddingTop:9,
        paddingLeft:18,
        backgroundColor:"transparent",
        borderColor:'#fff',
        borderWidth:1,
        borderRadius:23,
        color:'red'
    },
    itemFooter:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#eee'
    },
    footerBox:{
        padding:10,
        flexDirection:'row',
        width:widths/2-0.5,
        justifyContent:'center',
        backgroundColor:'#fff'
    },
    footerText:{
        paddingLeft:12,
        paddingTop:3,
        fontSize:18,
        color:'#333'
    },
    footerIcon:{
        color:'#333',
    },
    liked:{
        color:'red'
    }



});
//除了默认声明导出类，也可以通过module.exports=类名来导出
// module.exports=Video;


