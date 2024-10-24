import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];

  constructor() {
    

  }

  getOrders(): Order[] {
    return this.orders;
  }

  addOrder(items: CartItem[], total: number): void {
    const order: Order = {
      id: this.orders.length + 1,
      items,
      total,
      date: new Date(),
      orderId: this.generateOrderId()
    };
    this.orders.push(order);
  }

  private generateOrderId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}
