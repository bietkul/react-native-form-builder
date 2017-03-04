import React, { Component } from 'react';
import { View, Text } from 'native-base';
import I18n from 'react-native-i18n';
import { Platform, DatePickerIOS, DatePickerAndroid, TouchableOpacity, TimePickerAndroid } from 'react-native';
import Panel from './panel';

export default class DatePickerField extends Component {
  static defaultProps = {
    timeZoneOffsetInHours: (-1) * ((new Date()).getTimezoneOffset() / 60),
  };
  static propTypes = {
    attributes: React.PropTypes.object,
    timeZoneOffsetInHours: React.PropTypes.number,
  }
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      timeZoneOffsetInHours: props.timeZoneOffsetInHours,
      selectedDate: (props.attributes.value
      && new Date(props.attributes.value)) || null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }
  onDateChange(date) {
    this.setState({ selectedDate: date });
  }
  showTimePicker = async (stateKey) => {
    const currentDate = this.state.selectedDate || new Date();
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
    const currentDate = this.state.selectedDate || new Date();
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
    console.log('PROPS IN DATE PICKER', this.props, this.state);
    const theme = this.props.theme;
    const attributes = this.props.attributes;
    const mode = attributes.mode || 'datetime';
    return (
      <View>
        { (Platform.OS === 'ios') ?
          <Panel
            label={attributes.label}
            value={this.state.selectedDate}
            mode={mode}
            theme={theme}
          >
            <DatePickerIOS
              date={this.state.selectedDate || new Date()}
              mode={mode}
              timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
              onDateChange={this.onDateChange}
            />
          </Panel>
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
                    { (this.state.selectedDate && I18n.strftime(this.state.selectedDate, '%d %b %Y')) || 'Date' }
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
                  { (this.state.selectedDate && I18n.strftime(this.state.selectedDate, '%I:%M %p')) || 'Time' }
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
