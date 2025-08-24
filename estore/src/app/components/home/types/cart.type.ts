import { Product } from "./productsType";

export interface CartItem {
    product: Product;
    quantity: number;
    amount: number;
}

export interface Cart {
    products: CartItem[];
    totalAmount: number;
    totalProducts: number;
}