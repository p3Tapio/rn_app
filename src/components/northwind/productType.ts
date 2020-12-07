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
interface BaseModalProps {
    setProductForModal: React.Dispatch<React.SetStateAction<Product | undefined>>;
    productForModal: Product | undefined;
    setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface ProductModalProps extends BaseModalProps {
    handleDelete: Function; 
}
export interface EditModalProps extends BaseModalProps {
    editProduct: Function;
}
export interface CreateModalProps  {
    setCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
    createOpen: boolean;
    createNewProduct: Function;
}
export interface ContainerProps {
    product: Product;
    setProductForModal: React.Dispatch<React.SetStateAction<Product | undefined>>;
}
