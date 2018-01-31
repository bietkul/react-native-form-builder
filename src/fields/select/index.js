import PropTypes from 'prop-types';
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
    attributes: PropTypes.object,
    updateValue: PropTypes.func,
    theme: PropTypes.object,
    ErrorComponent: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  toggleModalVisible() {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  }
  toggleSelect(value) {
    const attributes = this.props.attributes;
    const newSelected = attributes.multiple ? attributes.value : value;
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
      modalVisible: attributes.multiple ? this.state.modalVisible : false,
    }, () => this.props.updateValue(this.props.attributes.name, newSelected));
  }
  render() {
    const { theme, attributes, ErrorComponent } = this.props;
    const selectedText = attributes.multiple ?
    attributes.value.length || 'None' :
    attributes.objectType ?
    (attributes.value && attributes.value[attributes.labelKey]) || 'None'
    : attributes.value || 'None';
    return (
      <View>
        <ListItem icon onPress={() => this.toggleModalVisible()}>
          <Body>
            <Text>{attributes.label}</Text>
          </Body>
          <Right>
            <View style={{ width: deviceWidth / 2, alignItems: 'flex-end' }}>
              <Text numberOfLines={1} ellipSizeMode="tail">{selectedText}</Text>
            </View>

            <Icon name="ios-arrow-forward" />
          </Right>
        </ListItem>
        <View style={{ paddingHorizontal: 15 }}>
          <ErrorComponent {...{ attributes, theme }} />
        </View>
        <Modal
          visible={this.state.modalVisible}
          animationType="none"
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
                  attributes.value.findIndex(option =>
                    option[attributes.primaryKey] === item[attributes.primaryKey]
                  ) !== -1 : (attributes.value.indexOf(item) !== -1);
                }
                return (
                  <ListItem
                    key={index}
                    onPress={() => this.toggleSelect(item)}
                  >
                    { attributes.multiple &&
                    <CheckBox
                      onPress={() => this.toggleSelect(item)}
                      checked={isSelected}
                    />
                    }
                    <Body>
                      <Text style={{ paddingHorizontal: 5 }}>
                        {attributes.objectType ? item[attributes.labelKey] : item }
                      </Text>
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