import React,{useEffect,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Talk from './talk';


import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Text,
    View
  } from 'react-native';

function TodayTalks(props:Props): React.JSX.Element {

    const [data, setData] = useState([]);  

    const nth = (d: number) => {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
          case 1:  return "st";
          case 2:  return "nd";
          case 3:  return "rd";
          default: return "th";
        }
      };

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    
    const year = currentDate.getFullYear();

    const shortMonth = currentDate.toLocaleString('default', { month: 'short' });
    const shortYear = year.toString().substring(2);;

    const dt=day+nth(day)+" "+month+" "+year;

    const srch_dt="14-Jul-24";

    const fetchData = async () => {
        try 
        {
            const savedUser = await AsyncStorage.getItem("user");
            if (savedUser != null) 
            {
                let eventData=JSON.parse(savedUser);
                let filteredArrayValues = eventData.filter((evitem: { talk_date: string; }) => evitem.talk_date === srch_dt)
                setData(filteredArrayValues);
            }
        }
        catch (error) 
        {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [data]);


    return (
        <SafeAreaView  style={{ height: '100%', width:'100%' }}>
        <View style={{ flex: 1, alignItems: 'center',flexDirection: 'column' }}> 

            <ScrollView style={{ width:'100%' }}>
                <View style={styles.headView}>
                    <Text style={styles.headViewTitle}>Today's Talk</Text>
                    <Text style={styles.headViewDate}>{dt}</Text>
                </View>
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
                    )):(
                            <Text>No data available</Text>
                        )
                }
        
            </ScrollView>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('Search')}
                style={{
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                position: 'absolute',
                bottom: 10,
                
                height: 60,
                backgroundColor: '#fff',
                borderRadius: 100,
                }}
            >
                <Text>SR</Text>
                
            </TouchableOpacity>
        </View></SafeAreaView>
    );
}


const styles = StyleSheet.create({
    headView:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingStart:10,
        paddingEnd:20,
        marginTop:10,
        marginBottom:10,
    },
    headViewTitle: {
        fontSize:24
    },
    headViewDate:{
        fontSize:16,
        justifyContent: 'center',
        textAlignVertical:'center',
        paddingTop:5
    },
});


export default TodayTalks;
  
