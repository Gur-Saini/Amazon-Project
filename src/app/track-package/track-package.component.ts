import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';
import { CartItem } from '../models/cart-item';

@Component({
  selector: 'app-track-package',
  templateUrl: './track-package.component.html',
  styleUrls: ['./track-package.component.css']
})
export class TrackPackageComponent implements OnInit {
  orderItem: CartItem | undefined;
  deliveryDate: string | undefined;
  progress: number = 0;

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    const productId = + (this.route.snapshot.paramMap.get('productId')||0);
    const order = this.orderService.getOrders().find(o => o.orderId === orderId);
    if (order) {
      this.orderItem = order.items.find(item => item.product.id === productId);
      if (this.orderItem) {
        this.deliveryDate = new Date(order.date.getTime() + 7 * 24 * 60 * 60 * 1000).toDateString(); 
        this.progress = this.calculateProgress(order.date);
      }
    }
  }

  calculateProgress(orderDate: Date): number {
    const now = new Date();
    const diffInTime = now.getTime() - orderDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    if (diffInDays <= 2) return 33; // Preparing
    if (diffInDays <= 5) return 66; // Shipped
    return 100; // Delivered
  }
}
