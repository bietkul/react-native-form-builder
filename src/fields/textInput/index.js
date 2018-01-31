import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Item, Input, Icon, ListItem, Text } from 'native-base';
import { Platform } from 'react-native';
import { getKeyboardType } from '../../utils/methods';

export default class TextInputField extends Component {
  static propTypes = {
    attributes: PropTypes.object,
    theme: PropTypes.object,
    updateValue: PropTypes.func,
    onSummitTextInput: PropTypes.func,
    ErrorComponent: PropTypes.func,
  }
  handleChange(text) {
    this.props.updateValue(this.props.attributes.name, text);
  }
  render() {
    const { theme, attributes, ErrorComponent } = this.props;
    const inputProps = attributes.props;
    const keyboardType = getKeyboardType(attributes.type);
    return (
      <ListItem style={{ borderBottomWidth: 0, paddingVertical: 5 }}>
        <View style={{ flex: 1 }}>
          <View>
            <Item error={theme.changeTextInputColorOnError ? attributes.error : null}>
              { attributes.icon &&
              <Icon color={theme.textInputIconColor} name={attributes.icon} />
                }
              <Input
                style={{
                  height: inputProps && inputProps.multiline && (Platform.OS === 'ios' ? undefined : null),
                  padding: 0,
                }}
                ref={(c) => { this.textInput = c; }}
                underlineColorAndroid="transparent"
                numberOfLines={3}
                secureTextEntry={attributes.secureTextEntry || attributes.type === 'password'}
                placeholder={attributes.label}
                blurOnSubmit={false}
                onSubmitEditing={() => this.props.onSummitTextInput(this.props.attributes.name)}
                placeholderTextColor={theme.inputColorPlaceholder}
                editable={attributes.editable}
                value={attributes.value && attributes.value.toString()}
                keyboardType={keyboardType}
                onChangeText={text => this.handleChange(text)}
                {...inputProps}
              />
              { theme.textInputErrorIcon && attributes.error ?
                <Icon name={theme.textInputErrorIcon} /> : null}
            </Item>
          </View>
          <ErrorComponent {...{ attributes, theme }} />
        </View>
      </ListItem>
    );
  }
}