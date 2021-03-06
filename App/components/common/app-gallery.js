'use strict';

var React = require('react-native');
// var PhotosStore = require('../../stores/app-photosStore.js')
var Separator = require('../helpers/separator.js');
var RecentsHeader = require('./app-tabHeader.js');

var {
  View,
  Image,
  Text,
  ListView,
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
    flex: 1,
    flexDirection: 'column',
  },
  username: {
    color: '#523A54',
    textAlign: 'right',
    fontSize: 10
  }
});

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    console.log('app-gallery props: ', props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
  }

  renderHeader(){
    return (
      <RecentsHeader />
    )
  }

  renderRow(rowData) {
    return (
      <View>
        <View style={styles.rowContainer}>
          <Image source={{uri: 'http://127.0.0.1:8888/photos/' + rowData.filename}} style={styles.image}/>
          <Text style={styles.username}> Submitted by: {rowData.username} </Text>
          <Text> {rowData.description} </Text>
        </View>
        <Separator/>
      </View>
    )
  }

  render(){
    var dataSource = this.ds.cloneWithRows(this.props.photos)

    return (
      <View style={styles.container}>
        <ListView 
          dataSource={dataSource}
          renderRow={this.renderRow} 
          renderSectionHeader={this.renderHeader.bind(this)}/>
      </View>
    );
  }
}

module.exports = Gallery;