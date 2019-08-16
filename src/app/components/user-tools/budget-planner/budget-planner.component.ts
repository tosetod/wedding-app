import { Component, OnInit } from '@angular/core';
import { BudgetPlannerService } from 'src/app/services/data-layer/budget-planner.service';
import { map } from 'rxjs/operators';
import { BudgetItem } from 'src/app/models/budget-item.model';

@Component({
  selector: 'app-budget-planner',
  templateUrl: './budget-planner.component.html',
  styleUrls: ['./budget-planner.component.css']
})
export class BudgetPlannerComponent implements OnInit {



  //items: Observable<BudgetItem[]>;

  editMode:boolean;
  stillInEditMode = '';
  items: BudgetItem[] = [];
  // totalAmount: number = 0;
  // totalBudget: number = 0;
  // totalOverUnder: number = 0;
  total = {
    amount: 0,
    budget: 0,
    overUnder: 0
  };

  constructor (private budgetService: BudgetPlannerService) {
  }


  ngOnInit() {
    this.budgetService.budgetItems.subscribe(
      items => this.items = items
    )
    this.budgetService
          .getItemsData()
          .pipe(
            map(items => {
                  this.total.amount = items.reduce((sum, current) => sum + current.amount, 0);
                  this.total.budget = items.reduce((sum, current) => sum + current.budget, 0);
                  this.total.overUnder = items.reduce((sum, current) => sum + current.overUnder, 0);
                  items.sort((a, b) => {
                    return a.amount < b.amount ? 1 : -1;
                  });
                  return items;
                }
            ))
          .subscribe(data => {
            this.budgetService.budgetItems.next(data);
          });

  }

  onAdd(type, amount, budget) {
    const newItem = {
      type: type.value,
      amount: parseInt(amount.value),
      budget: parseInt(budget.value),
      overUnder: budget.value - amount.value,
      editMode: false
    }

    this.budgetService.createItem(newItem).subscribe(
      item => this.budgetService.budgetItems.next([...this.items, item])
    );
    this.total = this.budgetService.getTotals([...this.items, newItem]);
    type.value = '';
    amount.value = '';
    budget.value = '';
  }

  onEdit(item: BudgetItem) {
    if (this.editMode) {
      if (this.stillInEditMode === '') {
        this.stillInEditMode = 'You are stil in edit mode. Please click save in order to proceed.';
      }
    }
    if (!this.editMode) {
      item.editMode = true;
      this.editMode = true;
    }
  }

  onSave(item: BudgetItem) {
    if ((item.type.trim() !== "") && (item.amount !== null) && (item.budget !== null)) {
      const editedItem = {
        id: item.id,
        type: item.type,
        amount:item.amount,
        budget: item.budget
      }
      this.total = this.budgetService.getTotals(this.items);
      this.items.filter((x, i) => {
        if(x.id === item.id){
          this.items.splice(i, 1);
        }
      });
      this.budgetService.updateItem(editedItem).subscribe(res => {
          this.budgetService.budgetItems.next([...this.items, res])
          item.editMode = false;
        }
      );
      this.editMode = false;
      this.stillInEditMode = '';
    }


  }

  onRemove(item: BudgetItem) {
    this.budgetService.deleteItem(item).subscribe();
    this.items.filter((x, i) => {
      if (item.id === x.id) {
        this.items.splice(i, 1);
      }
    });
    this.total = this.budgetService.getTotals(this.items);
  }

}
