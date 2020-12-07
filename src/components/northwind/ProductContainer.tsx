import React from 'react'
import { View, Text, Pressable, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../../Styles';
import { ContainerProps } from './productType';


const ProductContainer: React.FC<ContainerProps> = ({ product, setProductForModal }: ContainerProps) => {
    return (
        <Pressable
            style={({ pressed }) => [{ backgroundColor: pressed ? 'lightgray' : 'white' }]}
            onPress={() => setProductForModal(product)}
        >
            <View style={styles.productContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={product.imageLink ? { uri: product.imageLink } : { uri: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw26c3bf34/images/products/flowers/01712_01_procutorange.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196' }}
                        style={{ height: 50, width: 50, margin: 5 }}
                    />
                    <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>{product.productName}</Text>
                        <Text>{product.categoryId}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>{product.unitPrice === null ? 'No unit price' : `\u00E1 ${product.unitPrice}\u20AC, `}</Text>
                            <Text> {product.quantityPerUnit === null ? 'No quantity info' : product.quantityPerUnit}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default ProductContainer
