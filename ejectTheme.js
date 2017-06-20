const fs = require('fs-extra');
const path = require('path');

const printMessage = require('print-message');


try {
  fs.copySync(path.join(__dirname, 'src', 'theme.js'), path.join(process.cwd(), 'form-theme.js'));
  printMessage([
    `Form Builder theme has been copied at ${path.join(process.cwd(), 'form-theme.js')}`,
    'Here\'s how to theme your form',
    '',
    'import theme from \'./form-theme\';',
    'export default class ThemeExample extends Component {',
    'render() {',
    '  return (',
    '      <Container>',
    '        <Content>',
    '          ...',
    '         <GenerateForm',
    '          ref={(c) => { this.formGenerator = c; }}',
    '          theme = {theme}',
    '          ....',
    '         />',
    '        </Content>',
    '      </Container>',
    '  );',
    '}',
    '',
    'Head over to the docs(https://github.com/bietkul/react-native-form-builder) for detailed information on customization',
  ], {
    color: 'yellow',
    borderColor: 'green',
  });
} catch (err) {
  console.log(`Error: ${err}`);
}
