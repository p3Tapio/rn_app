import React, { useState } from 'react'
import Constants from 'expo-constants';
import { View, Image, Text, Dimensions, ScrollView, Button, TextInput } from 'react-native';
import { styles } from '../Styles';

const TekstiTV100 = () => {

    const [page, setPage] = useState(100)
    const imageURL = `https://external.api.yle.fi/v1/teletext/images/${page}/1.png?app_id=${Constants.manifest.extra.yleApiId}&app_key=${Constants.manifest.extra.yleApiKey}&date=${Date.now.toString()}`

    return (

            <View style={styles.yleContainer}>
                <View>
                    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                        <Image
                            style={{ width: 350, aspectRatio: 1.5 }}
                            resizeMode="contain"
                            source={{ uri: imageURL }}
                        />
                    </ScrollView>
                </View>
            </View>
 
    )
}

export default TekstiTV100


// console.log('Constants.manifest.extra.env', Constants.manifest.extra)
// console.log('Dimensions.getwidth', Dimensions.get('window').width)