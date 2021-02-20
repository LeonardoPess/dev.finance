import formatCurrency from './formatCurrency.js';

export default class UpdateBalance {
  constructor(values, balanceIncome, balanceExpense, balanceTotal) {
    this.values = values;
    this.balanceIncome = document.getElementById(balanceIncome);
    this.balanceExpense = document.getElementById(balanceExpense);
    this.balanceTotal = document.getElementById(balanceTotal);
  }

  incomes() {
    return this.values
        .map(({amount}) => amount)
        .filter((amount) => amount > 0)
        .reduce((sum, amount) => sum + amount, 0);
  }

  expenses() {
    return this.values
        .map(({amount}) => amount)
        .filter((amount) => amount < 0)
        .reduce((sum, amount) => sum + amount, 0);
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
