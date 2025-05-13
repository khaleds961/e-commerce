import { toast } from 'react-hot-toast';
import { useAddToCart } from '@/app/store/addToCart';

export const handleAddToCart = (
    product: Product,
    quantity: number,
    size: string,
    color: string,
    t: (key: string) => string
) => {

    
    if (!size || !color) {
        toast.error(t('pleaseSelectSizeAndColor'));
        return;
    }

    const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        sku: product.sku || 'gdx29189',
        quantity,
        size,
        color,
        adjusted: false,
        slug: product.slug,
    };

    // Use the store's addItem function directly
    useAddToCart.getState().addItem(cartItem);
    
    // Optional: Log the updated cart for debugging
    const updatedCartState = useAddToCart.getState().items;

    toast.success(t('addedSuccessfully'));
    return updatedCartState;
};
