import React, { Component } from 'react';
import { View, Text } from 'native-base';
import { Platform, Picker, TouchableOpacity } from 'react-native';
import Panel from '../../components/panel';
import styles from './../../styles';

const Item = Picker.Item;
export default class PickerField extends Component {
  static propTypes = {
    attributes: React.PropTypes.object,
    theme: React.PropTypes.object,
    updateValue: React.PropTypes.func,
  }
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: props.attributes.options.indexOf(props.attributes.value).toString(),
  //   };
  // }
  // componentWillReceiveProps(nextProps) {
  //   const newAttributes = nextProps.attributes;
  //   if ((newAttributes
  //     && newAttributes.options.indexOf(newAttributes.value)).toString() !== this.state.value) {
  //     this.setState({
  //       value: newAttributes.options.indexOf(newAttributes.value).toString(),
  //     });
  //   }
  // }
  handleChange(value) {
    const attributes = this.props.attributes;
    this.props.updateValue(attributes.name, attributes.options[value]);
  }
  render() {
    const { theme, attributes } = this.props;
    const isValueValid = attributes.options.indexOf(attributes.value) > -1;
    console.log('PROPS IN PICKER FIELDS',
    attributes,
    attributes.options,
    attributes.options.indexOf(attributes.value),
    attributes.options[attributes.value]);
    const pickerValue = attributes.options.indexOf(attributes.value).toString();
    if (Platform.OS !== 'ios') {
      return (
        <View
          style={Object.assign(styles.pickerMainAndroid, {
            backgroundColor: theme.pickerBgColor,
            borderBottomColor: theme.inputBorderColor,
            borderBottomWidth: theme.borderWidth,
          })}
        >
          <View style={{ flex: 7 }}>
            <Text style={{ color: theme.inputColorPlaceholder }}>{attributes.label}</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Picker
              style={{ padding: 2 }}
              textStyle={{ color: theme.pickerColorSelected }}
              iosHeader="Select one"
              mode={attributes.mode}
              selectedValue={pickerValue}
              onValueChange={value => this.handleChange(value)}
            >{
                attributes.options.map((item, index) => (
                  <Item key={index} label={item} value={`${index}`} />
                  ))
              }
            </Picker>
          </View>
        </View>

      );
    }
    return (
      <View
        style={Object.assign(styles.pickerMainIOS, {
          backgroundColor: theme.pickerBgColor,
          borderBottomColor: theme.inputBorderColor,
          borderBottomWidth: theme.borderWidth,
        })}
      >
        <TouchableOpacity
          onPress={() => this.panel.toggle()}
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
          }}
        >
          <Text style={{ color: theme.inputColorPlaceholder }}>
            {attributes.label}
          </Text>
          <Text style={{ color: theme.inputColorPlaceholder }}>
            {isValueValid ? attributes.value : 'None'}
          </Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Panel
            ref={(c) => { this.panel = c; }}
          >
            <Picker
              style={{ padding: 2 }}
              textStyle={{ color: theme.pickerColorSelected }}
              mode={attributes.mode}
              selectedValue={pickerValue}
              onValueChange={value => this.handleChange(value)}
            >{
                attributes.options.map((item, index) => (
                  <Item key={index} label={item} value={`${index}`} />
                  ))
              }
            </Picker>
          </Panel>
        </View>
      </View>

    );
  }
}
