import React from 'react';
import {Image} from 'react-native';

function Header(){
    return 
    (
        <Image source={require('../../src/assets/icomc.png')} style={{marginTop:20}} />
    );
}

export default Header;