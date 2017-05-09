import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux'

import {
  View,
  Text,
  StyleSheet,
  ListView
} from 'react-native';

import HeaderBar from '../components/HeaderBar';
import Notification from '../components/Notification';

class Notifications extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchNotifications();
  }

  renderRow(rowData) {
    return(
      <Notification notification={rowData} />
    )
  }

  renderEmptyState() {
    return(
      <View style={styles.emptyNotifications}>
        <Text style={styles.emptyText}>
          You don't have any notifications at the moment.{"\n"}
          Check back later.
        </Text>
      </View>
    )
  }

  render() {
    const { notifications } = this.props.notifications;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let dataSource = ds.cloneWithRows(notifications);

    return (
      <View style={styles.container}>
        <HeaderBar
          goBack={() => Actions.pop()}
          header="Notifications"
        />
        <View style={styles.subHeaderBar}>
          <Text style={styles.subHeaderText}> Activity </Text>
        </View>
        {notifications.length > 0 ?
          <ListView
            enableEmptySections={true}
            dataSource={dataSource}
            contentContainerStyle={styles.notificationsList}
            renderRow={(rowData) => this.renderRow(rowData)}>
          </ListView>
          : this.renderEmptyState()}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  subHeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    backgroundColor: '#F1F1F1',
    borderTopColor: '#E1E1E1',
    borderTopWidth: 1,
    borderBottomColor: '#E1E1E1',
    borderBottomWidth: 1
  },

  subHeaderText: {
    fontSize: 12,
    fontFamily: 'MaisonNeueTRIAL-Bold',
    color: '#2F2F30',
    marginLeft: 10
  },

  emptyNotifications: {
    flex: 1,
    height: 250,
    alignItems: 'center',
    marginTop: 100
  },

  emptyText: {
    fontFamily: 'MaisonNeueTRIAL-Demi',
    fontSize: 12,
    textAlign: 'center',
    color: 'rgba(52,52,66,.50)',
    lineHeight: 20,
  },

  notificationsList: {
    flex: 1,
    alignItems: 'center',
  },

})

export default Notifications;
