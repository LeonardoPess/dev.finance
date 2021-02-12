export default function formatCurrency(value) {
  const signal = Number(value) < 0 ? '-' : '';

  value = String(value).replace(/\D/g, '');

  value = Number(value) / 100;

  value = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return signal + value;
}
