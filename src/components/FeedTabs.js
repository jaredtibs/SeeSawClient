import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const FeedTabs = React.createClass({
  tabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
  },

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  },

  setAnimationValue({ value, }) {
    this.tabIcons.forEach((icon, i) => {
      const progress = Math.min(1, Math.abs(value - i))
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  },

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 59 + (204 - 59) * progress;
    const green = 89 + (204 - 89) * progress;
    const blue = 152 + (204 - 152) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  },

  render() {
    let hasPosts = true;
    let currentFeed = 'recent';

    return(
      <View style={[styles.tabs, this.props.style, ]}>
        {this.props.tabs.map((tab, i) => {
          return(
            <View style={styles.tab}>
              <View style={styles.feedButtons}>
                <TouchableHighlight
                  disabled={!hasPosts}
                  style={ (currentFeed == 'recent' && hasPosts) ? styles.buttonActiveContainer : styles.buttonContainer }
                  underlayColor='#F2F2F4'
                  onPress={() => this._toggleFeed('recent')}>
                  <Text style={ (currentFeed == 'recent' && hasPosts) ? styles.buttonActiveText : styles.buttonText}>
                    RECENT
                  </Text>
                </TouchableHighlight>

                <TouchableHighlight
                  disabled={!hasPosts}
                  style={ (currentFeed == 'popular' && hasPosts) ? styles.buttonActiveContainer : styles.buttonContainer }
                  underlayColor='#F2F2F4'
                  onPress={() => this._toggleFeed('popular')}>
                  <Text style={ (currentFeed == 'popular' && hasPosts) ? styles.buttonActiveText : styles.buttonText}>
                    POPULAR
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          )
        })}
      </View>
    )
  },
});

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 10
  },

  tab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(216,216,216,.50)',
    width: 197,
    height: 40,
    padding: 10
  },


});

export default FeedTabs;
