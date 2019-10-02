import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {CustomerService} from '../customer.service';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import * as customerActions from '../state/customer.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Customer} from '../customer.model';

@Injectable()
export class CustomerEffects {
  constructor(private actions$: Actions, private customerService: CustomerService) {}

  @Effect()
  loadCustomers$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.LoadCustomers>(customerActions.CustomerActions.LOAD_CUSTOMERS),
    mergeMap( (actions: customerActions.LoadCustomers) => this.customerService.getCustomers().pipe(
        map( (customers: Customer[]) => new customerActions.LoadCustomersSuccess(customers) ),
        catchError(err => of(new customerActions.LoadCustomersFail(err)))
      )
    )
  );

}
