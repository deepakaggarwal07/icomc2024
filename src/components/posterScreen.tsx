import React,{useEffect,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Poster from './poster';

import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';



import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Text,
    View,TextInput,
  } from 'react-native';

function PosterScreen(props: { navigation: { navigate: (arg0: string) => void; }; }): React.JSX.Element {

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

    
    const dt="15-Jul-24"
    
    const [value, setValue] = useState(dt);
    const [load, setLoad] = useState("0");
    
    const filterData = async (srch_dt : any) => {
        try 
        {
            let savedPoster1 = await AsyncStorage.getItem("poster");
            if (savedPoster1 != null) 
            {
                setValue(srch_dt);
                let posterData1=JSON.parse(savedPoster1);
                
                let filteredArrayValues1 = posterData1.filter((evitem: { talk_date: string; }) => evitem.talk_date === srch_dt)
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
            const savedPoster = await AsyncStorage.getItem("poster");
            if (savedPoster != null) 
            {
                let posterData=JSON.parse(savedPoster);
                setData(posterData);
                setLoad("1");
            }
        }
        catch (error) 
        {
            console.log(error);
        }
    };

    const fetchSearchData = async (srch_txt: string) => {
        try 
        {
            const savedPoster = await AsyncStorage.getItem("poster");
            if (savedPoster != null) 
            {
                let posterData=JSON.parse(savedPoster);
                if(srch_txt!=""){
                    const filteredData = Array.from(posterData).filter(item => (
                        item.poster_code.indexOf(srch_txt) >= 0 ||
                        item.presenter_name.indexOf(srch_txt) >= 0 ||
                        item.poster_title.indexOf(srch_txt) >= 0
                    ));
                    if(filteredData.length>0)
                    {
                        setData(filteredData);
                    }
                }
            }
        }
        catch (error) 
        {
            console.log(error);
        }
    };

    useEffect(() => {
        if(load=="0"){
        fetchData();
        }
    }, [data]);

    const ddlData = [
        { label: '15th July 2024', value: '15-Jul-24' },
        { label: '17th July 2024', value: '17-Jul-24' },
      ];
    

    return (
        <SafeAreaView  style={{ height: '100%', width:'100%' }}>
        <View style={{ flex: 1, alignItems: 'center',flexDirection: 'column' }}> 

            <ScrollView style={{ width:'100%' }}>
                <View style={styles.headView} nativeID='formLabel'>
                    <TextInput 
                    placeholder='Search by name/ Poster title'
                    placeholderTextColor='#fff'
                        accessibilityLabel="input"
                        accessibilityLabelledBy="formLabel"
                        onChangeText={newText => fetchSearchData(newText)}
                        style={styles.input} />
                </View>
                
                {
                    Array.isArray(data) && data.length > 0 ? 
                    (
                        data
                        .map((item:any,index) => (
                            <Poster 
                                key={index}
                                posterInfo={item}>
                            </Poster>
                        )
                    )):(
                            <Text style={styles.label}>No data available</Text>
                        )
                }
            </ScrollView>
        </View></SafeAreaView>
    );
}


const styles = StyleSheet.create({
    headView:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        paddingStart:10,
        paddingEnd:20,
        marginTop:10,
        marginBottom:10,
    },
    input: {
        
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


export default PosterScreen;
  
