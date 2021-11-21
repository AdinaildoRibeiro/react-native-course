import React, { Component, Fragment } from 'react';

import {
  SafeAreaView,
  StatusBar,  
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import Button from './src/components/Button';

class App extends Component {
  
  state = { contador: 0, nome: 'Adinaildo' , personagens: [] }

  apertou = () => {
    this.setState({contador : this.state.contador + 1 })
  }

  mudouNome = nome => {
    this.setState({nome : nome })
  }

  async componentDidMount(){
    try {
      const response = await fetch('https://swapi.dev/api/people/?format=json');
      const datajson = await response.json();
      this.setState({ personagens: datajson.results});
    } catch (error) {
      console.log(error);
    }
  }

  render(){
    return (
      <Fragment>
        <StatusBar/>
        <SafeAreaView>              
            {/* <Button title="Botao Title" message="Cliquei no botao 1">
              <Text>Botão 1</Text>
            </Button> */} 
             <Text>{this.state.nome}</Text> 
            <TextInput value={this.state.nome} onChangeText={nome => this.mudouNome(nome)} />
            <TouchableOpacity onPress={() => { this.apertou() } }><Text>Mudar nome</Text></TouchableOpacity>      
            {
              this.state.personagens.map(personagem => { 
                return <Text key={personagem.name}>{personagem.name}</Text>;
               })
            }
        </SafeAreaView>
      </Fragment>      
    )
  }  
};

export default App;