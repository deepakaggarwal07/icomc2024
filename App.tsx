/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './src/components/homeScreen';
import SearchScreen from './src/components/searchScreen';
import DetailScreen from './src/components/detailScreen';
import TodayTalks from './src/components/todayTalks';
    

import {
    Image,
    View,
  } from 'react-native';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={HomeScreen}
            options={{title: '',headerShown:false}}
          />
  
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{title: 'Search'}}
          />
  
          <Stack.Screen
            name="Details"
            component={DetailScreen}
            options={{
              gestureEnabled: false,
              headerShown: true,
              header:()=>(
                  <View style={{ height: 100,paddingTop:25 }}>
                      <Image source={require('./src/assets/icomc.png')} style={{height:70, resizeMode:'contain'}} />
                  </View>
                ),
              
            }}
          />
          
          <Stack.Screen name="Home" component={TodayTalks}  options={{
              gestureEnabled: false,
              headerShown: true,
              header:()=>(
                  <View style={{ height: 100,paddingTop:25 }}>
                      <Image source={require('./src/assets/icomc.png')} style={{height:70, resizeMode:'contain'}} />
                  </View>
                ),
              
            }} />
        </Stack.Navigator>
      </NavigationContainer>
        
    );
  }

export default App;
