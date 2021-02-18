import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {

  product: any;
  celsius: any;
  fahrenheit: any;
  registrationForm: FormGroup;
  isSubmitted = false;

  constructor(private service: SharedService, public fb: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      gender: ['male']
    })
  }


  get myForm() {
    return this.registrationForm.get('gender');
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      return false;
    } else {
      alert(JSON.stringify(this.registrationForm.value))
    }
  }


  addToCart(): void {
    // send product data to subscribers via observable subject
    this.service.addToCart(this.product);
    this.product = null;
  }

  clearCart(): void {
    // clear cart
    this.service.clearCart();
  }



  // onChangeCelsius(event){
  //   console.log("event",event)

  //   this.fahrenheit = this.celsius* 9/5 + 32;
  //   console.log("celsius",this.fahrenheit)
  // }

  //  onChangeFahrenheit(){
  //   this.celsius = (this.fahrenheit - 32) * 5/9;
  //   console.log("celsius",this.celsius)
  // }

}
