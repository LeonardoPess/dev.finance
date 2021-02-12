import formatCurrency from './formatCurrency.js';

export default function innerHTMLTransaction(transaction, index) {
  const CSSclass = transaction.amount > 0 ? 'income' : 'expense';
  const amount = formatCurrency(transaction.amount);

  const html = `
  <td class="description">${transaction.description}</td>
  <td class="${CSSclass}">${amount}</td>
  <td class="date">${transaction.date}</td>
  <td>
      <img class="removeBtn" id="${index}" src="./assets/minus.svg" alt="Remover transação">
  </td>
  `;

  return html;
}
