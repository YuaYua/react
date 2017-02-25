/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    ListView,
    Text,
    TouchableOpacity,
    Image,
    Modal,
    TextInput,
    View
} from 'react-native';

import Button from 'react-native-button';

import Icon from 'react-native-vector-icons/Ionicons';

import Video from 'react-native-video';

import request from "../util/request";

import config from "../util/config";

var widths = Dimensions.get('window').width;

export default class detail extends Component {
    constructor(props){
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            row:this.props.row,
            play:true,
            dataSource: ds.cloneWithRows([]),
            paused:true,
            videoEnd:false,
            progress:0.01,
            modalVisible:false
        }
    }
    componentDidMount(){
        this.fetchData();
    }
    close () {
        if(this.state.videoEnd){
            this.refs.videoPlayer.seek(0)
            this.setState({
                videoEnd:false
            })
        }else {
            this.setState({
                paused:!this.state.paused
            })
        }

        // console.log(this.state.paused);
    }

    fetchData(){
        var url=config.api.base+config.api.comment;
        request.get(url)
            .then((data)=>{
                console.log(data);
                if(data.success){
                    var list=this.state.list;
                    list=data.data;
                }
                this.setState({
                    list:list,
                    dataSource:this.state.dataSource.cloneWithRows(list)
                })
            })
    }


    isplaying(){
        this.setState({
            play:!this.state.play
        })
        console.log(this.state.play)
    }

    inputs(){
        this.setState({
            modalVisible:!this.state.modalVisible
        })
    }

    onEnd(){
        this.setState({
            videoEnd:true
        })
    }

    progress(data){
        console.log(data)
        var currentTime=data.currentTime;
        var seekableDuration=data.seekableDuration;
        var progress=(currentTime/seekableDuration).toFixed(2);
        if(!this.state.videoEnd){
            this.setState({
                progress:progress
            })
        }



    }

    pop(){
        this.props.navigator.pop();
    }



    renderRow(row){
        return (
            <TouchableHighlight style={styles.container}>
                <View>
                    <Image
                        style={styles.images}
                        source={{uri:row.replyBy.avatar}}
                    />
                    <Text>{row.replyBy.nickname}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
                <View style={styles.container}>

                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={this.pop.bind(this)}
                            style={styles.backBox}
                        >
                            <Icon name="ios-arrow-back" style={styles.backIcon}></Icon>
                            <Text style={styles.backText}>返回</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle} numberOfLines={1}>视频详情页</Text>
                    </View>
                    <Text>wos</Text>

                    <TouchableOpacity onPress={this.close.bind(this)}>
                        <Video
                            ref='videoPlayer'
                            //repeat={true}
                            resizeMode='cover'
                            source={{uri:this.state.row.video}}
                            style={styles.backgroundVideo}
                            volume={1}
                           // rate={this.state.play ? 1:0}  //控制播放暂停
                            paused={this.state.paused}
                            onEnd={this.onEnd.bind(this)}
                            onProgress={this.progress.bind(this)}
                        />
                        {
                            this.state.paused||this.state.videoEnd?  <Icon
                                name="ios-play"
                                size={28}
                                style={styles.play}
                            /> :null
                        }
                        <View style={styles.progressBox}>
                            <View style={[styles.progress,{width:widths*this.state.progress}]}></View>
                        </View>

                    </TouchableOpacity>
                    <TextInput
                        style={{marginTop:30,width:widths,height:60,borderWidth:1}}
                        placeholder={'说点什么吧'}
                        multiline={true}
                        returnKeyType="done"
                        onFocus={this.inputs.bind(this)}
                    ></TextInput>
                    <Modal
                        visible={this.state.modalVisible}
                        //在这里设置样式没有用
                        //可以在 modal 写子标签对其设置样式
                        //transparent={true}
                        //style={{backgroundColor:"black"}}
                    >
                        <Text>hahaha</Text>
                        <Button>评论</Button>
                    </Modal>
                    {/*<View style={styles.control}>*/}
                        {/*<Icon*/}
                           {/*onPress={this.isplaying.bind(this)}*/}
                            {/*name={this.state.play ? "ios-play":"ios-pause"}*/}
                        {/*/>*/}
                    {/*</View>*/}
                    <View style={styles.lists}>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow.bind(this)}
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
        paddingTop:20,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:'pink',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:widths,
        height:64,
        borderBottomWidth:1,
        borderColor:'rgba(0,0,0,0.9)',
    },
    backBox:{
        position:'absolute',
        left:12,
        top:32,
        width:50,
        flexDirection:'row',
        alignItems:'center'
    },
    backIcon:{
        color:'#999',
        fontSize:20,
        marginRight:5
    },
    backText:{
        color:'#999'
    },
    headerTitle:{
        width:widths-120,
        textAlign:'center',
        color:'white',
        fontSize:16,
        fontWeight:'600'
    },
    backgroundVideo: {
        // position: 'absolute',
        // top: 50,
        // left: 0,
        // bottom: 0,
        // right: 0,
        width:widths,
        height:widths*0.56
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
        overflow:'hidden',
        borderColor:'#fff',
        borderWidth:1,
        borderRadius:23,
        color:'red'
    },
    progressBox:{
        width:widths,
        height:2,
        backgroundColor:'#ccc'
    },
    progress:{
        width:1,
        height:2,
        backgroundColor:'red'
    },
    control:{
        width:widths,
        height:20,
        backgroundColor:'pink',
        // position:'absolute',
        // top:widths*0.56+50
    },
    volume:{
        width:30,
        height:5,
        backgroundColor:'cyan',
    },
    lists:{
        // position:'absolute',
        // top:300
    },
    images:{
        width:50,
        height:50,
    }
});

