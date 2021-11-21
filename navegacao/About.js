import React from 'react';
import { Component } from 'react';
import {
  View,
  Text  
} from 'react-native';

class About extends Component {
  
  render(){
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>About Screen</Text>
        </View>
      );
  }
  
};

export default About;