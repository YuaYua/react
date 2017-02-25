/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
    Navigator,
  TabBarIOS,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
//从./app/video引入组件，VideoList作为组件的包裹
import VideoList from "./app/video";

import AddList from "./app/add";

import MoreList from "./app/more";

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

export default class lckApp extends Component {
  constructor(props){
    super(props);
    this.state={
      times:0,
      selectedTab: 'blueTab',
      notifCount: 0
    }
  }
  clicks(){
    this.setState({
      times:++this.state.times
    })
  }
  render() {
    var bol=false;
    console.log(this)
    return (
        <TabBarIOS
            unselectedTintColor="black"
            tintColor="white"
            barTintColor="#3cf"
            translucent={bol}
        >
          <Icon.TabBarItem
              title="首页"
              iconName="ios-videocam-outline"
              selectedIconName="ios-videocam"
              selected={this.state.selectedTab === 'blueTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'blueTab',
                });
              }}>
              <Navigator
                  initialRoute={{ name: 'VideoList', component: VideoList,params:{
                      name:"lck",
                      password:"123"
                  } }}
                  configureScene={(route) => {
                      return Navigator.SceneConfigs.PushFromRight;
                  }}

                  renderScene={(route, navigator) => {
                      let Components = route.component;
                      return <Components {...route.params} navigator={navigator} />
                  }} />
          </Icon.TabBarItem>
          <Icon.TabBarItem
              title="添加"
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

AppRegistry.registerComponent('lckApp', () => lckApp);
