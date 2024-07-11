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
    }
  });


const Talk = ( props: { talkInfo: { first_name: string; last_name: string; 
    chair_first_name_1: string; chair_last_name_1: string; chair_affiliation_1: string; 
    chair_first_name_2: string; chair_last_name_2: string; chair_affiliation_2: string; 
        talk_title: string; session_room: string ; 
        talk_time: string ; session_code:string;
    }; }) => {
    //let x=props.talkInfo.first_name.split(" ");
    const baseName=props.talkInfo.first_name[0]+props.talkInfo.last_name[0];
    let chairPerson=props.talkInfo.chair_first_name_1 +" "+ props.talkInfo.chair_last_name_1;
    let aff=props.talkInfo.chair_affiliation_1;
    if(props.talkInfo.chair_first_name_2!="")
    {
        chairPerson+=", "+props.talkInfo.chair_first_name_2+" "+props.talkInfo.chair_last_name_2
        aff+=", "+props.talkInfo.chair_affiliation_2;
    }
    return (
        <View style={styles.baseView}>
            <View style={styles.nameView}>
                <Text style={styles.nameText}>{baseName}</Text>
            </View>
            <View style={styles.itemInfoView}>
                <Text style={styles.heading}>Chair Person</Text>
                <Text style={styles.chairPerson}>{chairPerson}</Text>
                <Text style={styles.heading}>{aff}</Text>
                <Text style={styles.sessionCode}>Session Code : <Text style={{fontWeight: "bold"}}>{props.talkInfo.session_code}</Text></Text>
                
                
                <Text style={styles.talkBy}>{props.talkInfo.first_name +" "+ props.talkInfo.last_name}</Text>
                <Text style={styles.talkTime}>{props.talkInfo.session_room} :: {props.talkInfo.talk_time}</Text>

                <Text style={styles.talkTitle}>{props.talkInfo.talk_title}</Text>
            </View>
            

        </View>
    );
}


export default Talk;