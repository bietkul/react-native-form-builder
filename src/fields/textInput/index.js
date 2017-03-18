import React, { Component } from 'react';
import { View, Item, Input, Icon } from 'native-base';
import { Platform } from 'react-native';
import { getKeyboardType } from '../../utils/methods';

export default class TextInputField extends Component {
  static propTypes = {
    attributes: React.PropTypes.object,
    theme: React.PropTypes.object,
    updateValue: React.PropTypes.func,
  }
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: props.attributes.value || '',
  //   };
  // }
  // componentWillReceiveProps(nextProps) {
  //   const newAttributes = nextProps.attributes;
  //   if ((newAttributes && newAttributes.value) !== this.state.value) {
  //     this.setState({
  //       value: newAttributes.value,
  //     });
  //   }
  // }
  handleChange(text) {
    this.props.updateValue(this.props.attributes.name, text);
  }
  render() {
    console.log('THISESRB ARE PROPS IN TEXTINPUT', this.props);
    const attributes = this.props.attributes;
    const keyboardType = getKeyboardType(attributes.type);
    const theme = this.props.theme;
    return (
      <View
        style={{
          backgroundColor: theme.textInputBgColor,
          marginHorizontal: 10,
          marginVertical: 0,
          justifyContent: 'center',
        }}
      >
        <Item error={attributes.error}>
          <Input
            style={{ height: attributes.multiline && (Platform.OS === 'ios' ? undefined : null) }}
            underlineColorAndroid="transparent"
            placeholder={attributes.label}
            placeholderTextColor={theme.inputColorPlaceholder}
            multiline={attributes.multiline}
            secureTextEntry={attributes.secureTextEntry}
            editable={attributes.editable}
            numberOfLines={attributes.numberOfLines || 2}
            value={attributes.value}
            keyboardType={keyboardType}
            onChangeText={text => this.handleChange(text)}
          />
          { attributes.error ?
            <Icon name="close-circle" /> : null}
        </Item>
      </View>
    );
  }
}
