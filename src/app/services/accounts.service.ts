import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  public getAccount(accountId: string, page: number, size: number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(environment.backendHost+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }
  public debit(acountId:string, amount:number,description:string){
    let data={accountId: acountId,amount,description}
    return this.http.post(environment.backendHost+"/accounts/debit",data);
  }
    public credit(acountId:string, amount:number,description:string){
        let data={accountId: acountId,amount,description}
        return this.http.post(environment.backendHost+"/accounts/credit",data);
    }
    public transfert(acountId:string,acountDestination:string, amount:number,description:string){
        let data={accountId: acountId,accountDestination: acountDestination,amount,description}
        return this.http.post(environment.backendHost+"/accounts/transfert",data);
    }
    public getCustomerAccounts(customer_id:number){
      return this.http.get(environment.backendHost+"/customer-account/"+customer_id);

    }
}
