import React,{useEffect} from 'react';

import type {PropsWithChildren} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';

import Header from './header';


import {
    
    Text,
    View
  } from 'react-native';

function HomeScreen(props:Props): React.JSX.Element {

    const storeUser = async (value: any) => {
        try {
          await AsyncStorage.setItem("user", JSON.stringify(value));
        } catch (error) 
        {
          console.log(error);
        }
      };

    useEffect(() => {
        setTimeout(() => {
            props.navigation.navigate('Home'); 
        }, 5000); 
        
        let value=fetch("https://client-demo.in/force/icomc/api/get-data.php").then((res)=>{
            return res.json();
        }).then((data)=>{
            //storeUser(JSON.stringify(data));
            storeUser(data);
        });
      },[props.navigation])


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Header />
        </View>
    );
  };

  export default HomeScreen;