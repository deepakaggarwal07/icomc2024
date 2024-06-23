import React,{useEffect,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Talk from './talk';


import {
    StyleSheet,
    TextInput,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Text,
    View
  } from 'react-native';

function SearchScreen(props:Props): React.JSX.Element {
    const [data, setData] = useState([]);  

    const fetchData = async (srch_txt: string) => {
        
        try 
        {
            const savedUser = await AsyncStorage.getItem("user");
            if (savedUser != null) 
            {
                let eventData=JSON.parse(savedUser);
                const filteredData = Array.from(eventData).filter(item => (
                    item.first_name.indexOf(srch_txt) >= 0 ||
                    item.last_name.indexOf(srch_txt) >= 0 ||
                    item.chair_first_name.indexOf(srch_txt) >= 0 ||
                    item.chair_last_name.indexOf(srch_txt) >= 0 ||
                    item.talk_title.indexOf(srch_txt) >= 0
                  ));
                if(filteredData.length>0)
                {
                    setData(filteredData);
                }
            }
        }
        catch (error) 
        {
            console.log(error);
        }
    };

    useEffect(() => {
        //fetchData();
    }, [data]);


    return (
    <SafeAreaView  style={{ height: '100%', width:'100%' }}>
        <View style={{ flex: 1, alignItems: 'center',flexDirection: 'column' }}>   
        <TextInput 
            onChangeText={newText => fetchData(newText)}
            style={styles.input}></TextInput>
            <ScrollView style={{ width:'100%' }}>
            {
                Array.isArray(data) && data.length > 0 ? 
                (
                    data
                    .map((item:{
                        talk_title:string;
                        first_name:string;
                        last_name:string;
                        session_room:string;
                        talk_time:string;
                    },index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => props.navigation.navigate('Details',{ item:item })}>
                        <Talk talkName={item.talk_title} personName={item.first_name +" "+item.last_name} hallNo={item.session_room} startTime={item.talk_time}></Talk>
                    </TouchableOpacity>
                    )
                )):
                (
                    <Text style={styles.label}>No data available</Text>
                )
            }
            </ScrollView>
        </View>
    </SafeAreaView>
  
    );
  }


  const styles = StyleSheet.create({
    
    input: {
        height: 40,
        margin: 12,width:'90%',
        borderWidth: 1,
        padding: 10,
        borderRadius:6,
        
      },
      label: {
        margin: 12,width:'90%',
        padding: 10,
      },
});

export default SearchScreen;

