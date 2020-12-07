import React from 'react'
import { Text, View, Image } from 'react-native';
import { styles } from '../Styles'

const ImageExample = () => {
    return (
        <View style={styles.mainContainer}>
            <Text>Kuva</Text>
            <Image
                source={{ uri: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw26c3bf34/images/products/flowers/01712_01_procutorange.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196' }}
                style={{ width:100, height:100}}
            />
        </View>
    )
}

export default ImageExample
