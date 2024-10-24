import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];

  addToCart(product: Product) {
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({ product, quantity: 1 });
    }
  }

  getItems(): CartItem[] {
    return this.items;
  }

  updateCartItem(productId: number, quantity: number) {
    const item = this.items.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  removeFromCart(productId: number) {
    this.items = this.items.filter(item => item.product.id !== productId);
  }

  clearCart() {
    this.items = [];
  }
}
