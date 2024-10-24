import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Black and Gray Athletic Cotton Socks', price: 10.90, description: '6 Pairs', imageUrl: 'assets/images/socks.jpg', rating: 4.5, reviews: 87 },
    { id: 2, name: 'Intermediate Size Basketball', price: 20.95, description: 'Size 7', imageUrl: 'assets/images/basketball.jpg', rating: 4.2, reviews: 127 },
    { id: 3, name: 'Adults Plain Cotton T-Shirt - 2 Pack', price: 7.99, description: '2 Pack', imageUrl: 'assets/images/t-shirt.jpg', rating: 4.0, reviews: 56 },
    { id: 4, name: '2 Slot Toaster - Black', price: 18.99, description: '2 Slot Toaster', imageUrl: 'assets/images/toaster.jpg', rating: 4.8, reviews: 2197 },
    { id: 5, name: '6 Piece White Dinner Plate Set', price: 20.67, description: '6 Pieces', imageUrl: 'assets/images/plates.jpg', rating: 4.1, reviews: 37 },
    { id: 6, name: '6-Piece Nonstick, Carbon Steel Oven', price: 34.99, description: '6 Pieces', imageUrl: 'assets/images/oven.jpg', rating: 4.5, reviews: 175 },
    
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }
}
