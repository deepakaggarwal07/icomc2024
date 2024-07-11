import React from 'react';

import {View,Text,StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    baseView:{
        alignSelf: 'stretch',
        
        borderWidth: 1,
        borderRadius: 10,
        
        margin:10,
        padding:16,
        flexDirection: "row", /*it was column*/ 
        borderColor:'#ededed',
        alignContent: "space-between",
        backgroundColor:'#ffffff',
        shadowColor: '#000000',
        shadowOffset: {
        width: 0,
        height: 3
        },
        shadowRadius: 5,
        shadowOpacity: .2
    },
    nameView:{
        width:50,
        height:50,
        borderRadius:25,
        
        backgroundColor:'#cccccc',
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', //Centered horizontally
        marginRight:10
    },
    
    nameText: {
      textAlign:'center',
        verticalAlign:'middle',
        fontSize:20
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    heading:{
        fontSize:13,
        color:"#757575",
    },
    itemInfoView:{
        borderLeftColor:'#2c94f5',
        borderLeftWidth:1,
        paddingLeft:8,
        
    },
    chairPerson:{
        fontSize:20,
        maxWidth:'98%',
        lineHeight: 26,
    },
    talkBy:{
        fontSize:18,
        lineHeight: 24,
    },
    talkTime:{
        fontSize:15,
        lineHeight: 20,
        paddingBottom:8
    },
    talkTitle:{
        fontSize:13,
        lineHeight: 18,
        maxWidth: '90%'
    },
    sessionCode:{
        lineHeight: 22,
        borderBottomWidth:5,
        borderBottomColor:'#2c94f5'
    }
  });


const Talk = ( props: { posterInfo: { poster_code: string; poster_date: string; 
    presenter_name: string; poster_title: string;poster_time:string;
    }; }) => {
    
    const baseName=props.posterInfo.poster_code;
    return (
        <View style={styles.baseView}>
            <View style={styles.nameView}>
                <Text style={styles.nameText}>{baseName}</Text>
            </View>
            <View style={styles.itemInfoView}>
                <Text style={styles.chairPerson}>{props.posterInfo.presenter_name }</Text>
                <Text style={styles.talkTime}>{props.posterInfo.poster_date} {props.posterInfo.poster_time} </Text>
                <Text style={styles.talkTitle}>{props.posterInfo.poster_title}</Text>
            </View>
            

        </View>
    );
}


export default Talk;