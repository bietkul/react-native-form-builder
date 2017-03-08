/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import _ from 'lodash';
import { Container, Content } from 'native-base';
import TextInputField from '../fields/textInput';
import PickerField from '../fields/picker';
import SwitchField from '../fields/switch';
import DateField from '../fields/date';
import SliderField from '../fields/slider';
import SelectField from '../fields/select';
import baseTheme from '../utils/theme';

function autoValidate(field) {
  let error = false;
  let errorMsg = '';
  if (field.required) {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'url':
      case 'password':
        if (field.value.trim() === '') {
          error = true;
          errorMsg = `${field.label} is required`;
        }
        break;
      case 'number':
        if (field.type === 'number') {
          if (field.value.trim() === '') {
            error = true;
            errorMsg = `${field.label} is required`;
          } else if (isNaN(field.value)) {
            errorMsg = `${field.label} Should be a number`;
          }
        }
        break;
      default:
    }
  }
  console.log('THIS IS ERROR', error, errorMsg);
  return { error, errorMsg };
}
function getDefaultValue(field) {
  switch (field.type) {
    case 'text':
    case 'number':
    case 'email':
    case 'password':
    case 'url':
      return field.defaultValue || '';
    case 'picker': {
      if ((field.options).indexOf(field.defaultValue) !== -1) {
        return field.defaultValue;
      }
      return field.options[0];
    }
    case 'select': {
      if (Array.isArray(field.defaultValue)) {
        const selected = [];
        if (!field.objectType) {
          field.defaultValue.forEach((item) => {
            if ((field.options).indexOf(item) !== -1) {
              selected.push(item);
            }
          });
        } else {
          field.defaultValue.forEach((item) => {
            if ((field.options).findIndex(option =>
              option[field.primaryKey] === item[field.primaryKey]
            ) !== -1) {
              selected.push(item);
            }
          });
        }
        return selected;
      }
      if (!field.multiple) {
        return field.defaultValue || null;
      }
      return [];
    }
    case 'switch':
      if (typeof field.defaultValue === 'boolean') {
        return field.defaultValue;
      }
      return false;
    case 'date':
      if (field.defaultValue && !_.isNaN(field.defaultValue.getTime())) {
        return field.defaultValue;
      }
      return null;
    default:
      return null;
  }
}

export default class FormBuilder extends Component {
  static propTypes = {
    fields: React.PropTypes.array,
    theme: React.PropTypes.object,
    autoValidation: React.PropTypes.bool,
    customValidation: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    const initialState = this.getInitState(props.fields);
    this.state = {
      ...initialState,
      errorStatus: false,
    };
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
  }

  /* Set particular field value to default
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
            newFields[field.name] = field;
          }
        });
        this.setState({ ...newFields });
      } else {
        const field = this.state[args[0]];
        if (field) {
          const newField = {};
          field.value = getDefaultValue(field);
          newField[field.name] = field;
          this.setState({ ...newField });
        }
      }
    }
  }

  resetForm() {
    const newFields = {};
    Object.keys(this.state).forEach((fieldName) => {
      const field = this.state[fieldName];
      if (field) {
        field.value = getDefaultValue(field);
        field.error = false;
        field.errorMsg = '';
        newFields[field.name] = field;
      }
    });
    console.log('HEY YOU ARE IN RESET FORM WILL RESET WHOLE FORM', newFields);
    this.setState({ ...newFields });
  }


  onValueChange(name, value) {
    console.log('VALUE IS CHANGING', name, value);
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
      this.setState({ ...newField });
    }
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
            field.value = item.value;
             // also check for errors
            if (this.props.autoValidation === undefined || this.props.autoValidation) {
              Object.assign(field, autoValidate(field));
            }
             // Validate through customValidation if it is present in props
            if (this.props.customValidation
                && typeof this.props.customValidation === 'function') {
              Object.assign(field, this.props.customValidation(field));
            }
            newFields[field.name] = field;
          }
        });
        this.setState({ ...newFields });
      } else {
        const field = this.state[args[0].name];
        if (field) {
          const newField = {};
          // also check for errors
          field.value = args[0].value;
          // also check for errors
          if (this.props.autoValidation === undefined || this.props.autoValidation) {
            Object.assign(field, autoValidate(field));
          }
          // Validate through customValidation if it is present in props
          if (this.props.customValidation
             && typeof this.props.customValidation === 'function') {
            Object.assign(field, this.props.customValidation(field));
          }
          newField[field.name] = field;
          this.setState({ ...newField });
        }
      }
    }
  }
  getInitState(fields) {
    const state = {};
    _.forEach(fields, (field) => {
      const fieldObj = field;
      fieldObj.error = false;
      fieldObj.errorMsg = '';
      if (!field.hidden && field.type) {
        fieldObj.value = getDefaultValue(field);
        state[field.name] = fieldObj;
      }
    });
    return state;
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
                attributes={this.state[field.name]}
                updateValue={this.onValueChange}
              />
            );
          case 'picker':
            return (
              <PickerField
                key={index}
                theme={theme}
                attributes={this.state[field.name]}
                updateValue={this.onValueChange}
              />
            );
          case 'select':
            return (
              <SelectField
                key={index}
                theme={theme}
                attributes={this.state[field.name]}
                updateValue={this.onValueChange}
              />
            );
          case 'switch':
            return (
              <SwitchField
                key={index}
                theme={theme}
                attributes={this.state[field.name]}
                updateValue={this.onValueChange}
              />
            );
          case 'date':
            return (
              <DateField
                key={index}
                theme={theme}
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
    console.log('THIS IS STATE & PROPS', this.state, this.props);
    return (
      <Container>
        <Content>
          {this.generateFields()}
          <SliderField />
        </Content>
      </Container>
    );
  }
}
