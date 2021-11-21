import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';
import Home from './src/views/Home';
import { AuthContext } from './src/components/AuthContext';
import RootStackScreen from './src/views/RootStack';
import Splash from './src/views/Splash';

const Stack = createStackNavigator();

const App = () => {

  const isLoading = true;
  const isSignout = false;
  const userToken = null;
  const userName = null;

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            userName: action.id,
            isLoading: false
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            userName: action.id,
            isLoading: false
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            userName: null,
            isLoading: false
          };
        case 'SIGN_UP':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            userName: action.id,
            isLoading: false
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userName: null
    }
  );

  React.useEffect(() => {
   // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (error) {
        console.log(error);
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync(); 

  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (error) {
          console.log(error);
        }

        dispatch({ type: 'SIGN_IN', id: userName, token: userToken });
      },
      signOut: async () => {
        
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (error) {
          console.log(error);
        }
        
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: userToken });
      }  
    }),
    []
  );

  if( isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return (
    <PaperProvider >
      <AuthContext.Provider value={authContext}>
        <NavigationContainer >
          { userToken !== null ? (
            <Stack.Navigator>              
              <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
          ) :
            <RootStackScreen/>
          }
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;
