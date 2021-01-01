function toRupiah(number) {
  let result =""
  result = Number(number).toLocaleString('en-ID', {style: 'currency', currency: 'IDR'});
  return result
}

function balanceChecker (balance, trfAmt) {
  let clear = true
  if (balance < trfAmt) {
    clear = false
  }
  return clear
}

module.exports = {
  toRupiah,
  balanceChecker
}