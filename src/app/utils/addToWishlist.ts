import { toast } from 'react-hot-toast';
import { useAddToWishList } from '@/app/store/addToWishList';

export const handleAddToWishlist = (
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
    useAddToWishList.getState().addItem(cartItem);
    
    // Optional: Log the updated cart for debugging
    const updatedCartState = useAddToWishList.getState().items;
    console.log('Current Wishlist:', updatedCartState);

    toast.success(t('addedSuccessfully'));
    return updatedCartState;
};
