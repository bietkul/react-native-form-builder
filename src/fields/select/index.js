import React, { Component } from 'react';
import { Modal, Dimensions } from 'react-native';
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
const deviceWidth = Dimensions.get('window').width;

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
    const attributes = this.props.attributes;
    const newSelected = attributes.multiple ? this.state.selected : value;
    if (attributes.multiple) {
      const index = attributes.objectType ? newSelected.findIndex(option =>
        option[attributes.primaryKey] === value[attributes.primaryKey]
      ) : newSelected.indexOf(value);
      if (index === -1) {
        newSelected.push(value);
      } else {
        newSelected.splice(index, 1);
      }
    }
    this.setState({
      selected: newSelected,
      modalVisible: attributes.multiple ? this.state.modalVisible : false,
    }, () => this.props.updateValue(this.props.attributes.name, newSelected));
  }
  render() {
    console.log('THESE ARE PROPS', this.props, this.state);
    const { attributes, theme } = this.props;
    const selectedText = attributes.multiple ?
    this.state.selected.length || 'None' :
    attributes.objectType ?
    (this.state.selected && this.state.selected[attributes.labelKey]) || 'None'
    : this.state.selected || 'None';
    return (
      <View>
        <ListItem icon onPress={() => this.toggleModalVisible()}>
          <Body>
            <Text>{attributes.label}</Text>
          </Body>
          <Right>
            <View style={{width : deviceWidth / 2, alignItems: 'flex-end'}}>
              <Text numberOfLines={1} ellipSizeMode='tail'>{selectedText}</Text>
            </View>

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
                <Title>{attributes.label || 'Select'}</Title>
              </Body>
              <Right />
            </Header>
            <Content>
              {
              attributes.options.map((item, index) => {
                let isSelected = false;
                if (attributes.multiple) {
                  isSelected = attributes.objectType ?
                  this.state.selected.findIndex(option =>
                    option[attributes.primaryKey] === item[attributes.primaryKey]
                  ) !== -1 : (this.state.selected.indexOf(item) !== -1);
                }
                return (
                  <ListItem
                    key={index}
                    onPress={() => this.toggleSelect(item)}
                  >
                    { attributes.multiple && <CheckBox
                      onPress={() => this.toggleSelect(item)}
                      checked={isSelected}
                    />
                }
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
