'use strict';

var React = require('react-native');
var api = require('../utils/api.js');
var Separator = require('./helpers/separator.js');
var Profile = require('./profile/app-profile');
var Login = require('./login.js');

var {
  View,
  Image,
  Text,
  ListView,
  TouchableHighlight,
  StyleSheet,
  NavigatorIOS
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
  }
});


class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
      error: ''
    };
  }

  componentDidMount() {
    api.getAllPhotos()
      .then((data) => {
        this.setState({
          dataSource: this.ds.cloneWithRows(data)
        });
      }).catch((err) => {
        console.log('Request failed', err);
        this.setState({error});
      });
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
      </View>
    )
  }
}

module.exports = Gallery;