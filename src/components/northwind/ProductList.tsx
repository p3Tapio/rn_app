import React, { useEffect, useState } from 'react'

import { BaseProduct, Product, Category, Supplier } from './productType';
import { submitValidation } from './validators';
import { productUrl, getProducts, getCategories, getSuppliers } from './httpRequests';

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
    const [products, setProducts] = useState<Product[]>([])
    const [productList, setProductList] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [suppliers, setSuppliers] = useState<Supplier[]>([])
    const [productForModal, setProductForModal] = useState<Product | undefined>(undefined)
    const [editOpen, setEditOpen] = useState<boolean>(false)
    const [createOpen, setCreateOpen] = useState<boolean>(false)
    const [dropdownCategory, setDropdownCategory] = useState<number>(0)

    useEffect(() => {
        const initData = () => {
            getProducts().then(x => setProducts(x));
            getCategories().then(x => setCategories(x))
            getSuppliers().then(x => setSuppliers(x))
            setProductList(products)
        }
        initData();
    }, [])

    const editProduct = (edited: Product) => {
        if (edited && submitValidation(edited)) {
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
                        setProductList(productList.map(x => x.productId === edited.productId ? edited : x))
                        setProductForModal(undefined)
                        setEditOpen(false)
                    }
                })
        }
        else {
            Alert.alert('Virhe!', 'Tuotetiedot ovat puutteelliset', [{ text: 'sulje' }])
        }
    }

    const createNewProduct = (newProduct: BaseProduct) => {
        // if (newProduct && priceValidation(newProduct.unitPrice.toString()) && nameValidation(newProduct.productName)) {
        if (newProduct && submitValidation(newProduct)) {
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
                        setCreateOpen(false)
                        Alert.alert('Onnistui!', `Tuote ${newProduct.productName} lisätty tietoihin`, [{ text: 'sulje' }])
                        getProducts().then(x => {
                            setProducts(x)
                            setProductList(x)
                        })
                    }
                })


        }
    }

    const deleteProduct = (productToDelete: Product) => {
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
                                setProductList(productList.filter(x => x.productId !== productToDelete.productId))
                                Alert.alert('Onnistui!', `Tuote ${productToDelete.productName} poistettu. `)
                            }
                            else console.log('Error deleting: ', productToDelete)
                        })
                    setProductForModal(undefined)
                }
            },
            { text: 'cancel' }])
    }

    if (!productList) return null;

    return (
        <ScrollView style={{ width: '100%' }}>
            <View style={styles.productHeader}>
                <FontAwesome5 name="boxes" size={25} color="black" />
                <Text style={{ fontSize: 14, color: 'black', marginLeft: 15, marginTop: 5 }}>
                    {`tuotteita yhteensä:  ${productList.length !== 0 ? Object.keys(productList).length : 'ladataan tietoja'}`}
                </Text>
                <Pressable onPress={async () => {
                    await getProducts().then(x => {
                        setProducts(x)
                        setProductList(x)
                    })
                }}
                    style={({ pressed }) => [{ backgroundColor: pressed ? 'lightgray' : 'white' }]}>
                    <Octicons name="sync" size={24} />
                </Pressable>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Picker
                    selectedValue={dropdownCategory}
                    style={{ height: 50, width: '90%' }}
                    prompt='Valitse tuoteryhmä'
                    onValueChange={(value, itemIndex) => {
                        setDropdownCategory(Number(value))
                        value === 0 ? setProductList(products) : setProductList(products.filter(x => x.categoryId === value))
                    }} >
                    {categories.map(c => (
                        <Picker.Item label={c.categoryName} value={c.categoryId} key={c.categoryId} />
                    ))}
                </Picker>
                <Pressable style={{ marginTop: 15, marginLeft: 10 }} onPress={() => setCreateOpen(true)}>
                    <Octicons name="plus" size={24} color='black' />
                </Pressable>
            </View>
            {!products || Object.keys(productList).length !== 0
                ? productList.map((product: Product) => (
                    <ProductContainer
                        key={product.productId}
                        product={product}
                        setProductForModal={setProductForModal}
                        categories={categories}
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
                    categories={categories}
                    suppliers={suppliers}
                />
                : <ProductModal
                    setProductForModal={setProductForModal}
                    productForModal={productForModal}
                    setEditOpen={setEditOpen}
                    deleteProduct={deleteProduct}
                    categories={categories}
                    suppliers={suppliers}
                />}
            {createOpen
                ? <CreateProductModal
                    setCreateOpen={setCreateOpen}
                    createNewProduct={createNewProduct}
                    createOpen={createOpen}
                    categories={categories}
                    suppliers={suppliers}
                />
                : null}
        </ScrollView>
    )
}

export default ProductList
