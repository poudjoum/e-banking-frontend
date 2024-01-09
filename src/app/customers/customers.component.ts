import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Customers} from "../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AccountsService} from "../services/accounts.service";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{
  customers!:Observable<Array<Customers>>;
  ErrorMessage!:string
  searchFormGroup: FormGroup | undefined;
  constructor(private customerService:CustomerService,private fb:FormBuilder,private router:Router,private accountService:AccountsService) {
  }
  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword:this.fb.control("")
    });
    this.handleSearchCustomers();
  }

  handleSearchCustomers() {
    let kw=this.searchFormGroup?.value.keyword;
    this.customers=this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.ErrorMessage=err.message;
        return throwError(err);
      })
    )


  }

  handleDeleteCustomer(c: Customers) {
    let conf=confirm("Are you sure?");
    if(!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next : (resp)=>{
        this.customers=this.customers.pipe(
          map(data=>{
            let index=data.indexOf(c);
            data.slice(index,1)
            return data
          })
        );
      },
      error:err=>{
        console.log(err);
      }
    })

  }

  handleCustomerAccount(customer: Customers) {
    this.router.navigateByUrl("/customer-accounts/"+customer.id,{state:customer});
    this.accountService.getCustomerAccounts(customer.id).pipe(
        catchError(err => {
          this.ErrorMessage=err.message();
          return throwError(err);
        })
    )
  }
}
