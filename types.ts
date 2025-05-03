type Category =  {
    id: number;
    name: string;
    slug: string;
    image: string;
    creationAt: string;
    updatedAt: string;
}

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
    slug: string;
    sku: string;
    creationAt: string;
    updatedAt: string;
}

type CartItem = {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
    sku: string;
    size: any;
    color: string;
}

