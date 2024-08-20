import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Product } from '../common/product'; //product class in common folder 
import { ProductCategory } from '../common/product-category';
import { Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8083/api/products'; //<-- path for backend 
  private categoryUrl = 'http://localhost:8083/api/product-category'

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId:number): Observable<Product[]>{
    // @todo need to build URL based on category ID
    //console.log(theCategoryId);
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(map(response=> response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(map(response=> response._embedded.productCategory));
  }
}

//unwraps the JSON from Spring Data REST _embedded entry
interface GetResponseProduct{
  _embedded:{
    products: Product[];
  }
}

//unwraps the JSON from Spring Data REST _embedded entry
interface GetResponseProductCategory{
  _embedded:{
    productCategory:ProductCategory[];
  }
}