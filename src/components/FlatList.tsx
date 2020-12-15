import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, Button, Pressable } from 'react-native';
import { styles } from '../Styles';
import * as ScreenOrientation from 'expo-screen-orientation';

const FlatListView = () => {
    const [jsonData, setJsonData] = useState(undefined)

    const getData = async () => {
       
        if (!jsonData) {
            fetch('https://jsonplaceholder.typicode.com/todos')
                .then((res) => res.json())
                .then((resData) => setJsonData(resData)
                )
        } else {
            setJsonData(undefined)
        }
    }
    // useEffect(() => { getData(); }, [])
    // console.log('ScreenOrientation', await ScreenOrientation.getOrientationAsync())
    return (
        <View style={styles.mainContainer}>
            <View style={styles.itemContainer2}>
                <Button onPress={() => getData()} title="paina!" />
                <FlatList
                    data={jsonData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Pressable
                        // onPress={() => { }}
                        >
                            {({ pressed }) => (
                                <View>
                                    <View style={{ padding: 10 }} />
                                    <Text style={pressed ? { marginVertical: 0 } : { marginVertical: -10 }}>{pressed ? 'pressed' : 'press me'}</Text>
                                    <Text>{pressed ? 'UserId: ' + item.id : ''}</Text>
                                    <Text>title: {item.title}</Text>
                                    <Text>
                                        {pressed
                                            ? 'completed: ' + item.completed ? 'tehty' : 'tekemättä'
                                            : ''}
                                    </Text>
                                </View>
                            )}
                        </Pressable>
                    )}
                />
            </View>
        </View>
    )
}
export default FlatListView; 