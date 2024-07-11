import React,{useEffect} from 'react';
import Pdf from 'react-native-pdf';

import {
    StyleSheet,
    Dimensions,
    View,
  } from 'react-native';

function MapScreen(props: { navigation: { navigate: (arg0: string) => void; }; }): React.JSX.Element {
    const source = { uri: 'https://force-india.com/icomc/api/hotel-layout.pdf', cache: false };

    return (
        <View style={styles.baseView}>
            <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath) => {
                        //console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages) => {
                        //console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        //console.log(error);
                    }}
                    onPressLink={(uri) => {
                        //console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}/>
        </View>
    );
  };

const styles = StyleSheet.create({
    baseView:
    {
        flex: 1, alignItems: 'center', justifyContent: 'flex-start',
    },
   
  pdf: {
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    }
});

  export default MapScreen;