import React, { useEffect, useState } from 'react'
import Constants from 'expo-constants';
import { View, Image, ScrollView, TextInput } from 'react-native';
import { styles } from '../Styles';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';

const TekstiTV100 = () => {
    const [page, setPage] = useState(100)
    const [pageHolder, setPageHolder] = useState('siirry')
    const [imageURL, setImageURL] = useState(`https://external.api.yle.fi/v1/teletext/images/${page}/1.png?app_id=${Constants.manifest.extra.yleApiId}&app_key=${Constants.manifest.extra.yleApiKey}`)

    useEffect(() => {
        fetch(`https://external.api.yle.fi/v1/teletext/images/${page}/1.png?app_id=${Constants.manifest.extra.yleApiId}&app_key=${Constants.manifest.extra.yleApiKey}`).then((res) => {
            if (res.status === 404) setImageURL('https://c4.wallpaperflare.com/wallpaper/198/872/888/numbers-404-not-found-simple-background-minimalism-wallpaper-preview.jpg')
            else setImageURL(`https://external.api.yle.fi/v1/teletext/images/${page}/1.png?app_id=${Constants.manifest.extra.yleApiId}&app_key=${Constants.manifest.extra.yleApiKey}`)
        })
    })

    const handleBtnPress = (value: string, p: number) => {
        value === 'back'
            ? p > 100 ? setPage(p) : setPage(100)
            : setPage(page + 1)
        p < 100 ? setPageHolder('100') : setPageHolder(p.toString())
    }

    return (
        <View style={styles.yleContainer}>
            <View>
                <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ marginTop: 4, width: 50 }}>
                            <Button
                                buttonStyle={{ backgroundColor: "blue" }}
                                onPress={() => handleBtnPress('back', page - 1)}
                                icon={<Icon name="arrow-left" size={15} color="white" />}
                                iconRight
                            />
                        </View>
                        <TextInput
                            style={{ color: 'white', marginHorizontal: 15, borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 5 }}
                            placeholderTextColor="gray"
                            placeholder={pageHolder}
                            onChangeText={(p) => Number(p) > 100 ? setPage(Number(p)) : setPage(100)}
                        />
                        <View style={{ marginTop: 4, width: 50, }}>
                            <Button
                                type='outline'
                                buttonStyle={{ backgroundColor: "black", borderColor: "gray", borderWidth: 1 }}
                                onPress={() => handleBtnPress('front', page + 1)}
                                icon={<AntDesign name="caretright" size={15} color="white" />}
                                iconRight
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                    </View>
                    <Image
                        style={{ width: "100%", aspectRatio: 1.5 }}
                        resizeMode="contain"
                        source={{ uri: imageURL }}
                    />
                </ScrollView>
            </View>
        </View>
    )
}

export default TekstiTV100
