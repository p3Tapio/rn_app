import React, { useState } from 'react'
import { Modal, Text, View, TouchableHighlight } from 'react-native'
import { styles } from '../../Styles';
import { EditModalProps, Product } from './productType';
import { AntDesign, Foundation } from '@expo/vector-icons';
import { Switch, TextInput } from 'react-native-gesture-handler';
import { numericValidation, nameValidation, stringValidation, urlValidation } from './validators';
import CategoryPicker from './pickers/CategoryPicker';
import SupplierPicker from './pickers/SupplierPicker';

const EditProductModal: React.FC<EditModalProps> = ({ setProductForModal, productForModal, editProduct, setEditOpen, categories, suppliers  }: EditModalProps) => {

    const [editedProduct, setEditedProduct] = useState<Product | undefined>(productForModal)
    const [focused, setFocused] = useState<string | null>(null)
    const [dropdownCategory, setDropdownCategory] = useState<number>(productForModal && productForModal.categoryId ? productForModal.categoryId : 0)
    const [categoryWarning, setCategoryWarning] = useState<boolean>(false)
    const [dropdownSupplier, setDropdownSupplier] = useState<number>(productForModal && productForModal.supplierId ? productForModal.supplierId : 0);
    const [supplierWarning, setSupplierWarning] = useState<boolean>(false)
     
    if (!editedProduct) return null;
    return (
        <Modal animationType="slide" transparent={true} visible={productForModal !== undefined} >
            <View style={{ flex: 1, justifyContent: 'space-between', marginTop: 10 }}>
                <View style={{ margin: 10, backgroundColor: 'white', borderRadius: 20, padding: 20, shadowColor: 'black', shadowOffset: { width: 1, height: 2 } }}>
                    <View style={{ margin: 10, marginRight: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, borderBottomWidth: 1, marginBottom: 10 }}>Muokkaa tietoja</Text>
                        <View style={styles.productDetailRow}>
                            <Text style={{ marginTop: 5 }}>Tuotetunnus: </Text>
                            <TextInput style={styles.textInputField} defaultValue={editedProduct.productId.toString()} editable={false} />
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Nimi: </Text>
                            <TextInput style={focused === 'nimi' ? styles.textInputFocused : styles.textInputField}
                                onFocus={() => setFocused('nimi')} onBlur={() => setFocused(null)}
                                value={editedProduct.productName} autoCapitalize="none" selectTextOnFocus={true}
                                onChangeText={(text) => setEditedProduct({ ...editedProduct, productName: text })} />
                        </View>
                        <View style={nameValidation(editedProduct.productName) ? { marginTop: 4 } : { alignSelf: 'flex-end', marginTop: -10 }}>
                            {!nameValidation(editedProduct.productName) && <Text style={styles.errorText}>Tuotteen nimi puuttuu tai on liian lyhyt!</Text>}
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Hinta: </Text>
                            <TextInput style={focused === 'hinta' ? styles.textInputFocused : styles.textInputField}
                                onFocus={() => setFocused('hinta')} onBlur={() => setFocused(null)}
                                value={editedProduct.unitPrice.toString()} autoCapitalize="none" selectTextOnFocus={true} keyboardType="numeric"
                                onChangeText={(text) => setEditedProduct({ ...editedProduct, unitPrice: text })} />

                        </View>
                        <View style={(numericValidation(editedProduct.unitPrice) || editedProduct.unitPrice === '') ? { marginTop: 4 } : { alignSelf: 'flex-end', marginTop: -10 }}>
                            {(!numericValidation(editedProduct.unitPrice) && editedProduct.unitPrice !== '') && <Text style={styles.errorText}>Anna hinta muodossa n.zz!</Text>}
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Varastossa: </Text>
                            <TextInput style={focused === 'varasto' ? styles.textInputFocused : styles.textInputField}
                                onFocus={() => setFocused('varasto')} onBlur={() => setFocused(null)}
                                value={editedProduct.unitsInStock.toString()} autoCapitalize="none" selectTextOnFocus={true} keyboardType="numeric"
                                onChangeText={(text) => setEditedProduct({ ...editedProduct, unitsInStock: Number(text) })} />
                        </View>
                        <View style={(numericValidation(editedProduct.unitsInStock) || editedProduct.unitsInStock === undefined) ? { marginTop: 4 } : { alignSelf: 'flex-end', marginTop: -10 }}>
                            {(!numericValidation(editedProduct.unitsInStock) && editedProduct.unitsInStock !== undefined) && <Text style={styles.errorText}>Anna varastomäärä numeroina!</Text>}
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Hälytysraja: </Text>
                            <TextInput style={focused === 'raja' ? styles.textInputFocused : styles.textInputField}
                                onFocus={() => setFocused('raja')} onBlur={() => setFocused(null)}
                                value={editedProduct.reorderLevel.toString()} autoCapitalize="none" selectTextOnFocus={true} keyboardType="numeric"
                                onChangeText={(text) => setEditedProduct({ ...editedProduct, reorderLevel: Number(text) })} />
                        </View>
                        <View style={(numericValidation(editedProduct.reorderLevel) || editedProduct.reorderLevel === undefined) ? { marginTop: 4 } : { alignSelf: 'flex-end', marginTop: -10 }}>
                            {(!numericValidation(editedProduct.reorderLevel) && editedProduct.reorderLevel !== undefined) && <Text style={styles.errorText}>Anna hälytysraja muodossa x.xx!</Text>}
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Tilauksessa: </Text>
                            <TextInput style={focused === 'tilauksia' ? styles.textInputFocused : styles.textInputField}
                                onFocus={() => setFocused('tilauksia')} onBlur={() => setFocused(null)}
                                value={editedProduct.unitsOnOrder.toString()} autoCapitalize="none" selectTextOnFocus={true} keyboardType="numeric"
                                onChangeText={(text) => setEditedProduct({ ...editedProduct, unitsOnOrder: Number(text) })} />
                        </View>
                        <View style={(numericValidation(editedProduct.unitsOnOrder) || editedProduct.unitsOnOrder === undefined) ? { marginTop: 4 } : { alignSelf: 'flex-end', marginTop: -10 }}>
                            {(!numericValidation(editedProduct.unitsOnOrder) && editedProduct.unitsOnOrder !== undefined) && <Text style={styles.errorText}>Tarkasta tilausmäärän muoto</Text>}
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Määrä: </Text>
                            <TextInput style={focused === 'maara' ? styles.textInputFocused : styles.textInputField}
                                onFocus={() => setFocused('maara')} onBlur={() => setFocused(null)}
                                value={editedProduct.quantityPerUnit} autoCapitalize="none" selectTextOnFocus={true}
                                onChangeText={(text) => setEditedProduct({ ...editedProduct, quantityPerUnit: text })} />
                        </View>
                        <View style={(stringValidation(editedProduct.quantityPerUnit) || editedProduct.quantityPerUnit === '') ? { marginTop: 4 } : { alignSelf: 'flex-end', marginTop: -10 }}>
                            {(!stringValidation(editedProduct.quantityPerUnit) && editedProduct.quantityPerUnit !== '') && <Text style={styles.errorText}>Anna hälytysraja muodossa x.xx!</Text>}
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Kuvalinkki: </Text>
                            <TextInput style={focused === 'linkki' ? styles.textInputFocused : styles.textInputField}
                                onFocus={() => setFocused('linkki')} onBlur={() => setFocused(null)}
                                value={editedProduct.imageLink} autoCapitalize="none" selectTextOnFocus={true}
                                onChangeText={(text) => setEditedProduct({ ...editedProduct, imageLink: text })} />
                        </View>
                        <View style={(urlValidation(editedProduct.imageLink) || editedProduct.imageLink === '') ? { marginTop: 4 } : { alignSelf: 'flex-end', marginTop: -10 }}>
                            {(!urlValidation(editedProduct.imageLink) && editedProduct.imageLink !== '') && <Text style={styles.errorText}>Tarkasta linkki! </Text>}
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Kategoria: </Text>
                            <CategoryPicker
                                categories={categories}
                                setDropdownCategory={setDropdownCategory}
                                dropdownCategory={dropdownCategory}
                                setCategoryWarning={setCategoryWarning}
                                setEditedProduct={setEditedProduct}
                                editedProduct={editedProduct}
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
                                setEditedProduct={setEditedProduct}
                                editedProduct={editedProduct}
                            />
                        </View>
                        <View style={!supplierWarning ? { marginTop: -1, marginBottom: 5 } : { alignSelf: 'flex-end', marginTop: -15, marginRight: 35, marginBottom: 5 }}>
                            {supplierWarning && <Text style={styles.errorText}>Aseta tuottaja</Text>}
                        </View>
                        <View style={styles.productDetailRow}>
                            <Text>Saatavilla: </Text>
                            <Text style={{ marginLeft: 150, fontWeight: 'bold' }}> {!editedProduct.discontinued ? 'Kyllä' : 'Ei'}</Text>
                            <Switch value={editedProduct.discontinued} onValueChange={() => setEditedProduct({ ...editedProduct, discontinued: !editedProduct.discontinued })} />
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
                        <TouchableHighlight style={{ width: 32, height: 32, marginTop: 5, marginLeft: 120 }} onPress={() => editProduct(editedProduct)}>
                            <Foundation name="save" size={30} color="black" />
                        </TouchableHighlight>
                        <TouchableHighlight style={{ width: 32, height: 32, marginTop: 5 }} onPress={() => setEditOpen(false)}>
                            <AntDesign name="infocirlce" size={30} color="black" />
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default EditProductModal
