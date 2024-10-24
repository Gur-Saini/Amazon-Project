import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { CartItem } from '../models/cart-item';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  items: CartItem[] = [];

  constructor(private cartService: CartService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

  getTotal(): number {
    return this.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  placeOrder() {
    const total = this.getTotal();
    this.orderService.addOrder(this.items, total);
    this.cartService.clearCart();
    alert('Order placed successfully!');
  }
}
