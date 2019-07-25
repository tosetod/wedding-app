export interface BudgetItem{
    id?: string,
    type: string,
    amount: number,
    budget: number,
    overUnder?:number,
    editMode?: boolean
}