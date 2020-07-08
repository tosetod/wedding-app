import { Injectable } from '@angular/core';
import { BudgetItem } from 'src/app/models/budget-item.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetPlannerService {

  budgetItems = new Subject<BudgetItem[]>();
  budgetPlannerUrl = 'http://localhost:49947/budget-planner';
  headers = new HttpHeaders({
    headers: ['Content-Type', 'application-json']
  });
  constructor(private http: HttpClient) { }

  createItem(budgetItem: BudgetItem){

      if (budgetItem.type !== '' && budgetItem.amount !== NaN && budgetItem.budget !== NaN){
        return this.http.post<BudgetItem>(
          this.budgetPlannerUrl,
          budgetItem,
          {
            headers: this.headers
          }
        )
      }
      throw new Error("Bad Request");
  }

  getItemsData(){
    return this.http.get<BudgetItem[]>(this.budgetPlannerUrl,
        {
          headers: this.headers
        }
      )
  }

  updateItem(item: BudgetItem){
    const reqBody = {
      type: item.type,
      amount: item.amount,
      budget: item.budget
    }
    return this.http
                .put<BudgetItem>(
                    this.budgetPlannerUrl + `/${item.id}`,
                    reqBody,
                    {
                      headers: this.headers
                    }
                  )
  }

  deleteItem(item: BudgetItem){
    return this.http.delete<BudgetItem>(this.budgetPlannerUrl,
                          {
                            headers: this.headers,
                            params: new HttpParams().set('id', item.id)
                          }

      )
  }

  getTotals(items: BudgetItem[]){
    let total = {
      amount: items.reduce((sum, current) => sum + current.amount, 0),
      budget: items.reduce((sum, current) => sum + current.budget, 0),
      overUnder: items.reduce((sum, current) => sum + current.overUnder, 0)
    }
    return total;
  }
}
