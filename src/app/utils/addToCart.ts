import { toast } from 'react-hot-toast';
import { useAddToCart } from '@/app/store/addToCart';

export const handleAddToCart = (
    product: Product,
    quantity: number,
    selectedSize: string,
    selectedColor: string,
    cart: CartItem[],
    setCart: (items: CartItem[]) => void,
    t: (key: string) => string
) => {
    if (!selectedSize || !selectedColor) {
        toast.error(t('pleaseSelectSizeAndColor'));
        return;
    }

    const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: quantity,
        image: product.images[0],
        size: selectedSize,
        color: selectedColor,
    };

    // Find if the same product with same size and color already exists
    const existingItem = cart.find(item =>
        item.id === cartItem.id &&
        item.size === cartItem.size &&
        item.color === cartItem.color
    );

    if (existingItem) {
        // Update quantity if already exists
        const updatedCart = cart.map(item =>
            item.id === cartItem.id &&
            item.size === cartItem.size &&
            item.color === cartItem.color
                ? { ...item, quantity: item.quantity + cartItem.quantity }
                : item
        );
        setCart(updatedCart); // Update the cart state
    } else {
        // Add the new item to the cart
        useAddToCart.getState().addItem(cartItem);
    }

    const updatedCartState = useAddToCart.getState().items; // Get the updated cart state
    console.log('Current Cart:', updatedCartState); // Log the updated cart
    toast.success(t('addedSuccessfully'));
};
