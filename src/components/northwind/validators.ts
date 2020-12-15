import { Alert } from "react-native";
import { BaseProduct } from "./productType";

export const numericValidation = (value: any): boolean => {
    if ((!value && value !== 0) || isNaN(Number(value))) return false;
    return true;
}
export const nameValidation = (name: string): boolean => {
    if (!name || name === '' || name.length < 4 || name.length > 70) return false;
    return true;
}
export const stringValidation = (value: string): boolean => {
    if (typeof value !== 'string' || value.match(/^.{1,70}$/) === null) return false;
    return true;
}
export const urlValidation = (value: string): boolean => {
    const req = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=_%.]+(?:png|jpg|jpeg|gif|svg)+$/
    if (!value && value === '') return true
    else if (value.match(req) === undefined || value.match(req) === null) return false
    return true;
}
export const submitValidation = (product: BaseProduct): boolean => {
    if (!nameValidation(product.productName)) {
        Alert.alert('Virhe!', 'Tarkasta tuotteen nimi.')
        return false
    } else if (!numericValidation(product.unitPrice)) {
        Alert.alert('Virhe!', 'Tuotteen hinta on virheellinen.')
        return false
    } else if (!numericValidation(product.unitsInStock)) {
        Alert.alert('Virhe!', 'Aseta tuotteen varastomäärä.')
        return false
    } else if (!numericValidation(product.reorderLevel)) {
        Alert.alert('Virhe!', 'Tarkasta hälytysraja.')
        return false
    } else if (!numericValidation(product.unitsOnOrder)) {
        Alert.alert('Virhe!', 'Tarkasta tilausmäärä.')
        return false
    } else if (!stringValidation(product.quantityPerUnit)) {
        Alert.alert('Virhe!', 'Tarkasta pakkauksen koko.')
        return false
    } else if (!urlValidation(product.imageLink)) {
        Alert.alert('Virhe!', 'Tarkasta kuvalinkki.')
        return false
    } else if (Number(product.categoryId) === 0 || !product.categoryId) {
        Alert.alert('Virhe!', 'Tarkista tuotekategoria.')
        return false
    } else if (Number(product.supplierId) === 0 || !product.supplierId) {
        Alert.alert('Virhe!', 'Tarkasta tuottajan tiedot.')
        return false
    }
    return true;
}