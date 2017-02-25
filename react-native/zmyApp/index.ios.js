/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
    Navigator,
  View
} from 'react-native';

//安装淘宝镜像rnpm:指令sudo npm install rnpm -g

//如果要引入icon模块首先要下载:指令npm i react-native-vector-icons
//然后用rnpm连接rnpm link react-native-vector-icons
//这之后才能引入
//引入新的模块之后要重启app

import Icon from 'react-native-vector-icons/Ionicons';
import VideoList from './app/video';
import AddList from './app/add';
import MoreList from './app/more';


var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

export default class zmyApp extends Component {

  constructor(props){
    super(props);
    this.state={
      selectedTab:'blueTab',
      notifCount:0
    }
  }

  render() {
    return (
        <TabBarIOS
            unselectedTintColor="yellow"
            tintColor="white"
            barTintColor="darkslateblue">
            {/*引入的icon图标要用Icon.TabBarItem组件包裹 icon名要赋值给iconName
                选中时的icon名要赋值给selectedIconName

            */}
          <Icon.TabBarItem
              title="video"

              iconName="ios-videocam-outline"
              selectedIconName="ios-videocam"
              selected={this.state.selectedTab === 'blueTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'blueTab',
                });
              }}>
              <Navigator
                  //指定了默认的页面
                  initialRoute={{ name: 'VideoList', component: VideoList }}
                  //页面之间跳转时候的动画
                  configureScene={(route) => {
                      return Navigator.SceneConfigs.VerticalDownSwipeJump;
                  }}
                  //route里其实就是我们传递的name,component这两个货，
                  // navigator是一个Navigator的对象，
                  // 为什么呢，因为它有push pop jump...等方法，
                  // 这是我们等下用来跳转页面用的那个navigator对象。
                  // 这里有一个判断，也就是如果传递进来的component存在，
                  // 那我们就是返回一个这个component，结合前面 initialRoute 的参数，
                  // 我们就是知道，这是一个会被render出来给用户看到的component，
                  // 然后navigator作为props传递给了这个component。
                  renderScene={(route, navigator) => {
                      let Component = route.component;
                      return <Component {...route.params} navigator={navigator} />
                  }}
              />
          </Icon.TabBarItem>
          <Icon.TabBarItem
              title="add"
              iconName="ios-person-add-outline"
              selectedIconName="ios-person-add"
              badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
              selected={this.state.selectedTab === 'redTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'redTab',
                  notifCount: this.state.notifCount + 1,
                });
              }}>
            <AddList></AddList>
          </Icon.TabBarItem>
          <TabBarIOS.Item
              icon={require('./flux.png')}
              selectedIcon={require('./relay.png')}
              renderAsOriginal
              title="More"
              selected={this.state.selectedTab === 'greenTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'greenTab',
                  presses: this.state.presses + 1
                });
              }}>
            <MoreList></MoreList>
          </TabBarIOS.Item>
        </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('zmyApp', () => zmyApp);
