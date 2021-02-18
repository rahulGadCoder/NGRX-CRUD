import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit,OnDestroy {

  subscription: Subscription;
  cart: any;
  products: any[] = [];
  constructor(private cartService: SharedService) {
    // subscribe to product component
    this.subscription = this.cartService.getCart().subscribe(product => {
      if (product) {
        this.products.push(product);
      } else {
        // clear product
        this.products = [];
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
 

}
