'use strict';

var React = require('react-native');
var api = require('../../utils/api.js');
var Separator = require('../helpers/separator.js');
var Profile = require('../profile/app-profile');
var CameraRollView = require('./request-cameraRollView');

console.log('if this is an object, there is a circular reference issue:', Profile);

var {
  View,
  Image,
  Text,
  ListView,
  TouchableHighlight,
  StyleSheet,
} = React;

var styles = StyleSheet.create({
  rowContainer: {
    padding: 10,
  },
  image: {
    height: 350,
  },
  container: {
    margin: 10,
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    height: 40,
    backgroundColor: '#5F4461',
    justifyContent: 'center'
  },
  titleText: {
    color: '#fff',
    alignSelf: 'center'
  }
});

class SelectedRequest extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.photos),
      error: ''
    };
  }

  handlePress(rowData) {
    this.props.navigator.push({
      title: rowData.username,
      component: Profile,
      passProps: {
        user_id: rowData.user_id,
        navigator: this.props.navigator
      }
    });
  }

  cameraRoll() {
    this.props.navigator.push({
      title: 'Camera Roll',
      component: CameraRollView,
      passProps: {
        // TODO: pass in request id and tags
        // request_id:
        // tags:
        // navigator: this.props.navigator
      }
    });
  }

  renderRow(rowData) {
    return (
      <View>
        <View style={styles.rowContainer}>
          <Image source={{uri: 'http://127.0.0.1:8888/photos/small/' + rowData.filename}} style={styles.image}/>
          <Text style={styles.username}> Submitted by: </Text>
          <TouchableHighlight
            onPress={this.handlePress.bind(this, rowData)}
            underlayColor='white'> 
            <Text> {rowData.username} </Text>
          </TouchableHighlight>
          <Text> {rowData.description} </Text>
        </View>
        <Separator/>
      </View>
    )
  }

  render(){
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
        <TouchableHighlight
          onPress={this.cameraRoll.bind(this)}
          underlayColor='white'>
          <Text> Upload Photo </Text>
          </TouchableHighlight>
      </View>
    )
  }
}

module.exports = SelectedRequest;