// export function formatPrice(
//     price: number | string,
//     options: {
//       currency?: 'USD' | 'EUR' | 'GBP' | 'BDT'
//       notation?: Intl.NumberFormatOptions['notation']
//     } = {}
//   ) {
//     const { currency = 'USD', notation = 'compact' } = options
  
//     const numericPrice =
//       typeof price === 'string' ? parseFloat(price) : price
  
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency,
//       notation,
//       maximumFractionDigits: 2,
//     }).format(numericPrice)
//   }
  
export function formatPrice(
  price: number | string,
  options: {
    notation?: Intl.NumberFormatOptions['notation']
  } = {}
) {
  const { notation = 'compact' } = options

  const numericPrice =
    typeof price === 'string' ? parseFloat(price) : price

  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice)
}
