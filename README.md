# react-native-form-builder

## Getting Started

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Properties](#properties)
  + [Basic](#basic)
  + [Custom basic style & content](#custom-basic-style--content)
  + [Pagination](#pagination)
  + [Autoplay](#autoplay)
  + [Control buttons](#control-buttons)
  + [Props of Children](#props-of-children)
  + [Basic props of `<ScrollView />`](#basic-props-of-scrollview-)
  + [Supported ScrollResponder](#supported-scrollresponder)
- [Examples](#examples)
- [Development](#development)

### Installation

```bash
$ npm i react-native-form-builder --save
```

### Basic Usage

- Install `react-native` first

```bash
$ npm i react-native -g
```
- Initialization of a react-native project

```bash
$ react-native init myproject
```

- Then, edit `myproject/index.ios.js`, like this:
Example: Login Form consisting of three fields (username, password, country)

```jsx
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { View, Text, Button } from 'native-base';
import GenerateForm from 'react-native-form-builder';

const styles = {
  wrapper: {
    flex: 1,
    marginTop: 150,
  },
  submitButton: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
};
// These Fields will create a login form with three fields 
const fields = [
  {
    type: 'text',
    name: 'user_name',
    required: true,
    icon: 'ios-person',
    label: 'Username',
  },
  {
    type: 'password',
    name: 'password',
    icon: 'ios-lock',
    required: true,
    label: 'Password',
  },
  {
    type: 'picker',
    name: 'country',
    mode: 'dialog',
    label: 'Select Country',
    defaultValue: 'INDIA',
    options: ['US', 'INDIA', 'UK', 'CHINA', 'FRANCE'],
  },
];
export default class FormGenerator extends Component {
  login() {
    const formValues = this.formGenerator.getValues();
    console.log('FORM VALUES', formValues);
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <View>
          <GenerateForm
            ref={(c) => {
              this.formGenerator = c;
            }}
            fields={fields}
          />
        </View>
        <View style={styles.submitButton}>
          <Button block onPress={() => this.login()}>
            <Text>Login</Text>
          </Button>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('FormGenerator', () => FormGenerator);
```
### Properties
#### Basic
| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| autoValidation | true | `bool` | if `false` then auto validation script will not run i.e formBuilder will not validate form data automatically. |
| customValidation | N/A | `function` | This function will be triggered everytime before a field changes it's value, here you can write your custom validation script & set error accordingly. |
| fields | `required` | `array` | Array of form fields. |

#### FormFields
##### Basic Structure
A field is an object which has the properties required to generate it.
It looks something like that :
```jsx
{ 
  type: 'text',
  name: 'user_name',
  label: 'Username'
}
```
##### Common Properties to all Fields
| Property  | Required  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| type | `yes` | `enum` only possible values are : {text, password, form, email, number, url, select, switch, date } | if `false` then auto validation script will not run i.e formBuilder will not validate form data automatically. |
| name | `yes` | `string` | Every field should has a name which works as an unique identifier for that field. |
| label | `yes` | `string` | Field label to display. |
| editable | `No` | `bool` | To decide that whether a field is editable or not. |
 
Goals
- Provide the facility to generate a form by just passing fields
- Also can generate custom component in form
- Support edit mode
- error handling & validation
- Every form component should be fully customizable
- Let’s start this awesome project
- Add support for custom component

Common Fields we are going to develop
- TextInput (with multiple support) (added)
- Picker (added)
- Switch (added)
- TextInput with fixed prefix
- TextInput with fixed suffix
- DatePicker (added)
- TimePicker (added)
- Date&TimePicker (added)
- Tags ( multiple support )
- Select ( Select one or multiple from many, select is the advanced version of picker
  in which you can select one or more than one fields in a row some of the specs are): -
  - Supports both objects & strings
  - Supports multiple
  - Supports CheckBox Support in case of multiple
- LookUp (multiple support) // After launch
- addMoreField ( In this field you can add field dynamically )
- Image Picker ( Upload Images )
- File Picker ( Upload Files )
- Radio (Select One at a time)
- CheckBox (Select Multiple)
- Slider
- Country
- Will add more

Required format of props
- Fields
{
   type: ’Type of field eg. text, date, dropdown’,
   name: ’Name of the field should be unique for all fields’,
   defaultValue: ‘Not compulsory, sets the initial value
   label: ‘Label for a particular field’
   required: true ( If the field is required )
   hidden: specify that the field is hidden by default false
}

Format of returned state fields
{
  field,
  error: ’boolean type true if there is some validation error’
  errorMsg,
  value: ‘Current Value Can be accessed by this’
}

PROPS IN FORM GENERATOR
- autoValidation
default: true
if false then auto validation script will not run

- customValidation
Custom validation function which will take field object & returns error object
{ error: boolean, errorMsg: string}

- showErrors
By default true means errors will be shown in respective fields

- fields
- theme


# FIELDS

## TextInput
### Supported Field Types
- text ( Can Be singleLine or Multiline, in case of multiline respective field should have ‘multiple : true’ entity, special props:- multiline: true)
- email ( special props: - validate: true/false default is true)
- number
- password
- url

### Note:- All other main props are also applicable
eg. maxLength
underlineColorAndroid default: ‘transparent
secureTextEntry
numberOfLines
placeholderTextColor (ADD THIS IN VARIABLE)
placeholder
editable
autoCorrect (ADD THIS IN VARIABLE)
autoCapitalize (ADD THIS IN VARIABLE)
minValue
maxValue in case of number

## Validations

Support for regex validation
for eg: -
 we can pass regex string for email validation
Suggested global prop
for eg:
urlRegex
emailRegex
Also support regex entity in field which has the priority over global props
Validators

isEmail
isEmpty
isUrl
isNumber
isInteger
isFloat
isName

Boolean -
isTrue
isFalse

form generator prop
clearOnClose Clears the values after unmounted
form Name
maxLength
isRangeBtw(min, max) //applied for numbers

We can also define custom error messages

Nested Fields
 {
  type: ‘text’,
  name: ‘Text’
},
{
  type: ‘address’,
  label: ‘Address’
  fields: [
    {
       type: ‘number
    }
   ,{}
   ]

### Internationalization Support
