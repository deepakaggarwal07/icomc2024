import React,{useEffect} from 'react';

import type {PropsWithChildren} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';

import Header from './header';


import {
    StyleSheet,
    Button,
    Text,
    View,
    Image,
    TouchableOpacity,
    Linking,
    Alert
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
        /*setTimeout(() => {
            props.navigation.navigate('Home'); 
        }, 5000); */
        
        fetch("https://client-demo.in/force/icomc/api/get-data.php").then((res)=>{
            return res.json();
        }).then((data)=>{
            storeUser(data);
        }).catch((error) => { 
            
            console.error(error); 
        });
      },[props.navigation])


    return (
        <View style={styles.baseView}>
            <View style={{ height: 100,paddingTop:25 }}>
                <Image source={require('../assets/icomc.png')} style={{height:70, resizeMode:'contain'}} />
            </View>
            <Text style={styles.pgTitle}>Programm Guide for ICOMC 2024</Text>
            
            <View style={styles.fixToText}>
            
                <Button  onPress={() => props.navigation.navigate('Home')} title="Today's Talk" />
                <Button onPress={() => props.navigation.navigate('Search')} title="Search Talk" />
            </View>
            <View style={styles.bottomView}>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.delve-serwiz.com/icomc2024/privacy-poilicy.php')}>
                    <Text>Privacy Policy</Text>
                </TouchableOpacity>
                <View
                    style={{
                        width:300,
                        borderBottomColor: 'blue',
                        
                        borderBottomWidth: 1,
                        height:10,
                        marginBottom:10
                    }}
                />
                <Text>2024 All Right Reserved by Delve Serwiz Pvt. Ltd.</Text>
            </View>
        </View>
    );
  };

const styles = StyleSheet.create({
    baseView:
    {
        flex: 1, alignItems: 'center', justifyContent: 'flex-start',marginTop:150
    },
    bottomView:{
        flex: 1, alignItems: 'center', justifyContent: 'flex-end'  ,marginBottom:10
    },
    button:{
        width:"30%" 

    },
    pgTitle:{
        marginTop:20,
        marginBottom:20,
        fontSize:22,
        color: '#841584',
    },
    
  fixToText: {
    width:'100%',
    fontSize:30,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent:'space-evenly',
    margin:10
  },
});

  export default HomeScreen;