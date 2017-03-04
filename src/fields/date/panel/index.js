import React, { Component } from 'react';
import { TouchableOpacity, Animated, Dimensions, View, Text } from 'react-native'; // Step 1
import I18n from 'react-native-i18n';
import styles from './styles';

const _ = require('lodash');

class Panel extends Component {

  static propTypes = {
    label: React.PropTypes.string,
    value: React.PropTypes.object,
    theme: React.PropTypes.object,
    children: React.PropTypes.object,
    mode: React.PropTypes.string,
  }

  constructor(props) {
    super(props);

    const { height } = Dimensions.get('window');

    this.state = {
      expanded: false,
      animation: new Animated.Value(45),
      maxHeight: (height / 3),
      minHeight: 45,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const initialValue = this.state.expanded ?
    (this.state.maxHeight + this.state.minHeight) : this.state.minHeight;
    const finalValue = this.state.expanded ?
    this.state.minHeight : (this.state.maxHeight + this.state.minHeight);

    this.setState({
      expanded: !this.state.expanded,
    });

    this.state.animation.setValue(initialValue);
    Animated.timing(
      this.state.animation,
      {
        toValue: finalValue,
        duration: 500,
      }
    ).start();
  }


  render() {
    const { theme, mode, label, value } = this.props;
    return (
      <Animated.View style={[styles.container, { height: this.state.animation }]}>
        <TouchableOpacity
          onPress={this.toggle}
          style={{
            backgroundColor: theme.pickerBgColor,
            borderBottomColor: theme.inputBorderColor,
            borderBottomWidth: theme.borderWidth,
            marginHorizontal: 10,
            marginVertical: 0,
            paddingVertical: 10,
            marginLeft: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ color: theme.labelActiveColor }}>{label}</Text>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            {
            (mode ?
              (mode === 'date'
              || mode === 'datetime')
            : true) &&
            <View
              style={{
                marginHorizontal: 5,
              }}
            >
              <Text>
                { (value && I18n.strftime(value, '%d %b %Y')) || 'None' }
              </Text>
            </View>
        }
            {
            (mode ?
              (mode === 'time'
              || mode === 'datetime')
            : true) &&
            <View
              style={{
                marginHorizontal: 5,
              }}
            >
              <Text>
                { (value && I18n.strftime(value, '%I:%M %p')) || 'None' }
              </Text>
            </View>
        }
          </View>
        </TouchableOpacity>
        <View style={styles.body}>
          {this.props.children}
        </View>
      </Animated.View>
    );
  }
}
export default Panel;
