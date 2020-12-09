import Constants from 'expo-constants';
import { Product, Category, Supplier } from './productType';

const productUrl = `${Constants.manifest.extra.careeriaUrl}/products/`

const getProducts = async (): Promise<Product[]> => {
    const response = await fetch(productUrl);
    const products: Product[] = await response.json();
    return products;
}
const getCategories = async (): Promise<Category[]> => {
    const response = await fetch(`${productUrl}getcat`)
    const json: Category[] = await response.json()
    const cats: Category[] = json.map(x => ({
        categoryId: x.categoryId,
        categoryName: x.categoryName,
        description: x.description
    }))
    cats.unshift({ categoryId: 0, categoryName: 'Kaikki tuotteet', description: '' })
    return cats
}
const getSuppliers = async (): Promise<Supplier[]> => {
    const response = await fetch(`${productUrl}getsupplier`)
    const json: Supplier[] = await response.json()
    const sups: Supplier[] = json.map(x => ({
        supplierId: x.supplierId,
        companyName: x.companyName
    }))
    sups.unshift({ supplierId: '0', companyName:'Valitse tuottaja' })
    return sups;
}

export { productUrl, getProducts, getCategories, getSuppliers }