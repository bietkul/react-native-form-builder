import React, { Component } from 'react';
import { Modal } from 'react-native';
import {
  View,
  Text,
  Container,
  Header,
  Content,
  ListItem,
  CheckBox,
  Left,
  Right,
  Icon,
  Body,
  Title,
  Button,
} from 'native-base';

export default class SelectField extends Component {
  static propTypes = {
    attributes: React.PropTypes.object,
    updateValue: React.PropTypes.func,
    theme: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selected: props.attributes.value,
    };
  }
  toggleModalVisible() {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  }
  toggleSelect(value) {
    const newSelected = this.state.selected;
    const attributes = this.props.attributes;
    const index = attributes.objectType ? newSelected.findIndex(option =>
      option[attributes.primaryKey] === value[attributes.primaryKey]
    ) : newSelected.indexOf(value);
    if (index === -1) {
      newSelected.push(value);
    } else {
      newSelected.splice(index, 1);
    }
    this.setState({
      selected: newSelected,
    }, () => this.props.updateValue(this.props.attributes.name, newSelected));
  }
  render() {
    // console.log('THESE ARE PROPS', this.props, this.state);
    const { attributes, theme } = this.props;
    const selectedText = this.state.selected.length ? this.state.selected.length : 'None';
    return (
      <View>
        <ListItem icon onPress={() => this.toggleModalVisible()}>
          <Body>
            <Text>{attributes.label}</Text>
          </Body>
          <Right>
            <Text>{selectedText}</Text>
            <Icon name="ios-arrow-forward" />
          </Right>
        </ListItem>
        <Modal
          visible={this.state.modalVisible}
          animationType="fade"
          onRequestClose={() => this.toggleModalVisible()}
        >
          <Container style={{ flex: 1 }}>
            <Header>
              <Left>
                <Button
                  transparent
                  onPress={() => this.toggleModalVisible()}
                >
                  <Icon name="arrow-back" />
                </Button>
              </Left>
              <Body>
                <Title>Select</Title>
              </Body>
              <Right />
            </Header>
            <Content>
              {
              attributes.options.map((item, index) => {
                const isSelected = attributes.objectType ?
                this.state.selected.findIndex(option =>
                  option[attributes.primaryKey] === item[attributes.primaryKey]
                ) !== -1 : (this.state.selected.indexOf(item) !== -1);
                return (
                  <ListItem
                    key={index}
                    onPress={() => this.toggleSelect(item)}
                  >
                    <CheckBox
                      onPress={() => this.toggleSelect(item)}
                      checked={isSelected}
                    />
                    <Body>
                      <Text>{attributes.objectType ? item[attributes.labelKey] : item }</Text>
                    </Body>
                  </ListItem>);
              })
            }
            </Content>
          </Container>
        </Modal>
      </View>
    );
  }
}
