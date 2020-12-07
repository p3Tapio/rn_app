import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
        marginTop: Constants.statusBarHeight
    },
    itemContainer1: {
        flex: 1,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        elevation: 30,
        width: "80%",
        padding: 15,
        margin: 5,
    },
    itemContainer2: {
        flex: 2,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        elevation: 30,
        width: "80%",
        padding: 15,
        margin: 5,
    },
    itemHeader: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10
    },
    yleContainer: {
        backgroundColor: 'black',
        // marginTop: Constants.statusBarHeight,
        padding: 5,
        height: '100%',
        justifyContent: 'center',
    },
    productHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'white',
        height: 50,
        width: '100%',
    },
    productContainer: {
        // flexDirection: 'row',
        marginBottom: 2,
        padding: 10,
        // height: 120,
        borderTopWidth: 1,
        borderColor: 'gray',
        width: '100%',

    },
    productDetailRow: {
        marginVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 0,
        marginBottom: 10
    },
    textInputField: {
        borderColor: '#D3D3D3',
        borderRadius: 5,
        borderWidth: 1,

        width: '70%',
        padding: 3,
        paddingRight: 10,
        textAlign: 'right'
    },
    textInputFocused: {
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 1,

        width: '70%',
        padding: 3,
        paddingRight: 10,
        textAlign: 'right'
    },
    errorText: {
        fontSize: 10,
        color: 'red'
    }

});

