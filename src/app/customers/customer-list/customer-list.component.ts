import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as customerAction from '../state/customer.actions';
import {Observable} from 'rxjs';
import {Customer} from '../customer.model';
import * as fromCustomer from '../state/customer.reducer';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers$: Observable<Customer[]>;

  constructor(private store: Store<fromCustomer.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new customerAction.LoadCustomers());
    this.customers$ = this.store.pipe(select(fromCustomer.getCustomers));
  }

}
