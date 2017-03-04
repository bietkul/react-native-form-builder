import React, { Component } from 'react';
import { Picker, View, Text } from 'native-base';
import {Platform} from 'react-native';

const Item = Picker.Item;
export default class PickerField extends Component {
  static propTypes = {
    attributes: React.PropTypes.object,
    theme: React.PropTypes.object,
    updateValue: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      selected: props.attributes.options.indexOf(props.attributes.value).toString(),
    };
  }
  componentWillReceiveProps(nextProps) {
    const newAttributes = nextProps.attributes;
    if ((newAttributes && newAttributes.options.indexOf(nextProps.value)) !== this.state.selected) {
      this.setState({
        inputString: newAttributes.value,
      });
    }
  }
  handleChange(value) {
    const attributes = this.props.attributes;
    this.setState({
      selected: value,
    }, () => this.props.updateValue(attributes.name, attributes.options[value]));
  }
  render() {
    console.log('GUUGWG', this.state, this.props);
    const theme = this.props.theme;
    const attributes = this.props.attributes;
    return (
      <View
        style={{
          backgroundColor: theme.pickerBgColor,
          borderBottomColor: theme.inputBorderColor,
          borderBottomWidth: theme.borderWidth,
          marginHorizontal: 10,
          marginVertical: 0,
          marginLeft: 15,
          flexDirection: Platform.OS === 'ios' ? 'column' : 'row',
          alignItems: Platform.OS === 'ios' ? 'flex-start' : 'center',
          flex: 1,
        }}
      >
        <View style={{ flex: 7 }}>
          <Text style={{ color: theme.inputColorPlaceholder }}>{attributes.label}</Text>
        </View>
        <View style={{ flex: 3 }}>
          <Picker
            enabled={attributes.editable}
            style={{ padding: 2 }}
            textStyle={{ color: theme.pickerColorSelected }}
            iosHeader="Select one"
            mode={attributes.mode}
            selectedValue={this.state.selected}
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
}
