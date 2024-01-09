import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customers} from "../model/customer.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }
  public getCustomers():Observable<Array<Customers>>{
    return this.http.get<Array<Customers>>(environment.backendHost+"/customers");
  }
  public searchCustomers(keyword:string):Observable<Array<Customers>>{
    return this.http.get<Array<Customers>>(environment.backendHost+"/customers/search?keyword="+keyword);
  }
  public saveCustomer(customer:Customers):Observable<Customers>{
    return this.http.post<Customers>(environment.backendHost+"/customers",customer);
  }
  public deleteCustomer(id:number){
    return this.http.delete(environment.backendHost+"/customer/"+id);
  }
}
