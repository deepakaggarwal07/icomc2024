import React,{useEffect,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Talk from './talk';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';



import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Text,
    View,
    Alert
  } from 'react-native';

function TodayTalks(props: { navigation: { navigate: (arg0: string) => void; }; }): React.JSX.Element {

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

    //const dt=day+nth(day)+" "+month+" "+year;
    
    const dt="14-Jul-24"
    //const srch_dt=dt;
    
    //const [srch_dt, setValue] = useState(dt);
    const [value, setValue] = useState(dt);
    
    const filterData = async (srch_dt : any) => {
        try 
        {
            let savedUser1 = await AsyncStorage.getItem("user");
            if (savedUser1 != null) 
            {
                setValue(srch_dt);
                let eventData1=JSON.parse(savedUser1);
                
                let filteredArrayValues1 = eventData1.filter((evitem: { talk_date: string; }) => evitem.talk_date === srch_dt)
                setData(filteredArrayValues1);
                
            }
        }
        catch (error) 
        {
            console.log(error);
        }
    };

    const fetchData = async () => {
        try 
        {
            const savedUser = await AsyncStorage.getItem("user");
            if (savedUser != null) 
            {
                let eventData=JSON.parse(savedUser);
                let filteredArrayValues = eventData.filter((evitem: { talk_date: string; }) => evitem.talk_date === value)
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

    const ddlData = [
        { label: '14th July 2024', value: '14-Jul-24' },
        { label: '15th July 2024', value: '15-Jul-24' },
        { label: '16th July 2024', value: '16-Jul-24' },
        { label: '17th July 2024', value: '17-Jul-24' },
        { label: '18th July 2024', value: '18-Jul-24' },
      ];
    

    return (
        <SafeAreaView  style={{ height: '100%', width:'100%' }}>
        <View style={{ flex: 1, alignItems: 'center',flexDirection: 'column' }}> 

            <ScrollView style={{ width:'100%' }}>
                <View style={styles.headView}>
                    <Text style={styles.headViewTitle}>Today's Talk</Text>
                    
                    <Dropdown
                        style={[styles.dropdown]}
                        /*placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}*/
                        data={ddlData}
                        
                        maxHeight={300}
                        onChange={item => {
                            setValue(item.value);
                            fetchData();
                            //filterData(item.value);
                          }}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select Date'}
                        searchPlaceholder="Search..."
                        value={value==null?dt :value}
                        
                        
                        
                        />
                        {/* 
                        <Text style={styles.headViewDate}>{dt}</Text>


                        <TouchableOpacity
                            key={index}
                            onPress={() => props.navigation.navigate('Details',{ item:item })}>
                            <Talk talkName={item.talk_title} personName={item.first_name +" "+item.last_name} hallNo={item.session_room} startTime={item.talk_time}></Talk>
                        </TouchableOpacity>
                        */}
                    
                </View>
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
                    )):(
                            <Text style={styles.label}>No data available</Text>
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
                <AntDesign size={30} color="#900" name='search1' />
                
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
    label: {
        margin: 12,width:'90%',
        padding: 10,
      },
      icon: {
        marginRight: 5,
      },
      dropdown: {
        width:150,
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
});


export default TodayTalks;
  
