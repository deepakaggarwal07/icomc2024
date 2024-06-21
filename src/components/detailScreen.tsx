import React from 'react';

import {
    Button,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Text,
    View
  } from 'react-native';

function DetailScreen(props:Props): React.JSX.Element {
    
    const item=props.route.params.item;
    const baseName=item.first_name[0]+item.last_name[0];
    
    return (
    <SafeAreaView  style={{ height: '100%', width:'100%' }}>
        <ScrollView style={{ width:'100%' }}>
            <View style={{ flex: 1, alignItems: 'center',flexDirection: 'column' }}>   
                <ScrollView style={{ width:'100%' }}>
                    <View style={styles.detailHead}>
                        <Text style={styles.detailTitle}>{item.talk_title}</Text>
                        
                        <View style={styles.detailHeadName}>
                            <Text>{baseName}</Text>
                        </View>
                    </View>
                    <View style={styles.detailInfo}>
                        <Text style={styles.detailTitle}>{item.first_name+" "+item.last_name}</Text>
                        <Text style={styles.detailTitle}>{item.affiliation+" ,"+item.country}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={{ flex: 1, alignSelf: 'stretch' }}>Chair : {item.chair_first_name+" "+item.chair_last_name}</Text>
                        <Text style={{ flex: 1, alignSelf: 'stretch' }}>Talk Date : {item.talk_date}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={{ flex: 1, alignSelf: 'stretch' }}>Session No : {item.session_no}</Text>
                        <Text style={{ flex: 1, alignSelf: 'stretch' }}>Session Code : {item.session_code}</Text>
                    </View>
                    <View style={styles.detailRow}>
                    
                        <Text style={{ flex: 1, alignSelf: 'stretch' }}>Room : {item.session_room}</Text>
                        <Text style={{ flex: 1, alignSelf: 'stretch' }}>Talk Time : {item.talk_time} </Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Button
                            title="Go to Details... again"
                            onPress={() => props.navigation.push('Home')}
                        />
                    </View>

                </ScrollView>
            </View>
        </ScrollView>
    </SafeAreaView>
  
    );
  }


  const styles = StyleSheet.create({
    detailHead:{
        flex:1,
        backgroundColor:'#cccccc',
        padding:40,
        minHeight: '30%',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailRow:{
        flex: 1, alignSelf: 'stretch',flexDirection:'row',paddingLeft:10,paddingRight:10,
        margin:5

    },
    detailInfo:{
        marginTop:40,
        padding:10,
        marginBottom:10,
        
    },
    detailTitle:{
        fontSize:14,
        textAlign:'center'
    },
    detailHeadName:{
        marginTop:30,
        borderWidth: 1,
        borderColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        position: 'absolute',
        bottom: -30,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 30,
    },
    
});


  export default DetailScreen;

