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
        marginRight:16
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
  });


const Talk = props => {
    let x=props.personName.split(" ");
    const baseName=x[0][0]+x[x.length-1][0];
    return (
        <View style={styles.baseView}>
            <View style={styles.nameView}>
                <Text style={styles.nameText}>{baseName}</Text>
            </View>
            <View>
                <Text style={{ maxWidth: '90%' }}>{props.talkName}</Text>
                <Text>{props.personName}</Text>
                <Text>Room : {props.hallNo} at {props.startTime}</Text>
            </View>
            

        </View>
    );
}


export default Talk;