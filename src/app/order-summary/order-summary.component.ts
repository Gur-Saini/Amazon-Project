import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';
import { CartItem } from '../models/cart-item';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.orders = this.orderService.getOrders();
  }
  buyItAgain(item: CartItem) {
    for (let i = 0; i < item.quantity; i++) {
      this.cartService.addToCart(item.product);
    }
    alert(`${item.product.name} added to cart`);
  }
  trackPackage(orderId: string, productId: number) {
    this.router.navigate(['/track-package', orderId, productId]);
  }
}
