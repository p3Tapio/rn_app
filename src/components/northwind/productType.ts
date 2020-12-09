export interface BaseProduct {
    productName: string;
    supplierId: any;
    categoryId: any;
    quantityPerUnit: string;
    unitPrice: string;
    unitsInStock: number | undefined;
    unitsOnOrder: number | undefined;
    reorderLevel: number | undefined;
    imageLink: string;
    discontinued: boolean;
}
export interface Product extends BaseProduct {
    productId: number;
    categoryId: number;
    reorderLevel: number;
    supplierId: number;
    unitsInStock: number;
    unitsOnOrder: number;
    category: string;
    orderDetails: any;
    supplier: any;
}
export interface Category {
    categoryId: number;
    categoryName: string;
    description: string;
}
export interface Supplier {
    supplierId: string;
    companyName: string;
}

interface BaseModalProps {
    setProductForModal: React.Dispatch<React.SetStateAction<Product | undefined>>;
    productForModal: Product | undefined;
    setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
    suppliers: Supplier[];
    categories: Category[];
}
export interface ProductModalProps extends BaseModalProps {
    deleteProduct: Function;
}
export interface EditModalProps extends BaseModalProps {
    editProduct: Function;
}
export interface CreateModalProps {
    setCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
    createOpen: boolean;
    createNewProduct: Function;
    suppliers: Supplier[];
    categories: Category[];
}
export interface ProductContainerProps {
    product: Product;
    categories: Category[];
    setProductForModal: React.Dispatch<React.SetStateAction<Product | undefined>>;
}
interface PickerProps {
    setNewProduct?: React.Dispatch<React.SetStateAction<BaseProduct >>; 
    newProduct?: BaseProduct | undefined; 
    setEditedProduct?: React.Dispatch<React.SetStateAction<Product | undefined >>; 
    editedProduct?: Product | undefined; 
}
export interface CategoryPickerProps extends PickerProps {
    categories: Category[];
    setDropdownCategory: React.Dispatch<React.SetStateAction<number>>;
    dropdownCategory: number;
    setCategoryWarning: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface SupplierPickerProps extends PickerProps {
    suppliers: Supplier[];
    setDropdownSupplier:  React.Dispatch<React.SetStateAction<number>>;
    dropdownSupplier: number;
    setSupplierWarning: React.Dispatch<React.SetStateAction<boolean>>;
}