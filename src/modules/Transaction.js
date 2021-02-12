import Modal from './Modal.js';
import formatDate from './formatDate.js';
import innerHTMLTransaction from './innerHTMLTransaction.js';
import UpdateBalance from './UpdateBalance.js';

export default class Transaction {
  constructor(transactionsContainer, form) {
    this.transactionsContainer = document.querySelector(transactionsContainer);
    this.form = document.querySelector(form);
    this.formDescription = document.querySelector('input#description');
    this.formAmount = document.querySelector('input#amount');
    this.formDate = document.querySelector('input#date');
    this.btnRemoveClass = '.removeBtn';

    this.handleForm = this.handleForm.bind(this);
    this.remove = this.remove.bind(this);
    this.trasactions = JSON.parse(localStorage.getItem('dev.finances:transactions')) || [];
  }

  reload() {
    this.clearTransactions();
    this.init();
  }

  setStorage() {
    localStorage.setItem('dev.finances:transactions', JSON.stringify(this.trasactions));
  }

  add(trasaction) {
    this.trasactions.push(trasaction);
    this.reload();
  }

  remove(e) {
    const index = e.target.id;
    this.trasactions.splice(index, 1);
    this.reload();
  }

  addTransaction(transaction, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = innerHTMLTransaction(transaction, index);
    tr.dataset.index = index;

    this.transactionsContainer.appendChild(tr);
  }

  clearTransactions() {
    this.transactionsContainer.innerHTML = '';
  }

  getValues() {
    return {
      description: this.formDescription.value,
      amount: this.formAmount.value,
      date: this.formDate.value,
    };
  }

  validateFields() {
    const { description, amount, date } = this.getValues();

    if (description.trim() === '' || amount.trim() === '' || date.trim() === '') {
      throw new Error('Por favor, preencha todos os campos');
    }
  }

  formatValues() {
    let { description, amount, date } = this.getValues();

    amount *= 100;
    amount = Math.round(amount);
    date = formatDate(date);

    return {
      description,
      amount,
      date,
    };
  }

  clearFields() {
    this.formDescription.value = '';
    this.formAmount.value = '';
    this.formDate.value = '';
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
      transaction.addEventListener('click', this.remove);
    });
  }

  init() {
    this.setStorage();
    if (this.trasactions.length) {
      this.trasactions.forEach((trasaction, index) => {
        this.addTransaction(trasaction, index);
      });
    }
    this.addTransactionlEvent();
    const updateBalance = new UpdateBalance(this.trasactions, 'incomeDisplay', 'expenseDisplay', 'totalDisplay');
    updateBalance.init();
  }
}
