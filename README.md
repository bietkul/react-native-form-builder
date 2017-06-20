# react-native-form-builder
react-native-form-builder

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
  label: 'address'
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
### Customize Your Form
- Eject Theme by running this command
node node_modules/react-native-form-builder/ejectTheme.js


### Internationalization Support
