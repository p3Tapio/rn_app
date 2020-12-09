import React, { useState } from 'react'
import { Modal, Text, View, TouchableHighlight } from 'react-native'
import { styles } from '../../Styles';
import { CreateModalProps, BaseProduct } from './productType';
import {  Foundation } from '@expo/vector-icons';
import { Switch, TextInput } from 'react-native-gesture-handler';
import { numericValidation, nameValidation, stringValidation, urlValidation } from './validators';
import CategoryPicker from './pickers/CategoryPicker';
import SupplierPicker from './pickers/SupplierPicker';

const CreateProductModal: React.FC<CreateModalProps> = ({ setCreateOpen, createOpen, createNewProduct, categories, suppliers }: CreateModalProps) => {

    const initialNewProduct: BaseProduct = {
        productName: '', supplierId: undefined, categoryId: undefined, quantityPerUnit: '',
        unitPrice: '', unitsInStock: undefined, unitsOnOrder: undefined,
        reorderLevel: undefined, discontinued: false, imageLink: '',
    }

    const [focused, setFocused] = useState<string | null>(null)
    const [newProduct, setNewProduct] = useState<BaseProduct>(initialNewProduct);
    const [dropdownCategory, setDropdownCategory] = useState<number>(0)
    const [categoryWarning, setCategoryWarning] = useState<boolean>(false)
    const [dropdownSupplier, setDropdownSupplier] = useState<number>(0);
    const [supplierWarning, setSupplierWarning] = useState<boolean>(false)
    
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
                        <View style={(nameValidation(newProduct.productName) || newProduct.productName === '') ? { marginTop: 4 } : { alignSelf: 'flex-end', marginTop: -10 }}>
                            {(!nameValidation(newProduct.productName) && newProduct.productName !== '') && <Text style={styles.errorText}>Tuotteen nimi on liian lyhyt!</Text>}
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Hinta: </Text>
                            <TextInput style={focused === 'hinta' ? styles.textInputFocused : styles.textInputField}
                                onFocus={() => setFocused('hinta')} onBlur={() => setFocused(null)}
                                autoCapitalize="none" selectTextOnFocus={true} keyboardType="numeric"
                                onChangeText={(text) => setNewProduct({ ...newProduct, unitPrice: text })} />
                        </View>
                        <View style={(numericValidation(newProduct.unitPrice) || newProduct.unitPrice === '') ? { marginTop: 4 } : { alignSelf: 'flex-end', marginTop: -10 }}>
                            {(!numericValidation(newProduct.unitPrice) && newProduct.unitPrice !== '') && <Text style={styles.errorText}>Anna hinta muodossa n.zz!</Text>}
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Varastossa: </Text>
                            <TextInput style={focused === 'varasto' ? styles.textInputFocused : styles.textInputField}
                                onFocus={() => setFocused('varasto')} onBlur={() => setFocused(null)}
                                autoCapitalize="none" selectTextOnFocus={true} keyboardType="numeric"
                                onChangeText={(text) => setNewProduct({ ...newProduct, unitsInStock: Number(text) })} />
                        </View>
                        <View style={(numericValidation(newProduct.unitsInStock) || newProduct.unitsInStock === undefined) ? { marginTop: 4 } : { alignSelf: 'flex-end', marginTop: -10 }}>
                            {(!numericValidation(newProduct.unitsInStock) && newProduct.unitsInStock !== undefined) && <Text style={styles.errorText}>Anna varastomäärä numeroina!</Text>}
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Hälytysraja: </Text>
                            <TextInput style={focused === 'raja' ? styles.textInputFocused : styles.textInputField}
                                onFocus={() => setFocused('raja')} onBlur={() => setFocused(null)}
                                autoCapitalize="none" selectTextOnFocus={true} keyboardType="numeric"
                                onChangeText={(text) => setNewProduct({ ...newProduct, reorderLevel: Number(text) })} />
                        </View>
                        <View style={(numericValidation(newProduct.reorderLevel) || newProduct.reorderLevel === undefined) ? { marginTop: 4 } : { alignSelf: 'flex-end', marginTop: -10 }}>
                            {(!numericValidation(newProduct.reorderLevel) && newProduct.reorderLevel !== undefined) && <Text style={styles.errorText}>Anna hälytysraja muodossa x.xx!</Text>}
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Tilauksessa: </Text>
                            <TextInput style={focused === 'tilauksia' ? styles.textInputFocused : styles.textInputField}
                                onFocus={() => setFocused('tilauksia')} onBlur={() => setFocused(null)}
                                autoCapitalize="none" selectTextOnFocus={true} keyboardType="numeric"
                                onChangeText={(text) => setNewProduct({ ...newProduct, unitsOnOrder: Number(text) })} />
                        </View>
                        <View style={(numericValidation(newProduct.unitsOnOrder) || newProduct.unitsOnOrder === undefined) ? { marginTop: 4 } : { alignSelf: 'flex-end', marginTop: -10 }}>
                            {(!numericValidation(newProduct.unitsOnOrder) && newProduct.unitsOnOrder !== undefined) && <Text style={styles.errorText}>Tarkasta tilausmäärän muoto</Text>}
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Määrä: </Text>
                            <TextInput style={focused === 'maara' ? styles.textInputFocused : styles.textInputField}
                                onFocus={() => setFocused('maara')} onBlur={() => setFocused(null)}
                                value={newProduct.quantityPerUnit} autoCapitalize="none" selectTextOnFocus={true}
                                onChangeText={(text) => setNewProduct({ ...newProduct, quantityPerUnit: text })} />
                        </View>
                        <View style={(stringValidation(newProduct.quantityPerUnit) || newProduct.quantityPerUnit === '') ? { marginTop: 4 } : { alignSelf: 'flex-end', marginTop: -10 }}>
                            {(!stringValidation(newProduct.quantityPerUnit) && newProduct.quantityPerUnit !== '') && <Text style={styles.errorText}>Anna hälytysraja muodossa x.xx!</Text>}
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Kuvalinkki: </Text>
                            <TextInput style={focused === 'linkki' ? styles.textInputFocused : styles.textInputField}
                                onFocus={() => setFocused('linkki')} onBlur={() => setFocused(null)}
                                autoCapitalize="none" selectTextOnFocus={true}
                                onChangeText={(text) => setNewProduct({ ...newProduct, imageLink: text })} />
                        </View>
                        <View style={(urlValidation(newProduct.imageLink) || newProduct.imageLink === '') ? { marginTop: 4 } : { alignSelf: 'flex-end', marginTop: -10 }}>
                            {(!urlValidation(newProduct.imageLink) && newProduct.imageLink !== '') && <Text style={styles.errorText}>Tarkasta linkki! </Text>}
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Kategoria: </Text>
                            <CategoryPicker
                                categories={categories}
                                setDropdownCategory={setDropdownCategory}
                                dropdownCategory={dropdownCategory}
                                setCategoryWarning={setCategoryWarning}
                                setNewProduct={setNewProduct}
                                newProduct={newProduct}
                            />
                        </View>
                        <View style={!categoryWarning ? { marginTop: -1, marginBottom: 5 } : { alignSelf: 'flex-end', marginTop: -15, marginRight: 35, marginBottom: 5 }}>
                            {categoryWarning && <Text style={styles.errorText}>Aseta tuotekategoria</Text>}
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Toimittaja: </Text>
                            <SupplierPicker
                                suppliers={suppliers}
                                setDropdownSupplier={setDropdownSupplier}
                                dropdownSupplier={dropdownSupplier}
                                setSupplierWarning={setSupplierWarning}
                                setNewProduct={setNewProduct}
                                newProduct={newProduct}
                            />
                        </View>
                        <View style={!supplierWarning ? { marginTop: -1, marginBottom: 5 } : { alignSelf: 'flex-end', marginTop: -15, marginRight: 35, marginBottom: 5 }}>
                            {supplierWarning && <Text style={styles.errorText}>Aseta tuottaja</Text>}
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
