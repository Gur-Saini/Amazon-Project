import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchTerm: string = '';
  searchResults: Product[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['q'];
      console.log(`Search term received: ${this.searchTerm}`);
      this.searchResults = this.productService.getProducts().filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }
}
