import Modal from './Modal.js';

export default class Transaction {
  constructor() {
    this.balanceIncome = document.getElementById('incomeDisplay');
    this.balanceExpense = document.getElementById('expenseDisplay');
    this.balanceTotal = document.getElementById('totalDisplay');
    this.transactionsContainer = document.querySelector('[data-table] tbody');
    this.btnRemoveClass = '.removeBtn';
    this.form = document.querySelector('[data-form]');
    this.formDescription = document.querySelector('input#description');
    this.formAmount = document.querySelector('input#amount');
    this.formDate = document.querySelector('input#date');
    this.handleForm = this.handleForm.bind(this);
    this.remove = this.remove.bind(this)
    this.trasactions = this.getStorage();
  }

  reload() {
    this.clearTransactions();
    this.updateBalance();
    this.init();
  }

  getStorage() {
    return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
  }

  setStorage(trasaction) {
    localStorage.setItem("dev.finances:transactions",
    JSON.stringify(trasaction));
  }

  add(trasaction) {
    this.trasactions.push(trasaction);
    this.reload();
  }

  remove() {
    const index = this.id;
    this.trasactions.splice(index, 1);
    this.reload();
  }

  incomes() {
    let income = 0;
    this.trasactions.forEach(transaction => {
        if( transaction.amount > 0 ) {
            income += transaction.amount;
        }
    })
    return income;
  }

  expenses() {
      let expense = 0;
      this.trasactions.forEach(transaction => {
          if( transaction.amount < 0 ) {
              expense += transaction.amount;
          }
      })
      return expense;
  }

  total() {
      return this.incomes() + this.expenses();
  }

  formatAmount(value){
    value = Number(value.replace(/\,\./g, "")) * 100;
    
    return value;
  }

  formatDate(date) {
    const splittedDate = date.split("-");
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
  }

  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";

    value = String(value).replace(/\D/g, "");

    value = Number(value) / 100;

    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

  return signal + value;
  }

  addTransaction(transaction, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = this.innerHTMLTransaction(transaction, index);
    tr.dataset.index = index;

    this.transactionsContainer.appendChild(tr);
  }

  innerHTMLTransaction(transaction, index) {
      const CSSclass = transaction.amount > 0 ? "income" : "expense"
      const amount = this.formatCurrency(transaction.amount)

      const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
          <img class="removeBtn" id="${index}" src="./assets/minus.svg" alt="Remover transação">
      </td>
      `

      return html
  }

  updateBalance() {
    this.balanceIncome.innerHTML = this.formatCurrency(this.incomes())
    this.balanceExpense.innerHTML = this.formatCurrency(this.expenses())
    this.balanceTotal.innerHTML = this.formatCurrency(this.total())
  }

  clearTransactions() {
      this.transactionsContainer.innerHTML = ""
  }

  getValues() {
    return {
      description: this.formDescription.value,
      amount: this.formAmount.value,
      date: this.formDate.value
    }
  }

  validateFields() {
    const { description, amount, date } = this.getValues();
      
    if( description.trim() === "" || amount.trim() === "" || date.trim() === "" ) {
      throw new Error("Por favor, preencha todos os campos")
    }
  }

  formatValues() {
    let { description, amount, date } = this.getValues()
    
    amount = this.formatAmount(amount)
    date = this.formatDate(date)

    return {
      description,
      amount,
      date
    }
  }

  clearFields() {
    this.formDescription.value = "";
    this.formAmount.value = "";
    this.formDate.value = "";
  }

  handleForm(e) {
    e.preventDefault();
    try {
        this.validateFields();
        const transaction = this.formatValues();
        this.add(transaction);
        this.clearFields();
        const modal = new Modal('.modal-overlay', '[data-modal="open"]', '[data-modal="close"]');
        modal.close();
    } catch (error) {
        alert(error.message);
    }
  }

  addTransactionlEvent() {
    this.form.addEventListener('submit', this.handleForm);
    
    const removeBtn = document.querySelectorAll(this.btnRemoveClass);

    removeBtn.forEach((transaction) => {
      transaction.addEventListener('click', this.remove)
    })
  }

  init() {
    this.setStorage(this.trasactions);
    if (this.trasactions.length) {
      this.trasactions.forEach((trasaction, index) => {
        this.addTransaction(trasaction, index);
      });
      
      this.updateBalance();
    }
    this.addTransactionlEvent();
  }
}
