import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Customers} from "../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrl: './customer-accounts.component.css'
})
export class CustomerAccountsComponent implements OnInit{
  customerId!:string ;
  customer!: Customers;
  customerAccountFormGroup!:FormGroup;

  constructor(private route:ActivatedRoute,private router:Router,private fb: FormBuilder){
    this.customer=this.router.getCurrentNavigation()?.extras.state as Customers;
  }
  ngOnInit(): void {
    this.customerId=this.route.snapshot.params['id'];
    this.customerAccountFormGroup=this.fb.group({
     accountId:this.fb.control(null),
      dateCreation: this.fb.control(null),
      balance: this.fb.control(0)


    })
  }

}
