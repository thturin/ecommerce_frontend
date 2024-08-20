import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  //templateUrl: './product-list-table.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit { //oninit is a lifecycle hook  that gets called once angular component has been initialized
  
  products: Product[] = [];
  currentCategoryId: number=1;

  constructor(private productService: ProductService, private route: ActivatedRoute){}

  ngOnInit(): void{ //similar to @PostConstruct, ngonit is a common place to put initialization logic for the component -> fetching data from a service, setting up default values, etc. 
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    });
  }

  listProducts(){
    //check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id')!; //will return true or false if id paramter is available
                        //use activated route|state of route at this given moment in time | 
    if (hasCategoryId){
      //get the "id" param string. convert string to a number using the "+" symbol  
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      //"!" is a non-null assertion operater which tells compiler object is not null 
    }
    else{
      //no category id available.. default to 1
      this.currentCategoryId = 1;
    }
    
    //now get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data=> this.products = data
    )

    //throw new Error('method not implemented');
  }

}
