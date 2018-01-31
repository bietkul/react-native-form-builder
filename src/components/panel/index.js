import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Animated, Dimensions, View, Easing, Keyboard } from 'react-native';
import styles from './styles';

class Panel extends Component {

  static propTypes = {
    children: PropTypes.object,
  }

  constructor(props) {
    super(props);

    const { height } = Dimensions.get('window');

    this.state = {
      expanded: false,
      animation: new Animated.Value(0),
      maxHeight: (height / 4),
      minHeight: 0,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    Keyboard.dismiss();
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
        easing: Easing.InOut,
      }
    ).start();
  }


  render() {
    return (
      <Animated.View style={[styles.container, { height: this.state.animation }]}>
        <View style={styles.body}>
          {this.props.children}
        </View>
      </Animated.View>
    );
  }
}
export default Panel;