import React from 'react'
import { Picker } from '@react-native-picker/picker'
import { SupplierPickerProps } from '../productType'
import { styles } from '../../../Styles'

const SupplierPicker: React.FC<SupplierPickerProps> = ({
    suppliers, setDropdownSupplier, dropdownSupplier,
    setSupplierWarning, setNewProduct, newProduct,
    setEditedProduct, editedProduct
}) => {

    return (
        <Picker
            selectedValue={dropdownSupplier}
            style={styles.pickerDrop}
            prompt='Valitse tuottaja'
            onValueChange={(value, itemIndex) => {
                setDropdownSupplier(Number(value))
                setNewProduct && newProduct ? setNewProduct({ ...newProduct, supplierId: value }) : null
                setEditedProduct && editedProduct ? setEditedProduct({ ...editedProduct, supplierId: Number(value) }) : null
                Number(value) === 0 ? setSupplierWarning(true) : setSupplierWarning(false)
            }} >
            {suppliers.map(s => (
                <Picker.Item label={s.companyName} value={s.supplierId} key={s.supplierId} />
            ))}
        </Picker>
    )
}

export default SupplierPicker
