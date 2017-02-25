/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    ListView,
    TouchableHighlight,
    Image,
    Dimensions,
    ActivityIndicator,
    RefreshControl,
    AlertIOS,
    Text,
    View

} from 'react-native';

import request from '../util/request';

import config from '../util/config';

import Detail from './detail';

//mockjs:创建假数据
// import Mock from 'mockjs';

import Icon from 'react-native-vector-icons/Ionicons';
var widths=Dimensions.get('window').width;
class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            up:false,
            row:this.props.row
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
                    AlertIOS.alert('点赞失败')
                }
            })

    }
    render(){
        var row=this.props.row;
        return(
            <TouchableHighlight onPress={this.props.onSelected}>
                <View style={styles.item}>
                    <Text>{row.title}</Text>
                    {/*图片必须有宽高*/}
                    <Image style={styles.images}
                        //http 类型的在iOS默认被阻止
                        //要手动开启
                        //在Xcode中找到app的info.plist文件
                        //找到App Transport Security Settings为其添加Allow Arbitrary Loads,并将其value设为yes保存
                           source={{uri:row.thumb}}
                    >
                        <Icon
                            name="ios-play"
                            size={28}
                            style={styles.play}
                        />
                    </Image>
                    <View style={styles.itemFooter}>
                        <View style={styles.footerBox}>
                            <Icon
                                //这里的 this 需要的是 icon 而不是 zmyApp
                                //要新创建一个类
                                onPress={this.liked.bind(this)}
                                name={this.state.up? "ios-heart":"ios-heart-outline"}
                                size={28}
                                style={[styles.footerIcon,this.state.up? styles.liked:null]}/>
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


export default class zmyApp extends Component {

    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            page:0,
            //total:存储数据个数，从数据库获取，用来判断是否还有数据
            total:0,
            //加锁：加载更多数据时，要防止用户多次上拉加载
            isloading:false
        };
    }
    componentDidMount(){
        this.fetchData(0);
    }
    //获取数据
    fetchData(page){
        //fetch请求数据
        // return fetch('http://rap.taobao.org/mockjs/13588/lck/videoList')
        //     .then((response) => response.json())
        //     .then((aaa) => {
        //         var data = Mock.mock(aaa);
        //         if(data.success){
        //             this.setState({
        //                 dataSource:this.state.dataSource.cloneWithRows(data.data)
        //             })
        //         }
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });

        //请求数据时解锁
        this.setState({
            isloading:true
        })

        //在 request 文件中封装请求，然后 import 进此文件
        var url=config.api.base+config.api.videoList;
        request.get(url,{
            accessToken:"lcks",
            page:page
        })
            .then((data)=>{
                console.log(data)
                if(data.success){
                    //从mockjs请求到数据赋给 dataSource
                    //给 video 设置一个新的状态 list用来存储 request返回的数据
                    var list=this.state.list;
                    //当不是第一页（或首次进入 app）
                    if(page!=0){
                        for(var i=0;i<data.data.length;i++){
                            list.push(data.data[i])
                        }
                    }else {
                        list=data.data
                    }
                    //每次加载新的数据后 page+1,等待下次加载
                    page++;
                    this.setState({
                        total:data.total,
                        list:list,
                        page:page,
                        isloading:false,//请求数据后上锁
                        dataSource:this.state.dataSource.cloneWithRows(list)
                    })
                }
            })
            .catch((error)=>{
                console.error(error)
            })
    }
    //当上拉到 距离list底部一定距离时加载更多
    fetchMore(){
        if(this.hasMore()&&!this.state.isloading){
            this.fetchData(this.state.page);
        }

    }
    //判断还有没有数据
    hasMore(){
        return !(this.state.total>0&&this.state.list.length>=this.state.total)
    }

    loadPage(row){
        this.props.navigator.push({
            name:'detail',
            component:Detail,
        })
    }

    onRefresh(){
        this.fetchData(0)
    }

    renderRow(row){
        return(
          //  {/*<TouchableHighlight>*/}
            //     <View style={styles.item}>
            //         <Text>{row.title}</Text>
            //         {/*图片必须有宽高*/}
            //         <Image style={styles.images}
            //                //http 类型的在iOS默认被阻止
            //             //要手动开启
            //             //在Xcode中找到app的info.plist文件
            //             //找到App Transport Security Settings为其添加Allow Arbitrary Loads,并将其value设为yes保存
            //             source={{uri:row.thumb}}
            //         >
            //             <Icon
            //                 name="ios-play"
            //                 size={28}
            //                 style={styles.play}
            //             />
            //         </Image>
            //         <View style={styles.itemFooter}>
            //             <View style={styles.footerBox}>
            //                 <Icon
            //                     //这里的 this 需要的是 icon 而不是 zmyApp
            //                     //要新创建一个类,
            //                     //把新的类 return 的放到这里
            //                     onPress={this.liked.bind(this)}
            //                     name={this.state.up? "ios-heart":"ios-heart-outline"}
            //                     size={28}
            //                     style={styles.footerIcon}/>
            //                 <Text style={styles.footerText}>喜欢</Text>
            //             </View>
            //             <View style={styles.footerBox}>
            //                 <Icon
            //                     name="ios-chatboxes-outline"
            //                     size={28}
            //                     style={styles.footerIcon}/>
            //                 <Text style={styles.footerText}>评论</Text>
            //             </View>
            //         </View>
            //
            //     </View>
            // </TouchableHighlight>

            //引入新创建的类、并把数据传过去
            //注意一个文件只能导出一个类，所以这个文件不能用 export
            <Item
                onSelected={this.loadPage.bind(this)}
                row={row}
            />
        )
    }
    renderFooter(){
        {
            if(!this.hasMore()){
                return (
                    <View>
                        <Text>没有更多数据了</Text>
                    </View>
                )
            }else{
                return(
                    <View>
                        {/*ActivityIndicator:显示一个圆形的loading提示符号。*/}
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
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>视频列表页</Text>
                </View>
                <View style={styles.container}>
                    <ListView
                        //获取数据源，
                        dataSource={this.state.dataSource}
                        //从数据源(Data source)中接受一条数据，以及它和它所在section的ID。返回一个可渲染的组件来为这行数据进行渲染
                        renderRow={this.renderRow.bind(this)}
                        //加载时多出来的底部
                        renderFooter={this.renderFooter.bind(this)}
                        enableEmptySections={true}
                        //到达底部执行方法
                        onEndReached={this.fetchMore.bind(this)}
                        //距离底部还有多少执行上面的方法
                        onEndReachedThreshold={20}
                        //为其添加下拉刷新的功能
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
        backgroundColor: '#F5FCFF',
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

