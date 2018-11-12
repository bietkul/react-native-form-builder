import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Keyboard, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import _ from 'lodash';
import TextInputField from '../fields/textInput';
import PickerField from '../fields/picker';
import SwitchField from '../fields/switch';
import DateField from '../fields/date';
import SelectField from '../fields/select';
import FormField from '../fields/form';
import baseTheme from '../theme';
import { autoValidate, getInitState, getDefaultValue, getResetValue } from '../utils/methods';

const DefaultErrorComponent = (props) => {
  const attributes = props.attributes;
  const theme = props.theme;
  if (attributes.error) {
    return (
      <Text style={{ color: theme.errorMsgColor }}>
        { attributes.errorMsg }
      </Text>
    );
  }
  return null;
};
export default class FormBuilder extends Component {
  static propTypes = {
    fields: PropTypes.array,
    theme: PropTypes.object,
    scrollViewProps: PropTypes.object,
    customComponents: PropTypes.object,
    formData: PropTypes.object,
    errorComponent: PropTypes.func,
    autoValidation: PropTypes.bool,
    customValidation: PropTypes.func,
    onValueChange: PropTypes.func,
  }
  constructor(props) {
    super(props);
    const initialState = getInitState(props.fields);
    this.state = {
      fields: {
        ...initialState,
      },
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
    // update the form fields
    this.updateState = this.updateState.bind(this);
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
  componentDidMount() {
    const { formData } = this.props;
    this.setValues(formData);
  }
  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.fields, this.props.fields)) {
      const nextState = this.updateState(this.props.fields);

      let fields = Object.assign({}, this.state.fields, nextState.fields);
      fields = _.omit(fields, nextState.hiddenFields);

      this.setState({ fields });
    }
  }
  updateState(fields) {
    const newFields = {};
    const hiddenFields = [];
    _.forEach(fields, (field) => {
      const fieldObj = field;
      if (!field.hidden && field.type) {
        const stateField = this.state.fields[field.name];
        fieldObj.value = stateField && stateField.value ? stateField.value : getDefaultValue(field);
        newFields[field.name] = fieldObj;
      } else if (field.hidden) {
        hiddenFields.push(field.name);
      }
    });
    return { fields: newFields, hiddenFields };
  }
  onSummitTextInput(name) {
    const { fields } = this.state;
    const index = Object.keys(fields).indexOf(name);
    if (index !== -1 && this[Object.keys(fields)[index + 1]]
      && this[Object.keys(fields)[index + 1]].textInput) {
      this[Object.keys(fields)[index + 1]].textInput._root.focus();
    } else {
      Keyboard.dismiss();
    }
  }
  onValueChange(name, value) {
    const valueObj = this.state.fields[name];
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
        this.setState({
          fields: {
            ...this.state.fields,
            ...newField,
          }
        }, () => this.props.onValueChange());
      } else {
        this.setState({
          fields: {
            ...this.state.fields,
            ...newField,
          }
        });
      }
    }
  }
  // Returns the values of the fields
  getValues() {
    const values = {};
    Object.keys(this.state.fields).forEach((fieldName) => {
      const field = this.state.fields[fieldName];
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
      this.state.fields[field.name].fields.forEach((item) => {
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
          const field = this.state.fields[item];
          if (field) {
            field.value = getDefaultValue(field);
            newFields[field.name] = this.getFieldDefaultValue(field);
          }
        });
        this.setState({
          fields: {
            ...this.state.fields,
            ...newFields,
          }
        });
      } else {
        const field = this.state.fields[args[0]];
        if (field) {
          const newField = {};
          newField[field.name] = this.getFieldDefaultValue(field);
          this.setState({
            fields: {
              ...this.state.fields,
              ...newFields,
            }
          });
        }
      }
    }
  }
  // Helper function for setValues
  getFieldValue(fieldObj, value) {
    const field = fieldObj;
    if (field.type === 'group') {
      const subFields = {};
      Object.keys(value).forEach((fieldName) => {
        subFields[fieldName] = value[fieldName];
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
  // Set Values
  // Params Format:
  // {name1: value1, name2: value2, ......}
  setValues(...args) {
    if (args && args.length && args[0]) {
      const newFields = {};
      Object.keys(args[0]).forEach((fieldName) => {
        const field = this.state.fields[fieldName];
        if (field) {
          newFields[field.name] = this.getFieldValue(field, args[0][fieldName]);
        }
      });
      this.setState({
        fields: {
          ...this.state.fields,
          ...newFields,
        }
      });
    }
  }
  // Reset Form values & errors NESTED SUPPORTED
  resetForm() {
    const newFields = {};
    Object.keys(this.state.fields).forEach((fieldName) => {
      const field = this.state.fields[fieldName];
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
    this.setState({
      fields: {
        ...this.state.fields,
        ...newFields,
      }
    });
  }
  generateFields() {
    const theme = Object.assign(baseTheme, this.props.theme);
    const { customComponents, errorComponent, fields } = this.props;
    // Use fields from props to maintain the order of the props if the hidden prop is changed
    const renderFields = fields.map(({ name: fieldName }, index) => {
      const field = this.state.fields[fieldName];
      if (field && !field.hidden) {
        const commonProps = {
          key: index,
          theme,
          attributes: this.state.fields[field.name],
          updateValue: this.onValueChange,
          ErrorComponent: errorComponent || DefaultErrorComponent,
        };
        if (customComponents) {
          const CustomComponentObj = customComponents[field.type];
          if (CustomComponentObj) {
            const CustomComponent = CustomComponentObj.component;
            const CustomComponentProps = CustomComponentObj.props;
            return (
              <CustomComponent
                ref={(c) => { this[field.name] = c; }}
                {... commonProps}
                {...CustomComponentProps}
                onSummitTextInput={this.onSummitTextInput}
              />
            );
          }
        }
        switch (field.type) {
          case 'text':
          case 'email':
          case 'number':
          case 'url':
          case 'password':
            return (
              <TextInputField
                ref={(c) => { this[field.name] = c; }}
                {... commonProps}
                onSummitTextInput={this.onSummitTextInput}
              />
            );
          case 'picker':
            return (
              <PickerField
                ref={(c) => { this[field.name] = c; }}
                {... commonProps}
              />
            );
          case 'select':
            return (
              <SelectField
                ref={(c) => { this[field.name] = c; }}
                {... commonProps}
              />
            );
          case 'switch':
            return (
              <SwitchField
                ref={(c) => { this[field.name] = c; }}
                {... commonProps}
              />
            );
          case 'date':
            return (
              <DateField
                ref={(c) => { this[field.name] = c; }}
                {... commonProps}
              />
            );
          case 'group':
            return (
              <FormField
                ref={(c) => { this[field.name] = c; }}
                {... commonProps}
                {...this.props}
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
        extraScrollHeight={20}
        {...this.props.scrollViewProps}
      >
        <View>
          {this.generateFields() || <View />}
        </View>
      </KeyboardAwareScrollView>

    );
  }
}