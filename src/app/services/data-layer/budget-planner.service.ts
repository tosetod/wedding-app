import { Injectable } from '@angular/core';
import { BudgetItem } from 'src/app/models/budget-item.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BudgetPlannerService {

  constructor(private firestore: AngularFirestore) { }

  createItem(budgetItem: BudgetItem){
    const newItem = {
      type: budgetItem.type,
      amount: budgetItem.amount,
      budget: budgetItem.budget,
      overUnder:budgetItem.budget - budgetItem.amount,
      editMode: false
    }
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('budget')
        .add(newItem)
        .then(res => {}, err => reject(err));
    })
  }

  getItemsData(){
    return this.firestore.collection('budget').snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as BudgetItem;
          const id = a.payload.doc.id;
          return { id, ...data};
        })
      }
    ));
  }

  getItemsValueChanges(){
    return this.firestore
            .collection('budget').valueChanges();
  }

  changeEditMode(item: BudgetItem){
    return new Promise<any>((res, rej) => {
      this.firestore.collection('budget').doc(item.id).update({'editMode': true})
        .then(res => {}, err => rej(err));
    })
  }

  updateItem(item: BudgetItem){
    const updatedItem = {
      id: item.id,
      type: item.type,
      amount: item.amount,
      budget: item.budget,
      overUnder: item.overUnder,
      editMode: item.editMode
    }
    return new Promise<any>((res, rej) => {
      this.firestore.collection('budget').doc(item.id).update(updatedItem)
        .then(res => {}, err => rej(err));
    })
  }
}
