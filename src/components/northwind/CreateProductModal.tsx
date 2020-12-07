import React, { useState } from 'react'
import { Modal, Text, View, TouchableHighlight } from 'react-native'
import { styles } from '../../Styles';
import { CreateModalProps, BaseProduct } from './productType';
import { AntDesign, Foundation } from '@expo/vector-icons';
import { Switch, TextInput } from 'react-native-gesture-handler';
import { priceValidation, nameValidation } from './validators';

const CreateProductModal: React.FC<CreateModalProps> = ({ setCreateOpen, createOpen, createNewProduct }: CreateModalProps) => {

    const initialNewProduct:BaseProduct = {
        productName: '', supplierId: undefined, categoryId: undefined, quantityPerUnit: '',
        unitPrice: '', unitsInStock: undefined, unitsOnOrder: undefined,
        reorderLevel: undefined, discontinued: false, imageLink: '',
    }

    const [focused, setFocused] = useState<string | null>(null)
    const [newProduct, setNewProduct] = useState<BaseProduct>(initialNewProduct);

    console.log('newProduct', newProduct)

    return (
        <Modal animationType="slide" transparent={true} visible={createOpen}>
            <View style={{ flex: 1, justifyContent: 'space-between', marginTop: 10 }}>
                <View style={{ margin: 10, backgroundColor: 'white', borderRadius: 20, padding: 20, shadowColor: 'black', shadowOffset: { width: 1, height: 2 } }}>
                    <View style={{ margin: 10, marginRight: 10 }}>

                        <Text style={{ fontWeight: 'bold', fontSize: 20, borderBottomWidth: 1, marginBottom: 10 }}>Luo uusi tuotetieto</Text>
                        <View style={styles.productDetailRow}>
                            <Text>Nimi: </Text>
                            <TextInput style={focused === 'nimi' ? styles.textInputFocused : styles.textInputField}
                                onFocus={() => setFocused('nimi')} onBlur={() => setFocused(null)}
                                autoCapitalize="none" selectTextOnFocus={true}
                                onChangeText={(text) => setNewProduct({ ...newProduct, productName: text })} />
                        </View>
                        <View style={nameValidation(newProduct.productName) ? { marginTop: 4 } : { alignSelf: 'flex-end', marginTop: -10 }}>
                            {!nameValidation(newProduct.productName) && <Text style={styles.errorText}>Tuotteen nimi puuttuu tai on liian lyhyt!</Text>}
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Hinta: </Text>
                            <TextInput style={focused === 'hinta' ? styles.textInputFocused : styles.textInputField}
                                onFocus={() => setFocused('hinta')} onBlur={() => setFocused(null)}
                                autoCapitalize="none" selectTextOnFocus={true} keyboardType="numeric"
                                onChangeText={(text) => setNewProduct({ ...newProduct, unitPrice: text })} />

                        </View>
                        <View style={priceValidation(newProduct.unitPrice.toString()) ? { marginTop: 4 } : { alignSelf: 'flex-end', marginTop: -10 }}>
                            {!priceValidation(newProduct.unitPrice.toString()) && <Text style={styles.errorText}>Anna hinta muodossa n.zz!</Text>}
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Varastossa: </Text>
                            <TextInput style={focused === 'varasto' ? styles.textInputFocused : styles.textInputField}
                                onFocus={() => setFocused('varasto')} onBlur={() => setFocused(null)}
                                autoCapitalize="none" selectTextOnFocus={true} keyboardType="numeric"
                                onChangeText={(text) => setNewProduct({ ...newProduct, unitsInStock: Number(text) })} />
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Hälytysraja: </Text>
                            <TextInput style={focused === 'raja' ? styles.textInputFocused : styles.textInputField}
                                onFocus={() => setFocused('raja')} onBlur={() => setFocused(null)}
                                autoCapitalize="none" selectTextOnFocus={true} keyboardType="numeric"
                                onChangeText={(text) => setNewProduct({ ...newProduct, reorderLevel: Number(text) })} />
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Kategoria: </Text>
                            {/* dropdown */}
                            <TextInput style={focused === 'kate' ? styles.textInputFocused : styles.textInputField}
                                onFocus={() => setFocused('kate')} onBlur={() => setFocused(null)}
                                autoCapitalize="none" selectTextOnFocus={true} keyboardType="numeric"
                                onChangeText={(text) => setNewProduct({ ...newProduct, categoryId: Number(text) })} />
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Määrä: </Text>
                            <TextInput style={focused === 'maara' ? styles.textInputFocused : styles.textInputField}
                                onFocus={() => setFocused('maara')} onBlur={() => setFocused(null)}
                                value={newProduct.quantityPerUnit} autoCapitalize="none" selectTextOnFocus={true}
                                onChangeText={(text) => setNewProduct({ ...newProduct, quantityPerUnit: text })} />
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Toimittaja: </Text>
                            <TextInput style={focused === 'toim' ? styles.textInputFocused : styles.textInputField}
                                onFocus={() => setFocused('toim')} onBlur={() => setFocused(null)}
                                autoCapitalize="none" selectTextOnFocus={true} keyboardType="numeric"
                                onChangeText={(text) => setNewProduct({ ...newProduct, supplierId: Number(text) })} />
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Kuvalinkki: </Text>
                            <TextInput style={focused === 'linkki' ? styles.textInputFocused : styles.textInputField}
                                onFocus={() => setFocused('linkki')} onBlur={() => setFocused(null)}
                                autoCapitalize="none" selectTextOnFocus={true}
                                onChangeText={(text) => setNewProduct({ ...newProduct, imageLink: text })} />
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Saatavilla: </Text>
                            <Text style={{ marginLeft: 150, fontWeight: 'bold' }}> {!newProduct.discontinued ? 'Kyllä' : 'Ei'}</Text>
                            <Switch value={newProduct.discontinued} onValueChange={() => setNewProduct({ ...newProduct, discontinued: !newProduct.discontinued })} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableHighlight
                            style={{ width: 100, borderColor: 'black', backgroundColor: 'darkblue', borderWidth: 1, borderRadius: 10, padding: 10 }}
                            onPress={() => {
                                setCreateOpen(false)
                                setNewProduct(initialNewProduct)
                            }}
                        >
                            <Text style={{ color: 'white' }}>Sulje</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={{ width: 32, height: 32, marginTop: 5, marginLeft: 150 }} onPress={() => createNewProduct(newProduct)}>
                            <Foundation name="save" size={30} color="black" />
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default CreateProductModal
