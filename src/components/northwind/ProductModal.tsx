import React from 'react'
import { Modal, Text, View, TouchableHighlight, Pressable } from 'react-native'
import { styles } from '../../Styles';
import { ProductModalProps } from './productType';
import { Octicons } from '@expo/vector-icons';

const ProductModal: React.FC<ProductModalProps> = ({ setProductForModal, productForModal, setEditOpen, handleDelete }: ProductModalProps) => {

    if (!productForModal) return null;
    return (
        <Modal animationType="slide" transparent={true} visible={productForModal !== undefined} >
            <View style={{ flex: 1, justifyContent: 'space-between', marginTop: 10 }}>
                <View style={{ margin: 10, backgroundColor: 'white', borderRadius: 20, padding: 20, shadowColor: 'black', shadowOffset: { width: 1, height: 2 } }}>

                    <View style={{ margin: 10, marginRight: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, borderBottomWidth: 1, marginBottom: 10 }}>Tuotetiedot</Text>
                        <View style={styles.productDetailRow}>
                            <Text>Tuotetunnus: </Text>
                            <Text>{productForModal.productId}</Text>
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Nimi: </Text>
                            <Text>{productForModal.productName}</Text>
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Tuottaja: </Text>
                            <Text>{productForModal.supplierId}</Text>
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Tuotekategoria: </Text>
                            <Text>{productForModal.categoryId}</Text>
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Määrä: </Text>
                            <Text>{productForModal.quantityPerUnit}</Text>
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Hinta: </Text>
                            <Text>{`${productForModal.unitPrice}\u20AC`}</Text>
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Varastossa: </Text>
                            <Text>{productForModal.unitsInStock}</Text>
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Saatavilla: </Text>
                            <Text>{productForModal.discontinued ? 'Kyllä' : 'Ei'}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableHighlight
                            style={{ width: 100, borderColor: 'black', backgroundColor: 'darkblue', borderWidth: 1, borderRadius: 10, padding: 10 }}
                            onPress={() => {
                                setProductForModal(undefined)
                                setEditOpen(false)
                            }}
                        >
                            <Text style={{ color: 'white' }}>Sulje</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={{marginTop:5, marginLeft:120}} onPress={()=> handleDelete(productForModal)}>
                            <Octicons name="trashcan" size={30} color="black" />
                        </TouchableHighlight>
                        <TouchableHighlight style={{ width: 32, height: 32, marginTop: 5 }} onPress={() => setEditOpen(true)}>
                            <Octicons name="pencil" size={30} color="black" />
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ProductModal