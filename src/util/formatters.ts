export const formatPrice = (price: number) => {
  const params = {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  };

  const numberFormat = new Intl.NumberFormat('pt-BR', params);

  return numberFormat.format(price);
}

export const formatPriceWithCurrency = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency'
  }).format(price);
}
