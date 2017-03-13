import React, { Component } from 'react';
import { View, Item, Input, Icon } from 'native-base';
import { Container, Content } from 'native-base';

import { Platform } from 'react-native';
import GenerateForm from 'react-native-form-builder';

export default class FormField extends Component {
  static propTypes = {
    attributes: React.PropTypes.object,
    theme: React.PropTypes.object,
    updateValue: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this);
  }
  componentDidMount() {
    this.props.updateValue(this.props.attributes.name, this.group.getValues());
  }
  onValueChange() {
    this.props.updateValue(this.props.attributes.name, this.group.getValues());
  }
  handleChange(text) {
    this.setState({
      value: text,
    }, () => this.props.updateValue(this.props.attributes.name, text));
  }
  render() {
    console.log('THISESRB ARE PROPS IN FORM', this.state, this.props);
    const attributes = this.props.attributes;
    const theme = this.props.theme;
    return (
      <GenerateForm
        ref={(c) => { this.group = c; }}
        onValueChange={this.onValueChange}
        autoValidation
        showErrors
        fields={attributes.fields}
        theme={theme}
      />
    );
  }
}
