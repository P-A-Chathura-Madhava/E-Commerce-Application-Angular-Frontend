import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandel } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  product: Product = {
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages:[]
  }
  
  constructor(private productService: ProductService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  addProduct(productForm: NgForm){
    const productFormData = this.prepareFormData(this.product);
    this.productService.addProduct(productFormData).subscribe(
      (response: Product)=>{
        productForm.reset();
        this.product.productImages = [];
      },
      (error: HttpErrorResponse)=>{
        console.log(error)
      }
      );   
  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();

    formData.append(
      'product',
      new Blob([JSON.stringify(product)], {type: 'application/json'})
    );

    for(var i=0; i<product.productImages.length; i++){
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }

    return formData;
  } 


  onFileSelected(event: any){
    if(event.target.files){
      const file= event.target.files[0];
      const fileHandel: FileHandel ={
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ),
      };
      this.product.productImages.push(fileHandel);
    }
  }

  removeImages(i: number){
    this.product.productImages.splice(i,1);
  }

  fileDropped(fileHandel : FileHandel) {
    this.product.productImages.push(fileHandel);
  }

}
