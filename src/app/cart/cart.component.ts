import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { CartItem } from '../models/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items!: CartItem[];
  shippingOptions: { [key: number]: number } = {};
  editMode: boolean[] = [];

  constructor(private cartService: CartService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.items.forEach((item, index) => {
      this.shippingOptions[item.product.id] = 0; // Default to free shipping
      this.editMode[index] = false;
    });
  }

  enableEdit(index: number) {
    this.editMode[index] = true;
  }

  saveQuantity(index: number) {
    this.editMode[index] = false;
    this.cartService.updateCartItem(this.items[index].product.id, this.items[index].quantity);
  }

  cancelEdit(index: number) {
    this.editMode[index] = false;
  }

  updateItem(item: CartItem) {
    if (item.quantity < 1) {
      item.quantity = 1; // Prevent quantity from being less than 1
    }
    this.cartService.updateCartItem(item.product.id, item.quantity);
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.product.id);
    this.items = this.cartService.getItems();
  }

  getTotalItems(): number {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  getTotal(): number {
    return parseFloat(this.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2));
  }

  getShippingCost(): number {
    return parseFloat(Object.values(this.shippingOptions).reduce((acc, cost) => acc + cost, 0).toFixed(2));
  }

  getTax(): number {
    return parseFloat(((this.getTotal() + this.getShippingCost()) * 0.1).toFixed(2));
  }

  getTotalWithTax(): number {
    return parseFloat((this.getTotal() + this.getShippingCost() + this.getTax()).toFixed(2));
  }

  placeOrder() {
    const totalWithTax = this.getTotalWithTax();
    this.orderService.addOrder(this.items, totalWithTax);
    alert('Order placed successfully!');
    this.cartService.clearCart();
    this.items = [];
  }

  updateShippingOption(productId: number, cost: number) {
    this.shippingOptions[productId] = cost;
  }
}
