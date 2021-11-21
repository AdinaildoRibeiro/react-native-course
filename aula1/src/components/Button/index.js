import React from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import PropTypes from 'prop-types'

const Button = () => {
    return (
        <TouchableOpacity onPress={() => { Alert.alert(this.props.message) } }>
            <Text>{this.props.title}</Text>
          {this.props.children}
        </TouchableOpacity>
      );
    };

  Button.proptypes = {
    message: PropTypes.string,
  }

  Button.defaultProps = {
    message: "Mensagem Default",    
  }

export default Button;