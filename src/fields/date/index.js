import React, { Component } from 'react';
import { View, Text } from 'native-base';
import I18n from 'react-native-i18n';
import { Platform, DatePickerIOS, DatePickerAndroid, TouchableOpacity, TimePickerAndroid } from 'react-native';
import Panel from '../../components/panel';

export default class DatePickerField extends Component {
  static defaultProps = {
    timeZoneOffsetInHours: (-1) * ((new Date()).getTimezoneOffset() / 60),
  };
  static propTypes = {
    attributes: React.PropTypes.object,
    updateValue: React.PropTypes.func,
    timeZoneOffsetInHours: React.PropTypes.number,
    theme: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      timeZoneOffsetInHours: props.timeZoneOffsetInHours,
      value: (props.attributes.value
      && new Date(props.attributes.value)) || null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const newAttributes = nextProps.attributes;
    if ((newAttributes && newAttributes.value) !== this.state.value) {
      this.setState({
        value: newAttributes.value,
      });
    }
  }
  onDateChange(date) {
    this.setState({ value: date },
      () => this.props.updateValue(this.props.attributes.name, this.state.value));
  }
  showTimePicker = async (stateKey) => {
    const currentDate = this.state.value || new Date();
    try {
      const { action, minute, hour } = await TimePickerAndroid.open({
        hour: currentDate.getHours(),
        minute: currentDate.getMinutes(),
      });
      if (action === TimePickerAndroid.timeSetAction) {
        const date = currentDate;
        date.setHours(hour);
        date.setMinutes(minute);
        this.onDateChange(date);
      }
    } catch ({ code, message }) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };
  showDatePicker = async (stateKey) => {
    const currentDate = this.state.value || new Date();
    try {
      const { action, year, month, day } = await DatePickerAndroid.open(
        {
          date: currentDate,
          minDate: this.props.attributes.minDate,
          maxDate: this.props.attributes.maxDate,
        }
      );
      if (action !== DatePickerAndroid.dismissedAction) {
        const currentHour = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();
        const date = new Date(year, month, day);
        if (currentHour) {
          date.setHours(currentHour);
        }
        if (currentMinutes) {
          date.setMinutes(currentMinutes);
        }
        this.onDateChange(date);
      }
    } catch ({ code, message }) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };
  render() {
    const theme = this.props.theme;
    const attributes = this.props.attributes;
    const mode = attributes.mode || 'datetime';
    return (
      <View>
        { (Platform.OS === 'ios') ?
          <View
            style={{
              backgroundColor: theme.pickerBgColor,
              borderBottomColor: theme.inputBorderColor,
              borderBottomWidth: theme.borderWidth,
              marginHorizontal: 10,
              marginVertical: 0,
              marginLeft: 15,
            }}
          >
            <TouchableOpacity
              onPress={() => this.panel.toggle()}
              style={{
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ color: theme.labelActiveColor }}>{attributes.label}</Text>
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
                    { (this.state.value && I18n.strftime(this.state.value, '%d %b %Y')) || 'None' }
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
                    { (this.state.value && I18n.strftime(this.state.value, '%I:%M %p')) || 'None' }
                  </Text>
                </View>
            }
              </View>
            </TouchableOpacity>
            <Panel
              ref={(c) => { this.panel = c; }}
            >
              <DatePickerIOS
                date={this.state.value || new Date()}
                mode={mode}
                maximumDate={attributes.maxDate}
                minimumDate={attributes.minDate}
                timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                onDateChange={this.onDateChange}
              />
            </Panel>
          </View>
            :
          <TouchableOpacity
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
            <Text style={{ color: theme.labelActiveColor }}>{attributes.label}</Text>
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              {
                  (attributes.mode === 'date'
                  || attributes.mode === 'datetime')
                &&
                <TouchableOpacity
                  hitSlop={{ top: 10, bottom: 10, right: 50, left: 50 }}
                  style={{
                    marginHorizontal: 5,
                  }}
                >
                  <Text onPress={() => this.showDatePicker()}>
                    { (this.state.value && I18n.strftime(this.state.value, '%d %b %Y')) || 'Date' }
                  </Text>
                </TouchableOpacity>
            }
              {
                (attributes.mode === 'time'
                || attributes.mode === 'datetime')
              &&
              <TouchableOpacity
                hitSlop={{ top: 10, bottom: 10, right: 50, left: 50 }}
                style={{
                  marginHorizontal: 5,
                }}
              >
                <Text onPress={() => this.showTimePicker()}>
                  { (this.state.value && I18n.strftime(this.state.value, '%I:%M %p')) || 'Time' }
                </Text>
                </TouchableOpacity>
            }
            </View>
          </TouchableOpacity>


                }
      </View>

    );
  }
}
