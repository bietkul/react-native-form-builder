import React, { Component } from 'react';
import { View, Item, Input, Icon, ListItem, Text } from 'native-base';
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
    const inputProps = attributes.props;
    const keyboardType = getKeyboardType(attributes.type);
    const theme = this.props.theme;
    return (
      <ListItem style={{ borderWidth: 0, paddingVertical: 5 }}>
        <View style={{ flex: 1 }}>
          <View>
            <Item error={attributes.error}>
              { attributes.iconName &&
              <Icon name={attributes.iconName} />
                }
              <Input
                style={{
                  height: inputProps && inputProps.multiline && (Platform.OS === 'ios' ? undefined : null),
                  padding: 0,
                }}
                underlineColorAndroid="transparent"
                numberOfLines={3}
                placeholder={attributes.label}
                placeholderTextColor={theme.inputColorPlaceholder}
                editable={attributes.editable}
                value={attributes.value}
                keyboardType={keyboardType}
                onChangeText={text => this.handleChange(text)}
                {...inputProps}
              />
              { attributes.error ?
                <Icon name="close-circle" /> : null}
            </Item>
          </View>
          <Text style={{ color: '#ed2f2f' }}>
            {attributes.errorMsg}
          </Text>
        </View>
      </ListItem>

    );
  }
}
