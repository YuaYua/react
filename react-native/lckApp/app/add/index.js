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
    Image,
    View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Mock from 'mockjs';

var widths = Dimensions.get('window').width;

class Add extends Component {
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
        };
    }
    componentDidMount(){
        this.fetchData();
    }
    fetchData(){

        fetch('http://rap.taobao.org/mockjs/13588/lck/videoList')
            .then((response) => response.json())
            .then((aaa) => {
                var data = Mock.mock(aaa);
                console.log(data)
                if (data.success){
                    this.setState({
                        dataSource:this.state.dataSource.cloneWithRows(data.data)
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    renderRow(row){
        return (
            //    TouchableHighlight:只能有一个子标签，如果需要多个，用View包裹起来
            <TouchableHighlight>
                <View style={styles.item}>
                    <Text>{row.author.nickname}</Text>
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
                        <View style={styles.footerBox}>
                            <Icon
                                name="ios-heart-outline"
                                size={28}
                                style={styles.footerIcon}/>
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

    render() {
        var bol=false;
        console.log(this)
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>视频列表页</Text>
                </View>
                <View style={styles.container}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                        enableEmptySections={true}
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
        backgroundColor: 'black',
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
    }




});
//除了默认声明导出类，也可以通过module.exports=类名来导出
module.exports=Add;


