import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductsComponent implements OnInit {
  editing: boolean = false;
  products: Product[] = [];
  productFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: ProductService
  ) {
    this.productFormGroup = formBuilder.group({
      id: [''],
      name: [''],
      price: [''],
      quantity: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.service.getProducts().subscribe({
      next: (data) => (this.products = data),
    });
  }

  save() {
    if (this.editing) {
      this.service.update(this.productFormGroup.value).subscribe({
        next: () => {
          this.loadProducts();
          this.editing = false;
          this.productFormGroup.reset();
        },
      });
    } else {
      this.service.save(this.productFormGroup.value).subscribe({
        next: (data) => {
          this.products.push(data);
          this.productFormGroup.reset();
        },
      });
    }
  }

  delete(product: Product) {
    this.service.delete(product).subscribe({
      next: () => this.loadProducts(),
    });
  }

  update(product: Product) {
    this.editing = true;
    this.productFormGroup.setValue(product);
  }
}
