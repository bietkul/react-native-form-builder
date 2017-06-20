import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextInputField from '../fields/textInput';
import PickerField from '../fields/picker';
import SwitchField from '../fields/switch';
import DateField from '../fields/date';
import SelectField from '../fields/select';
import FormField from '../fields/form';
import baseTheme from '../theme';
import { autoValidate, getInitState, getDefaultValue, getResetValue } from '../utils/methods';


export default class FormBuilder extends Component {
  static propTypes = {
    fields: React.PropTypes.array,
    theme: React.PropTypes.object,
    autoValidation: React.PropTypes.bool,
    customValidation: React.PropTypes.func,
    onValueChange: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    const initialState = getInitState(props.fields);
    this.state = {
      ...initialState,
      errorStatus: false,
    };
    // Supports Nested
    this.getValues = this.getValues.bind(this);
    // Invoked every time whenever any fields's value changes
    this.onValueChange = this.onValueChange.bind(this);
    // Generate fields
    this.generateFields = this.generateFields.bind(this);
    // forcefully set values for particular fields
    this.setValues = this.setValues.bind(this);
    // forcefully set default values for particular fields
    this.setToDefault = this.setToDefault.bind(this);
    /*
     forcefully set errors for a particular field
    this.setErrors = this.setErrors.bind(this);
     reset errors to default for all fields
    this.resetErrors = this.resetErrors.bind(this);
     reset values to default for all fields
    this.resetValues = this.resetValues.bind(this);
    Currently Not needed but can be added in future
    */
    //  reset form values to default as well as errors
    this.resetForm = this.resetForm.bind(this);
    // Manages textInput Focus
    this.onSummitTextInput = this.onSummitTextInput.bind(this);
  }
  onSummitTextInput(name) {
    const index = Object.keys(this.state).indexOf(name);
    if (index !== -1 && this[Object.keys(this.state)[index + 1]]
    && this[Object.keys(this.state)[index + 1]].textInput) {
      this[Object.keys(this.state)[index + 1]].textInput._root.focus();
    } else {
      Keyboard.dismiss(); 
    }
  }
  onValueChange(name, value) {
    const valueObj = this.state[name];
    if (valueObj) {
      valueObj.value = value;
      // Not Validate fields only when autoValidation prop is false
      if (this.props.autoValidation === undefined || this.props.autoValidation) {
        Object.assign(valueObj, autoValidate(valueObj));
      }
      // Validate through customValidation if it is present in props
      if (this.props.customValidation
         && typeof this.props.customValidation === 'function') {
        Object.assign(valueObj, this.props.customValidation(valueObj));
      }
      const newField = {};
      newField[valueObj.name] = valueObj;
      // this.props.customValidation(valueObj);
      if (this.props.onValueChange &&
        typeof this.props.onValueChange === 'function') {
        this.setState({ ...newField }, () => this.props.onValueChange());
      } else {
        this.setState({ ...newField });
      }
    }
  }
  // Returns the values of the fields
  getValues() {
    const values = {};
    Object.keys(this.state).forEach((fieldName) => {
      const field = this.state[fieldName];
      if (field) {
        values[field.name] = field.value;
      }
    });
    return values;
  }
  // Helper function fro setToDefault
  getFieldDefaultValue(fieldObj) {
    const field = fieldObj;
    if (field.type === 'group') {
      const allFields = [];
      this.state[field.name].fields.forEach((item) => {
        allFields.push(item.name);
      });
      this[field.name].group.setToDefault(allFields);
      field.value = this[field.name].group.getValues();
    } else {
      field.value = getDefaultValue(field);
    }
    return field;
  }
  /* Set particular field value to default SUPPORTS NESTED FORMS
  Required Form
   For multiple Fields
   [fieldName1, fieldName2, fieldName3 .....]
   For Single Field
  (fieldName1)
  */
  setToDefault(...args) {
    if (args && args.length) {
      if (typeof args[0] === 'object') {
        const newFields = {};
        args[0].forEach((item) => {
          const field = this.state[item];
          if (field) {
            field.value = getDefaultValue(field);
            newFields[field.name] = this.getFieldDefaultValue(field);
          }
        });
        this.setState({ ...newFields });
      } else {
        const field = this.state[args[0]];
        if (field) {
          const newField = {};
          newField[field.name] = this.getFieldDefaultValue(field);
          this.setState({ ...newField });
        }
      }
    }
  }
  // Helper function for setValues
  getFieldValue(fieldObj, value) {
    const field = fieldObj;
    if (field.type === 'group') {
      const subFields = [];
      Object.keys(value).forEach((fieldName) => {
        const setValueObj = {};
        setValueObj.name = fieldName;
        setValueObj.value = value[fieldName];
        subFields.push(setValueObj);
      });
      this[field.name].group.setValues(subFields);
      field.value = this[field.name].group.getValues();
      // Remaing thing is error Handling Here
    } else {
      field.value = value;
        // also check for errors
      if (this.props.autoValidation === undefined || this.props.autoValidation) {
        Object.assign(field, autoValidate(field));
      }
        // Validate through customValidation if it is present in props
      if (this.props.customValidation
           && typeof this.props.customValidation === 'function') {
        Object.assign(field, this.props.customValidation(field));
      }
    }
    return field;
  }
  /* Required Form
    For multiple fields
   [{name: , value: }, {name: , value: }.....]
   For single field
  {name: , value: }
  */
  setValues(...args) {
    if (args && args.length) {
      if (args[0].length) {
        const newFields = {};
        args[0].forEach((item) => {
          const field = this.state[item.name];
          if (field) {
            newFields[field.name] = this.getFieldValue(field, item.value);
          }
        });
        this.setState({ ...newFields });
      } else {
        const field = this.state[args[0].name];
        if (field) {
          const newField = {};
          newField[field.name] = this.getFieldValue(field, args[0].value);
          this.setState({ ...newField });
        }
      }
    }
  }
  // Reset Form values & errors NESTED SUPPORTED
  resetForm() {
    const newFields = {};
    Object.keys(this.state).forEach((fieldName) => {
      const field = this.state[fieldName];
      if (field) {
        field.value = (field.editable !== undefined && !field.editable) ?
          getDefaultValue(field) :
          getResetValue(field);
        field.error = false;
        field.errorMsg = '';
        if (field.type === 'group') {
          this[field.name].group.resetForm();
        }
        newFields[field.name] = field;
      }
    });
    this.setState({ ...newFields });
  }
  generateFields() {
    const theme = Object.assign(baseTheme, this.props.theme);
    const renderFields = Object.keys(this.state).map((fieldName, index) => {
      const field = this.state[fieldName];
      if (!field.hidden) {
        switch (field.type) {
          case 'text':
          case 'email':
          case 'number':
          case 'url':
          case 'password':
            return (
              <TextInputField
                key={index}
                theme={theme}
                ref={(c) => { this[field.name] = c; }}
                onSummitTextInput={this.onSummitTextInput}
                attributes={this.state[field.name]}
                updateValue={this.onValueChange}
              />
            );
          case 'picker':
            return (
              <PickerField
                key={index}
                theme={theme}
                ref={(c) => { this[field.name] = c; }}
                attributes={this.state[field.name]}
                updateValue={this.onValueChange}
              />
            );
          case 'select':
            return (
              <SelectField
                key={index}
                theme={theme}
                ref={(c) => { this[field.name] = c; }}
                attributes={this.state[field.name]}
                updateValue={this.onValueChange}
              />
            );
          case 'switch':
            return (
              <SwitchField
                key={index}
                theme={theme}
                ref={(c) => { this[field.name] = c; }}
                attributes={this.state[field.name]}
                updateValue={this.onValueChange}
              />
            );
          case 'date':
            return (
              <DateField
                key={index}
                theme={theme}
                ref={(c) => { this[field.name] = c; }}
                attributes={this.state[field.name]}
                updateValue={this.onValueChange}
              />
            );
          case 'group':
            return (
              <FormField
                key={index}
                theme={theme}
                ref={(c) => { this[field.name] = c; }}
                attributes={this.state[field.name]}
                updateValue={this.onValueChange}
              />
            );
          default:
            return null;
        }
      }
    });
    return renderFields;
  }
  render() {
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
      >
        <View>
          {this.generateFields() || <View />}
        </View>
      </KeyboardAwareScrollView>

    );
  }
}
