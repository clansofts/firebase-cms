import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: FirebaseListObservable<any[]>;
  searchTerm: string;

  constructor(
    public db: AngularFireDatabase,
    public globalService: GlobalService,
    public router: Router,
  ) {
    this.products = db.list('/products', {
      query: {
        orderByChild: 'published',
        equalTo: true,
        limitToLast: 20,
      }
    });

    this.globalService.searchTerm.subscribe((term) => {
      this.searchTerm = term;
    });
  }

  ngOnInit() {
    if (this.router.url.includes('product')) {
      this.globalService.searchTerm.next('');
    }
  }

  getProductImage(product:any) {
    if (product.thumbnail) {
      return product.thumbnail;
    } else {
      return '../../assets/placeholder.jpg';
    }
  }
}
