'use strict';
var React = require('react-native');

//解构赋值
//ES7 proposal(https://github.com/sebmarkbage/ecmascript-rest-spread)
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component,
  NavigatorIOS
} = React;

//---------------------------------------
// Stylesheet
//---------------------------------------
var styles = StyleSheet.create({
  container: {
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0
    },
    width: 290,
    height: 290,
  },
  definition: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20
  },
  chinese: {
    flex: 1,
    fontSize: 80,
    fontFamily: 'STHeitiTC-Light'
  },
  pinyin: {
    flex: 1,
    fontSize: 40,
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },

  row : {
    margin:20,
    width: 320,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },

  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },

  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    margin:20,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },

  buttonDanger: {
    backgroundColor: '#BB27DD',
    borderColor: '#BB27DD',
  },

  buttonPrimary: {
    backgroundColor: '#29DF9A',
    borderColor: '#29DF9A',
  },

  nav: {
    flex: 1  
  },


  ////
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },

  status: {
    fontSize: 15,
    flex: 1,
    color: '#29DF9A'
  },
  title: {
    flex: 4,
    fontSize: 20,
    color: '#656565'
  }



});

//---------------------------------------
// Study Screen 
//---------------------------------------
class Card extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <View style={styles.card}>
        <Text style={styles.definition}>
          {this.props.cardData.definition}
        </Text>
        <Text style={styles.chinese}>
          {this.props.cardData.chinese}
        </Text>
        <Text style={styles.pinyin}>
          {this.props.cardData.pinyin}
        </Text>
      </View>
    );
  }
}

var REQUEST_URL = [
'http://echo.jsontest.com/definition/learn/chinese/%E5%AD%A6%E4%B9%A0/pinyin/xue%20xi',
'http://echo.jsontest.com/definition/eat/chinese/%E5%90%83%E9%A5%AD/pinyin/chi%20fan',
'http://echo.jsontest.com/definition/sheep/chinese/%E7%BB%B5%E7%BE%8A/pinyin/mian%20yang',
];
class StudyScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      cardData: {
          definition: 'learn',
          chinese: '学习',
          pinyin: 'xue xi'
      }
    };
  }

  //组件加载完成钩子, 类似于onload()
  componentDidMount() {
    this.fetchCardData();
  }

  //调用API获取当前学习卡片的内容
  fetchCardData() {
    fetch(REQUEST_URL[Math.floor(Math.random()*3)])
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)
        this.setState({
          cardData: {
            definition: decodeURI(responseData.definition),
            chinese: decodeURI(responseData.chinese),
            pinyin: decodeURI(responseData.pinyin),
          },
          loading: false,
        });
      })
      .done();
  }

  // 反馈按钮点击处理事件
  onGotPressed() {
    //todo: 写入数据库
    this.setState({loading: true})
    this.fetchCardData();
  }
  onForgetPressed() {
    //todo: 写入数据库
    this.setState({loading: true})
    this.fetchCardData();
  }

  //组件渲染函数
  render(){
    var spinner = this.state.loading ?
          ( <ActivityIndicatorIOS
            hidden='true'
            size='large'/> ) :
          ( <Card cardData={this.state.cardData}></Card>);
    return (
      <View style={styles.container}>
        {spinner}
        <View style={styles.row}>
          <TouchableHighlight 
            style={[styles.button, styles.buttonPrimary]}
            onPress={this.onGotPressed.bind(this)}
            underlayColor='#84EFC6'>
            <Text style={styles.buttonText}>Got it!</Text>
          </TouchableHighlight>
          <TouchableHighlight 
            style={[styles.button, styles.buttonDanger]}
            onPress={this.onForgetPressed.bind(this)}
            underlayColor='#D982EE'>
            <Text style={styles.buttonText}>Not yet</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}


//---------------------------------------
// Study List Screen
//---------------------------------------
class StudyListScreen extends Component {

  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid !== r2.guid
    });
    var listData = [
      {title: 'Animals', status: '96%'}, 
      {title: 'Time', status: '50%'}, 
      {title: 'Actions', status: 'study'}, 
      {title: 'Places', status: 'study'},
      {title: 'Plants', status: 'study'},
      {title: 'Foods', status: 'study'}
    ];
    this.state = {
      dataSource: dataSource.cloneWithRows(listData)
    };
  }

  onListPressed(data) {
    console.log(data);
    this.props.navigator.push({
      title: data.title,
      component: StudyScreen, // the screen with the cards we created earlier
      passProps: data,
    });
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <View>
      <TouchableHighlight
          onPress={()=> this.onListPressed(rowData)}
          underlayColor='#84EFC6'>
        <View style={styles.row}>
          <Text style={styles.title}>{rowData.title}</Text>
          <Text style={styles.status}>{rowData.status}</Text>
        </View>
      </TouchableHighlight>
      <View style={styles.separator}/>
      </View>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={true}
        showsVerticalScrollIndicator={true}/>
    );
  }

}

//---------------------------------------
// Main App
//---------------------------------------
class Hanzi extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.nav}
        initialRoute={{
          title: 'Hanzi',
          component: StudyListScreen,
        }}/>
    );
  }
}

React.AppRegistry.registerComponent('hanzi', function(){return Hanzi});

