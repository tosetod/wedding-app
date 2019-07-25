import { Injectable } from '@angular/core';
import { BudgetItem } from 'src/app/models/budget-item.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BudgetPlannerService {

  budgetPlannerUrl = 'http://localhost:8080/wedding/1/budget-planner';
  headers = new HttpHeaders({
    headers: ['Content-Type', 'application-json']
  });
  constructor(private firestore: AngularFirestore, private http: HttpClient) { }

  createItem(budgetItem: BudgetItem){
    
      if (budgetItem.type !== '' && budgetItem.amount !== NaN && budgetItem.budget !== NaN){
        return this.http.post<BudgetItem>(
          this.budgetPlannerUrl, 
          budgetItem, 
          {
            headers: this.headers
          }
        );
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

  getItemsValueChanges(){
    return this.firestore
            .collection('budget').valueChanges();
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
    return new Promise<any>((res, rej) => {
      this.firestore.collection('budget').doc(item.id).delete()
        .then(res => {}, err => rej(err));
    })
  }
}
