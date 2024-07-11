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

function SearchScreen(): React.JSX.Element {
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
                    item.chair_first_name_1.indexOf(srch_txt) >= 0 ||
                    item.chair_last_name_1.indexOf(srch_txt) >= 0 ||
                    item.chair_first_name_2.indexOf(srch_txt) >= 0 ||
                    item.chair_last_name_2.indexOf(srch_txt) >= 0 ||
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
        <View style={{ flex: 1, alignItems: 'center',flexDirection: 'column',paddingStart:10,
        paddingEnd:20, }}>   
        <TextInput 
            placeholder='Search by Presender/ Chair Person/ Talk title'
            placeholderTextColor='#fff'
            onChangeText={newText => fetchData(newText)}
            style={styles.inputStyle}></TextInput>
            <ScrollView style={{ width:'100%' }}>
            {
                Array.isArray(data) && data.length > 0 ? 
                (
                    data
                        .map((item:any,index) => (
                            <Talk 
                                key={index}
                                talkInfo={item}>
                            </Talk>
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
    
    inputStyle: {
        height: 40,
        margin: 6,width:'100%',
        borderWidth: 1,
        padding: 10,
        borderRadius:6,
        backgroundColor:"#000",
        color:"#fff"
      },
      label: {
        margin: 12,width:'90%',
        padding: 10,
      },
});

export default SearchScreen;

