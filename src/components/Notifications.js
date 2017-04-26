import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ListView
} from 'react-native';

class Notifications extends Component {
  constructor(props) {
    super(props)
  }

  renderRow(rowData) {
    return(
      <View style={styles.row}>
        <Text> {rowData} </Text>
      </View>
    )
  }

  renderEmptyState() {
    return(
      <View style={styles.emptyNotifications}>
        <Text style={styles.emptyText}>
          No notifications to display
        </Text>
      </View>
    )
  }

  render() {
    //const { notifications } = this.props;
    const notifications = ["so and so liked your post", "jane doe liked your post", "you have three unread posts at this location", "bruce wayne upvoted your post"]
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let dataSource = ds.cloneWithRows(notifications);

    return (
      <View style={styles.container}>
        <View style={styles.subheaderBar}>
          <Text> Activity </Text>
        </View>
        {notifications.length > 0 ?
          <ListView
            enableEmptySections={true}
            dataSource={dataSource}
            style={styles.notificationsList}
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },

  emptyNotifications: {
    flex: 1,
    height: 250,
    justifyContent: 'flex-start',
    alignItems: 'center'
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
  },

  subheaderBar: {
    flexDirection: 'row',
    height: 100
  },

  row: {
    flex: 1,
    flexDirection: 'row',
  }
})

export default Notifications;
