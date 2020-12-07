export const priceValidation = (price: string):boolean => {
    if (!price || price === '' || isNaN(Number(price))) return false;
    return true;
 }
export const nameValidation = (name: string):boolean => {
    if (!name || name === '' || name.length < 4) return false;
    return true;
}