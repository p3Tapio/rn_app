import React, { useState } from 'react'
import { View, Text, TextInput, Button, ScrollView, Pressable } from 'react-native';

import { styles } from '../Styles'

const HelloInput = () => {
    const [name, setName] = useState('')
    const [nameList, setNameList] = useState<string[]>([])

    const clear = () => {
        setName('')
        setNameList([])

    }
    const addToList = (value: string) => {
        setName('');
        setNameList(nameList => [...nameList, value + '\n'])
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.itemContainer2}>
                <Text style={styles.itemHeader}>Anna tietoi!</Text>
                <Text>Anna nimi:</Text>
                <TextInput
                    style={{ borderColor: 'gray', borderWidth: 1, height: 40, padding: 10, borderRadius: 5 }}
                    onChangeText={txt => setName(txt)}
                    value={name}
                />
                <View style={{ padding: 2, marginTop: 10 }}>
                    <Button title="Klikc!" onPress={() => addToList(name)} />
                </View>

                <View>
                    <Pressable onPress={() => { clear() }}
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                                borderRadius: 5, borderColor: 'gray', borderWidth: 1,
                                padding: 5
                            },
                        ]}>
                        {({ pressed }) => (
                            <Text >
                                {pressed ? 'Cleared!' : 'Clear'}
                            </Text>
                        )}
                    </Pressable>
                </View>
                <ScrollView fadingEdgeLength={180} style={{ padding: 10 }}>
                    <Text>{nameList}</Text>

                </ScrollView>
            </View>
        </View>
    )
}


export default HelloInput
