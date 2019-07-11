import { Component, OnInit } from '@angular/core';
import { BudgetPlannerService } from 'src/app/services/data-layer/budget-planner.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-budget-planner',
  templateUrl: './budget-planner.component.html',
  styleUrls: ['./budget-planner.component.css']
})
export class BudgetPlannerComponent implements OnInit {


  items: Observable<any[]>;
  totalAmount: number = 0;
  totalBudget: number = 0;
  totalOverUnder: number = 0;
  editMode = false;
  stillInEditMode = '';
  editT = '';

  constructor(private budgetService:BudgetPlannerService) { }
  

  ngOnInit() {
    this.items = this.budgetService.getItemsValueChanges();
    this.items = this.budgetService.getItemsData().pipe(map(items => {

      this.totalAmount = items.reduce((sum, current) => sum + current.amount, 0);
      this.totalBudget = items.reduce((sum, current) => sum + current.budget, 0);
      this.totalOverUnder = items.reduce((sum, current) => sum + current.overUnder, 0);
      items.sort((a, b) => {
        return a.amount < b.amount ? 1 : -1;
      });
      return items;
    }));
  }

  onAdd(type, amount, budget){
    if (type.value !== '' && amount.value !== '' && budget.value !== '') {
      const newItem = {
        type: type.value,
        amount: parseInt(amount.value),
        budget: parseInt(budget.value),
        overUnder: budget.value - amount.value,
        editMode: false
      }
      if (newItem.type !== '' && newItem.amount !== NaN && newItem.budget !== NaN) {
        this.budgetService.createItem(newItem);
        type.value = '';
        amount.value = '';
        budget.value = '';
      }
    }
    
  }

  onEdit(item){
    if (!this.editMode) {
      this.budgetService.changeEditMode(item);
      this.editMode = true;
    } else{
      this.stillInEditMode = 'You are stil in edit mode. Please click save in order to proceed.';
    }
  }

  onSave(item){
    const editedItem = {
      id: item.id,
      type: item.type,
      amount: parseInt(item.amount),
      budget: parseInt(item.budget),
      overUnder: item.amount - item.budget,
      editMode: false
    }
    this.budgetService.updateItem(editedItem);
    this.editMode = false;
  }

  onRemove(item){
    this.budgetService.deleteItem(item);
  }

}
