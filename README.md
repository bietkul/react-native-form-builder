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
##### Common Properties to all Fields ( applicable to all fields )
| Property  | Required  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| type | `yes` | `enum` only possible values are : {text, password, form, email, number, url, select, switch, date } | if `false` then auto validation script will not run i.e formBuilder will not validate form data automatically. |
| name | `yes` | `string` | Every field should has a name which works as an unique identifier for that field. |
| label | `yes` | `string` | Field label to display. |
| editable | `No` | `bool` | To decide that whether a field is editable or not. |
| required | `No` | `bool` | Helps to decide if a field can has empty value or not. Doesn't work in case of `autoValidation = false` . |
| defaultValue | `No` | `Depends on field's type` | Sets the intial value for that field before the form initialization. |
| hidden | `No` | `bool` | If `true` then a field will not be displayed. |

##### Field Types
##### TextInput 
Supports all these kind of types : 
```text,
password,
email,
url,
number```
###### Extra Properties
| Props  | Default | Type | Description |
| :------------ |:--------------- |:---------------|
| iconName | N/A | `string` | Sets the icon, you can use any icon name which is available in `react-native-vector-icons`|  
| iconOrientaion | `left` | `left` or `right` | Adjust icon orientation |
| props | N/A | `object` | Here you can define extra props which are applicable of react native TextInput Component for e.g. ```{ multiline: true, secureTextEntry : true .... }``` 
 
