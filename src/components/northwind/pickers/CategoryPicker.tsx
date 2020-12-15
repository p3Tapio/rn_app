import React from 'react'
import { Picker } from '@react-native-picker/picker'
import { CategoryPickerProps, Category } from '../productType'
import { styles } from '../../../Styles'

const CategoryPicker: React.FC<CategoryPickerProps> = ({
    categories, setDropdownCategory, dropdownCategory,
    setCategoryWarning, setNewProduct, newProduct,
    setEditedProduct, editedProduct
}) => {

    const edit: Category = { categoryId: 0, categoryName: 'Valitse kategoria', description: '' }
    const editedCategories: Category[] = categories.map(x => x.categoryId === 0 ? edit : x)
 
    return (
        <Picker
            selectedValue={dropdownCategory}
            style={styles.pickerDrop}
            prompt='Valitse tuoteryhmä'
            onValueChange={(value, itemIndex) => {
                setDropdownCategory(Number(value))
                setNewProduct && newProduct ? setNewProduct({ ...newProduct, categoryId: value }) : null
                setEditedProduct && editedProduct ? setEditedProduct({ ...editedProduct, categoryId: Number(value) }) : null
                Number(value) === 0 ? setCategoryWarning(true) : setCategoryWarning(false)
            }} >
            {editedCategories.map(c => (
                <Picker.Item label={c.categoryId !== 0 ? `${c.categoryId} - ${c.categoryName}` : c.categoryName} value={c.categoryId} key={c.categoryId} />
            ))}
        </Picker>
    )
}

export default CategoryPicker
