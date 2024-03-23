import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from './../Product';
import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  product: Product[] = [];
  productFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.productFormGroup = formBuilder.group({
      id: [''],
      name: [''],
      price: [''],
      quantity: [''],
      description: [''],
    });
  }

  save() {
    this.product.push(this.productFormGroup.value);
  }
}
