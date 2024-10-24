import { Component, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product!: Product;
  quantity: number = 1;
  quantities: number[] = [1, 2, 3, 4, 5];

  constructor(private cartService: CartService) {}

  addToCart() {
    for (let i = 0; i < this.quantity; i++) {
      this.cartService.addToCart(this.product);
    }
    alert('Added to cart');
  }
}
