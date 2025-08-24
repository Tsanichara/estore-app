import { computed, signal } from "@angular/core";
import { CartItem } from "../../types/cart.type";
import { Product } from "../../types/productsType";

export class CartStoreItem {

    private readonly _products = signal<CartItem[]>([]);

    readonly totalAmount = computed(() => this._products().reduce((sum, item) => sum + item.amount, 0));

    readonly totalProducts = computed(() => this._products().reduce((count, item) => count + item.quantity, 0));

    readonly cart = computed(() => ({
        products: this._products(),
        totalAmount: this.totalAmount(),
        totalProducts: this.totalProducts(),
    }));

    addProduct(product: Product): void {
        const currentItems = this._products();
        const existingIndex = currentItems.findIndex(
            (item) => item.product.id === product.id
        );

        if (existingIndex === -1) {
            this._products.set([
                ...currentItems,
                {
                    product,
                    quantity: 1,
                    amount: Number(product.price),
                },
            ]);
        } else {
            const updatedItems = [...currentItems];
            const existing = updatedItems[existingIndex];

            updatedItems[existingIndex] = {
                ...existing,
                quantity: existing.quantity + 1,
                amount: existing.amount + Number(product.price),
            };
            this._products.set(updatedItems);
        }

    }

}