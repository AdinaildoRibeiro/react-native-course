import * as React from 'react';
import { Button, View, Text } from 'react-native';

class Home extends React.Component {
    
  constructor({ navigation }){
    super(navigation);
    this.state = {navigation: navigation};
  }

  render(){
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to About"
                onPress={() => this.state.navigation.navigate('About')} />
        </View>
        
      );
  }
  
};

export default Home;