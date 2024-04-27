"use strict";
// export function formatPrice(
//     price: number | string,
//     options: {
//       currency?: 'USD' | 'EUR' | 'GBP' | 'BDT'
//       notation?: Intl.NumberFormatOptions['notation']
//     } = {}
//   ) {
//     const { currency = 'USD', notation = 'compact' } = options
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPrice = void 0;
//     const numericPrice =
//       typeof price === 'string' ? parseFloat(price) : price
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency,
//       notation,
//       maximumFractionDigits: 2,
//     }).format(numericPrice)
//   }
function formatPrice(price, options) {
    if (options === void 0) { options = {}; }
    var _a = options.notation, notation = _a === void 0 ? 'compact' : _a;
    var numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        notation: notation,
        maximumFractionDigits: 2,
    }).format(numericPrice);
}
exports.formatPrice = formatPrice;
