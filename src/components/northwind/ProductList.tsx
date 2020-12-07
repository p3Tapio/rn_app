import React, { useEffect, useState } from 'react'
import Constants from 'expo-constants';

import { BaseProduct, Product } from './productType';
import { priceValidation, nameValidation } from './validators';

import { View, Text, Pressable, Alert, ActivityIndicator } from 'react-native';
import { FontAwesome5, Octicons } from '@expo/vector-icons';
import { styles } from '../../Styles';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker'

import ProductModal from './ProductModal';
import ProductContainer from './ProductContainer';
import EditProductModal from './EditProductModal';
import CreateProductModal from './CreateProductModal';

const ProductList: React.FC = () => {
    const productUrl = `${Constants.manifest.extra.careeriaUrl}/products/`
    const [products, setProducts] = useState<Product[]>([]);
    const [productForModal, setProductForModal] = useState<Product | undefined>(undefined);
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [createOpen, setCreateOpen] = useState<boolean>(false);
    const [dropdownCategory, setDropdownCategory] = useState<string>('All')

    useEffect(() => { getProducts(); }, [])

    const getProducts = () => {
        fetch(productUrl)
            .then(response => response.json())
            .then((json: any) => setProducts(json))
    }

    const editProduct = (edited: Product) => {
        if (edited && priceValidation(edited.unitPrice.toString()) && nameValidation(edited.productName)) {
            fetch(`${productUrl}/${edited.productId}`, {
                method: "PUT",
                headers: { "Accept": "application/json", "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify({ ...edited, unitPrice: parseFloat(edited.unitPrice) })
            }).then(res => res.json())
                .then(json => {
                    if (json) {
                        console.log('Result: ', json)
                        Alert.alert(`Tuoteen ${edited.productName} tiedot päivitetty!`)
                        setProducts(products.map(x => x.productId === edited.productId ? edited : x))
                        setProductForModal(undefined)
                        setEditOpen(false)
                    }
                })
        } else {
            Alert.alert('Virhe!', 'Tuotetiedot ovat puutteelliset', [{ text: 'sulje' }])
        }
    }

    const createNewProduct = (newProduct: BaseProduct) => {
        if (newProduct && priceValidation(newProduct.unitPrice.toString()) && nameValidation(newProduct.productName)) {
            const productJson: any = JSON.stringify({
                ...newProduct,
                unitPrice: parseFloat(newProduct.unitPrice),
                categoryId: parseInt(newProduct.categoryId),
            })
            fetch(productUrl, {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json; charset=utf-8" },
                body: productJson
            }).then(res => res.json())
                .then(json => {
                    if (json) {
                        console.log('result: ', json)
                        getProducts()
                        setCreateOpen(false)
                        Alert.alert('Onnistui!', `Tuote ${newProduct.productName} lisätty tietoihin`, [{ text: 'sulje' }])
                        // jos responsissa olisi id eikä nimi, niin ei tarttis toista http-kutsua tuotelistan päivitykseen 
                        // setProducts(products.concat({...newProduct, productId:json.subString(x, y) })) tms. 
                    }
                })
        } else {
            Alert.alert('Virhe!', 'Tuotetiedot ovat puutteelliset', [{ text: 'sulje' }])
        }
    }

    const handleDelete = (productToDelete: Product) => {
        Alert.alert('Poista tuote', `Oletko varma, että haluat poistaa tuotteen ${productToDelete.productName}?`,
            [{
                text: 'delele', onPress: () => {
                    fetch(`${productUrl}/${productToDelete.productId}`, {
                        method: "DELETE",
                        headers: { "Accept": "application/json", "Content-Type": "application/json; charset=utf-8" }
                    }).then(res => res.json())
                        .then(json => {
                            const success = json;
                            if (success) {
                                setProducts(products.filter(x => x.productId !== productToDelete.productId))
                                Alert.alert('Onnistui!', `Tuote ${productToDelete.productName} poistettu. `)
                            }
                            else console.log('Error deleting: ', productToDelete)
                        })
                    setProductForModal(undefined)
                }
            },
            { text: 'cancel' }])
    }

    if (!products) return null;
    return (
        <ScrollView style={{ width: '100%' }}>
            <View style={styles.productHeader}>
                <FontAwesome5 name="boxes" size={25} color="black" />
                <Text style={{ fontSize: 14, color: 'black', marginLeft: 15, marginTop: 5 }}>
                    {`tuotteita yhteensä:  ${products.length !== 0 ? Object.keys(products).length : 'ladataan tietoja'}`}
                </Text>
                <Pressable onPress={() => getProducts()} style={({ pressed }) => [{ backgroundColor: pressed ? 'lightgray' : 'white' }]}>
                    <Octicons name="sync" size={24} />
                </Pressable>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Picker
                    selectedValue={dropdownCategory}
                    style={{ height: 50, width: '90%' }}
                    prompt='Valitse tuoteryhmä'
                    onValueChange={(itemValue, itemIndex) => {
                        console.log('itemValue', itemValue)
                        setDropdownCategory(itemValue.toString())
                    }}
                >
                    <Picker.Item label="Kaikki tuotteet" value="all" />
                    <Picker.Item label="Juomat" value="cat1" />
                </Picker>
                <Pressable style={{ marginTop: 15, marginLeft: 10 }} onPress={() => setCreateOpen(true)}>
                    <Octicons name="plus" size={24} color='black' />
                </Pressable>
            </View>
            {Object.keys(products).length !== 0
                ? products.map((product: Product) => (
                    <ProductContainer
                        key={product.productId}
                        product={product}
                        setProductForModal={setProductForModal}
                    />
                ))
                : <View style={{ flex: 1, justifyContent: "center", marginTop: 200 }}>
                    <ActivityIndicator size="large" color="#0000ff" animating={Object.keys(products).length === 0} />
                </View>}
            {editOpen
                ? <EditProductModal
                    setProductForModal={setProductForModal}
                    productForModal={productForModal}
                    setEditOpen={setEditOpen}
                    editProduct={editProduct}
                />
                : <ProductModal
                    setProductForModal={setProductForModal}
                    productForModal={productForModal}
                    setEditOpen={setEditOpen}
                    handleDelete={handleDelete}
                />}
            {createOpen
                ? <CreateProductModal
                    setCreateOpen={setCreateOpen}
                    createNewProduct={createNewProduct}
                    createOpen={createOpen}
                />
                : null}
        </ScrollView>
    )
}

export default ProductList
