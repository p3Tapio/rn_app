import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../Styles';

export default function HelloWorld() {

    const [counter, setCounter] = useState(0)

    setTimeout(
        () => setCounter(counter + 1),
        1000
    )

    return (

        <View style={styles.mainContainer}>
            <View style={styles.itemContainer1}>
                <View>
                    <Text style={styles.itemHeader} >Moi</Text>
                </View>
                <View >
                    <Text style={{ color: 'blue', fontSize: 20, alignSelf: 'center' }}>{counter}</Text>
                </View>
                <View >
                    <Text style={{ color: "blue", alignSelf: "flex-end" }}>Jee jee jee</Text>
                </View>
            </View>
        </View>
    );
}
