import React from 'react';
import { FontAwesome5, Octicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

import FlatListView from './src/components/FlatList';
import HelloInput from './src/components/HelloInput';
import HelloWorld from './src/components/Helloword'
import ImageExample from './src/components/ImageExample';
import TekstiTV100 from './src/components/TekstiTV100';
import TekstiTV from './src/components/TekstiTV';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProductList from './src/components/northwind/ProductList';

const App: React.FC = () => {
    const Tab = createMaterialTopTabNavigator();
    const inconSize = 16;
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: '#ffffff',
                    inactiveTintColor: '#000000',
                    showLabel: true,
                    labelStyle: { fontSize: 10 },
                    showIcon: true,                     // tämä tai labeli voi laittaa falseksi
                    scrollEnabled: true,
                    indicatorStyle: { height: 40 },
                    style: { backgroundColor: '#31b3c0', paddingTop: Constants.statusBarHeight }
                }}
            >
                <Tab.Screen name="NWProducts" component={ProductList} options={{ tabBarIcon: () => <Octicons name="database" color="#333" size={inconSize} /> }} />
                <Tab.Screen name="Hello World" component={HelloWorld} options={{ tabBarIcon: () => <FontAwesome5 name="chess-pawn" color="#333" size={inconSize} /> }} />
                <Tab.Screen name="joku kuva" component={ImageExample} options={{ tabBarIcon: () => <Octicons name="home" color="#333" size={inconSize} /> }} />
                <Tab.Screen name="Flat Listi" component={FlatListView} options={{ tabBarIcon: () => <Octicons name="database" color="#333" size={inconSize} /> }} />
                <Tab.Screen name="Hello input" component={HelloInput} options={{ tabBarIcon: () => <Octicons name="keyboard" color="#333" size={inconSize} /> }} />
                <Tab.Screen name="Teksti tv100" component={TekstiTV100} options={{ tabBarIcon: () => <Octicons name="database" color="#333" size={inconSize} /> }} />
                <Tab.Screen name="TekstiTv" component={TekstiTV} options={{ tabBarIcon: () => <Octicons name="database" color="#333" size={inconSize} /> }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
export default App; 
