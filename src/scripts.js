import Modal from './modules/Modal.js';
import Transaction from './modules/Transaction.js';

const modal = new Modal('.modal-overlay', '[data-modal="open"]', '[data-modal="close"]');
modal.init();

const transaction = new Transaction();
transaction.init();
