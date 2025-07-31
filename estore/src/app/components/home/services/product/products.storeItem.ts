import { Injectable, signal } from "@angular/core";
import { Product } from "../../types/productsType";
import { ProductsService } from "./products-service";


@Injectable()
export class ProductsStoreItem {
    private readonly _products = signal<Product[]>([]);
    readonly products = this._products.asReadonly();

    constructor(private productsService: ProductsService) {
        this.loadProducts();
    }

    loadProducts(): void {
        this.productsService.getProductsList().subscribe((products) => {
            this._products.set(products);
        })
    }

}