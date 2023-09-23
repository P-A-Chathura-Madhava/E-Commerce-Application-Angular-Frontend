import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';
import { Observable } from 'rxjs';
import { MyOrderDetails } from '../_model/order.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  public addProduct(product: FormData){
    return this.httpClient.post<Product>("http://localhost:9090/addNewProduct", product);
  }

  public getAllProducts(pageNumber, searchKeyword: string= ""){
    return this.httpClient.get<Product[]>("http://localhost:9090/getAllProducts?pageNumber="+pageNumber+"&searchKey="+searchKeyword);
  }

  public getProductDetailsById(productId){
    return this.httpClient.get<Product>("http://localhost:9090/getProductDetailsById/"+productId);
   }

  public deleteProduct(productId: number){
    return this.httpClient.delete("http://localhost:9090/deleteProductDetails/"+productId);
   }

   public getProductDetails(isSingeProductCheckout,productId){
    return this.httpClient.get<Product[]>("http://localhost:9090/getProductDetails/"+isSingeProductCheckout+"/"+productId);
   }

   public placeOrder(orderDetails: OrderDetails, isCartCheckout){
    return this.httpClient.post("http://localhost:9090/placeOrder/"+isCartCheckout, orderDetails);
   }

   public addToCart(productId){
    return this.httpClient.get("http://localhost:9090/addToCart/"+productId);
   }

   public getCartDetails(){
    return this.httpClient.get("http://localhost:9090/getCartDetails");
   }

   public deleteCartItem(cartId){
    return this.httpClient.delete("http://localhost:9090/deleteCartItem/"+cartId);
   }

   public getMyOrders() : Observable<MyOrderDetails[]>{
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:9090/getOrderDetails");
   }

}
