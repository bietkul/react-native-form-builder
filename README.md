# react-native-form-builder
![alt text](http://g.recordit.co/7PqX8Ft7VO.gif)
## Features
- Generate Form Fields UI
- Manage, track state & values of fields
- Automatically manages focus to next field on submit (TextInput)
- Handle all keyboard related problems smartly
- Supports custom validations & nested forms

## Getting Started

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Properties](#properties)
  + [Basic](#basic)
  + [Methods](#methods)
  - [Form Fields](#form-fields)
    + [Field Structure](#field-structure)
    + [Common Properties to all Fields](#common-properties-to-all-fields)
    - [Field Types](#field-types)
      + [TextInput](#textinput)
      + [Picker](#picker)
      + [Switch](#switch)
      + [Date](#date)
      + [Select](#select)
   + [Nested Forms](#nested-forms)
   + [Add Custom Validations](#add-custom-validations)
   + [Customize Your Form](#customize-your-form)

## Installation

```bash
$ npm i react-native-form-builder --save
```

## Basic Usage

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
## Properties
### Basic
| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| autoValidation | true | `bool` | if `false` then auto validation script will not run i.e formBuilder will not validate form data automatically. |
| onValueChange | N/A | `function` | Invoked every time after a field changes it's value |
| customValidation | N/A | `function` | This function will be triggered everytime before a field changes it's value, here you can write your custom validation script & set error accordingly. |
| fields | `required` | `array` | Array of form fields. |

### Methods:
Currently, these methods are available in FormBuilder, you can access them by using ref property.

### getValues
To extract the values of form fields.  
Returns: An object consisting of field values (fieldName: value).  
for e.g    
```
{
  username: 'bietkul'
  password: 'bietkul@git'
}
```
### setValues
Forcefully set values for particular fields.
Parameters: An array of objects, where every object must has two keys :  
name: Field name for which value has to be set.  
value: Value for that particular field  
For e.g
```
[{name: String, value: any}, {name: String, value: any}.....]
```
### resetForm
Reset Form values as well as errors.
### setToDefault
Forcefully set values to default for particular fields.  
Parameters: An array of strings, where every string is the name of a field for which value has to be set as default value.  
For e.g
```
[fieldName1, fieldName2, fieldName3 .....]
```

### Form Fields
### Field Structure
A field is an object which has the properties required to generate it.
It looks something like that :
```jsx
{
  type: 'text',
  name: 'user_name',
  label: 'Username'
}
```
### Common Properties to all Fields
These properties are applicable on all fields.

| Property  | Required  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| type | `yes` | `enum` only possible values are : { text, password, group, email, number, url, select, switch, date } | To define type of field. |
| name | `yes` | `string` | Every field should has a name which works as an unique identifier for that field. |
| label | `yes` | `string` | Field label to display. |
| editable | `No` | `bool` | To decide that whether a field is editable or not. |
| required | `No` | `bool` | Helps to decide if a field can has empty value or not. Doesn't work in case of `autoValidation = false` . |
| defaultValue | `No` | `Depends on field's type` | Sets the intial value for that field before the form initialization. |
| hidden | `No` | `bool` | If `true` then a field will not be displayed. |

### Field Types
### TextInput
Supports all these kind of types :-
text,
password,
email,
url,
number

#### Extra Properties
| Props  | Default | Type | Description |
| :------------ |:--------------- |:---------------| :-----|
| iconName | N/A | `string` | Sets the icon, you can use any icon name which is available in `react-native-vector-icons`|  
| iconOrientaion | `left (default)` or `right` | `string` | Adjust icon orientation |
| props | N/A | `object` | Here you can define extra props which are applicable for react native TextInput Component. For e.g. { multiline: true, secureTextEntry : true .... }

#### Value Type : `String` ( Except for type `number` )

### Picker
`type: picker`
Uses native picker

#### Extra Properties
| Props  | Default | Type | Description |
| :------------ |:--------------- |:---------------| :-----|
| options (required) | N/A | `array` | An array of strings to define available options for e.g. ['CAR', 'BIKE', 'BICYCLE'] |
| props | N/A | `object` | Here you can define extra props which are applicable of react native Picker Component for e.g. { mode: 'dropdown', .... }

#### Value Type : `String`

#### Default Value Type :
You can set default value as a string which must be present in available options.
For e.g If options are ['CAR', 'BIKE', 'BICYCLE'] then you can define `defaultValue = 'BIKE'`

### Switch
`(type: switch)`
It's an implement of React Native `switch` component.

#### Value Type : `Boolean`

### Date
`(type: string)`

#### Extra Properties
| Props  | Default | Type | Description |
| :------------ |:--------------- |:---------------| :-----|
| mode | `datetime` | `string` | To define type of date picker, available values are `date, time, datetime` |
| maxDate | N/A | `string` or `JS Date object` | To define the maximum date can be select in date picker  |
| minDate | N/A | `string` or `JS Date object` | To define the minimum date can be select in date picker  |


#### Value Type : `String`
#### Default Value Type : `string` or `JS Date object`

### Select

#### Extra Properties
| Props | Required | Default | Type | Description |
| :------------| :------------ |:--------------- |:---------------| :-----|
| multiple | `No` | `false` | `bool` | To define that the field can accept multple values or not i.e user can select multiple values at a time or not. |
| objectType | `No` |  `false` | `string` | To define that the values can be of object or not.If `true`, then you need to specify `labelKey` & `primaryKey`  |
| labelKey | `Yes` if `objectType = true` | `N/A` | `string` | To define the key which value need to be used as label. |
| primaryKey | `Yes` if `objectType = true` |  `N/A` | `string` | To define the key which is unique in all objects.  |
| options | `Yes` |  `N/A` | array of `objects` or `strings` | An array of `objects` or `strings` containing all available options.|

#### Value Type : Array of `Strings` or `Objects`
#### Array of Strings
For e.g. `options = ['CAR', 'BIKE', 'BICYCLE']`
#### Array of Objects
If you're using array of objects then please don't forget to define these properties:
```jsx
objectType: true,
labelKey: 'name', // For Below example
primaryKey: 'id,  // For Below example
```
For e.g.
```
options: [
        {
          id: 1,
          name: 'CAR',
        },
        {
          id: 2,
          name: 'BIKE',
        },
        {
          id: 3,
          name: 'BICYCLE',
        },
      ]
```
#### Default Value Type : `string` or `JS Date object`
In case of object values:
```
defaultValue: [{
        id: 3,
        name: 'kuldeep2',
        title: 'saxena2',
      }],
 ```
In case of string values:
```
defaultValue: ['CAR', 'BIKE'],
```

## Nested Forms
`(type: group)`
Form Builder also supports nested forms, some times you need to wrap all of your form values in an object or we can say that you have some nested fields, in this case you can define `group` fields.
An example will better explain it:

```
{
      type: 'group',
      name: 'address',
      label: 'Address',
      fields: [
        {
          type: 'text',
          name: 'city',
          label: 'City',
        },
        {
          type: 'picker',
          name: 'country',
          label: 'Country',
          defaultValue: 'INDIA',
          options: ['US', 'INDIA', 'UK', 'CHINA', 'FRANCE'],
        },
      ],
    },
```
#### Value Type : `Object`

For above example the return value object will be something like that:
```
{ city: 'Bangalore', country: 'INDIA' }
```
#### Default Value Type : `Object`

You can set default value for above example like that:
```
{ city: 'Newyork', country: 'US' }
```
## Add Custom Validations

It's very easy to add your custom validations & error messages with FormBuilder.All you need to do is define a function & pass it as `customValidation` prop.

For e.g.
```
 function validate(field) {
   let error = false;
   let errorMsg = '';
   if (field.name === 'username' && !(field.value && field.value.trim())) {
     error = true;
     errorMsg = 'Username is required';
   }
   if (field.name === 'password' && !(field.value && field.value.trim())) {
     error = true;
     errorMsg = 'Password is required';
   }
   return { error, errorMsg };
 }
```
Note: Always return an object which will have two entities `error` type of `boolean` & `errorMsg` type of `string`.

## Customize your form
- Eject Theme by running this command
```bash
node node_modules/react-native-form-builder/ejectTheme.js
```
It will create a file named `form-theme.js` in your project's root folder.

Customize your theme.

Import theme from `form-them`.

Use it by passing as `theme` prop.
```
import theme from '../form-theme';
....
 <GenerateForm
  ref={(c) => { this.formGenerator = c; }}
  theme = {theme}
  ....
  />
```
 
