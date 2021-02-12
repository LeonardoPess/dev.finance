import formatCurrency from './formatCurrency.js';

export default class UpdateBalance {
  constructor(values, balanceIncome, balanceExpense, balanceTotal) {
    this.values = values;
    this.balanceIncome = document.getElementById(balanceIncome);
    this.balanceExpense = document.getElementById(balanceExpense);
    this.balanceTotal = document.getElementById(balanceTotal);
  }

  incomes() {
    let income = 0;
    this.values.forEach((transaction) => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    });
    return income;
  }

  expenses() {
    let expense = 0;
    this.values.forEach((transaction) => {
      if (transaction.amount < 0) {
        expense += transaction.amount;
      }
    });
    return expense;
  }

  total() {
    return this.incomes() + this.expenses();
  }

  updateBalance() {
    this.balanceIncome.innerHTML = formatCurrency(this.incomes());
    this.balanceExpense.innerHTML = formatCurrency(this.expenses());
    this.balanceTotal.innerHTML = formatCurrency(this.total());
  }

  init() {
    this.updateBalance();
  }
}
