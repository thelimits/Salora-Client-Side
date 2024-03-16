interface Product {
    id: string;
    productName: string;
    description: string;
    price: number;
    imageUrl: string;
}

interface ProductDetails {
    id: string;
    productName: string;
    description: string;
    longDescriptions: string
    mediumDescriptions: string
    price: number;
    imageUrl: string;
}

interface CardSectionNewItemsProps {
    products: Product[];
}