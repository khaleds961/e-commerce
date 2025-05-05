type Category =  {
    id: string;
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
    creationAt: string;
    updatedAt: string;
}

type CartItem = {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
    size: any;
    color: string;
}

